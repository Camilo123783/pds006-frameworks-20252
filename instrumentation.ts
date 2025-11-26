import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { ConsoleLogRecordExporter, LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

// Axiom configuration
const AXIOM_ORG_ID = process.env.AXIOM_ORG_ID || 'devops';
const AXIOM_DATASET = process.env.AXIOM_DATASET || 'devops';
const AXIOM_TOKEN = process.env.AXIOM_TOKEN || '';
const AXIOM_ENDPOINT = `https://api.axiom.co/v1/datasets/${AXIOM_DATASET}/ingest`;

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://api.axiom.co/v1/traces',
    headers: {
      Authorization: `Bearer ${AXIOM_TOKEN}`,
      'X-Axiom-Org-ID': AXIOM_ORG_ID,
    },
  }),
  metricReader: new PeriodicExportingMetricReader(
    new OTLPMetricExporter({
      url: 'https://api.axiom.co/v1/metrics',
      headers: {
        Authorization: `Bearer ${AXIOM_TOKEN}`,
        'X-Axiom-Org-ID': AXIOM_ORG_ID,
      },
    })
  ),
  logRecordProcessors: [
    new SimpleLogRecordProcessor(
      new OTLPLogExporter({
        url: AXIOM_ENDPOINT,
        headers: {
          Authorization: `Bearer ${AXIOM_TOKEN}`,
          'X-Axiom-Org-ID': AXIOM_ORG_ID,
        },
      })
    ),
  ],
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log('OpenTelemetry instrumentation started');

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('SDK shut down successfully'))
    .catch((error) => console.log('Error shutting down SDK', error))
    .finally(() => process.exit(0));
});
