/**
 * Axiom Logger - Integración con Axiom para envío de logs
 */

import { axiomConfig } from '../config/axiom.config';

export interface AxiomLogEntry {
  timestamp?: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
  tags?: Record<string, string>;
  fields?: Record<string, any>;
  [key: string]: any;
}

export class AxiomLogger {
  private dataset: string;
  private token: string;
  private endpoint: string;

  constructor() {
    this.dataset = axiomConfig.dataset;
    this.token = axiomConfig.token;
    this.endpoint = `${axiomConfig.endpoints.logs}/${this.dataset}/ingest`;
  }

  private async send(entries: AxiomLogEntry[]): Promise<void> {
    if (!this.token) {
      console.warn('Axiom token not configured. Logs will not be sent to Axiom.');
      return;
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Authorization': `Bearer ${this.token}`,
          'X-Axiom-Org-ID': axiomConfig.organization,
        },
        body: entries.map(entry => JSON.stringify(entry)).join('\n'),
      });

      if (!response.ok) {
        console.error(`Axiom API error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send logs to Axiom:', error);
    }
  }

  async log(level: AxiomLogEntry['level'], message: string, data?: any): Promise<void> {
    const entry: AxiomLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
    };

    // Log to console
    console.log(`[${level}] ${message}`, data || '');

    // Send to Axiom
    await this.send([entry]);
  }

  async debug(message: string, data?: any): Promise<void> {
    await this.log('DEBUG', message, data);
  }

  async info(message: string, data?: any): Promise<void> {
    await this.log('INFO', message, data);
  }

  async warn(message: string, data?: any): Promise<void> {
    await this.log('WARN', message, data);
  }

  async error(message: string, error?: Error | any): Promise<void> {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error;

    await this.log('ERROR', message, errorData);
  }
}

export const axiomLogger = new AxiomLogger();
