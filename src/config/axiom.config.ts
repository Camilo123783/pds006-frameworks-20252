/**
 * Axiom OpenTelemetry Configuration
 * Integración de observabilidad con Axiom para logging, traces y metrics
 */

export const axiomConfig = {
  organization: process.env.AXIOM_ORG_ID || 'devops',
  dataset: process.env.AXIOM_DATASET || 'devops',
  token: process.env.AXIOM_TOKEN || '',
  endpoints: {
    logs: 'https://api.axiom.co/v1/datasets',
    traces: 'https://api.axiom.co/v1/traces',
    metrics: 'https://api.axiom.co/v1/metrics',
  },
  headers: {
    Authorization: `Bearer ${process.env.AXIOM_TOKEN || ''}`,
    'X-Axiom-Org-ID': process.env.AXIOM_ORG_ID || 'devops',
    'Content-Type': 'application/json',
  },
};

export function validateAxiomConfig(): boolean {
  if (!axiomConfig.token) {
    console.warn('⚠️ AXIOM_TOKEN not set. Observability features will be limited.');
    return false;
  }
  if (!axiomConfig.organization) {
    console.warn('⚠️ AXIOM_ORG_ID not set. Using default: devops');
  }
  if (!axiomConfig.dataset) {
    console.warn('⚠️ AXIOM_DATASET not set. Using default: devops');
  }
  return true;
}
