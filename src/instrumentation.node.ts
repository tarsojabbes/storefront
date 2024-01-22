import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import {MeterProvider, PeriodicExportingMetricReader} from "@opentelemetry/sdk-metrics"
import {metrics} from "@opentelemetry/api"
import {OTLPMetricExporter} from "@opentelemetry/exporter-metrics-otlp-http"

const meterProvider = new MeterProvider({
  resource: new Resource({'service.name': 'my-express-app'})
});
const metricExporter = new OTLPMetricExporter();
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 60000,
});
meterProvider.addMetricReader(metricReader);
metrics.setGlobalMeterProvider(meterProvider);

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
        headers: {},
        url: " http://localhost:4318/v1/traces"
    }),
    metricReader: new PrometheusExporter({
      port: 9464
    }),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'vtex-storefront',
    }),
    spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})

sdk.start()