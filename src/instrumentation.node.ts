import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
 
const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({}),
    metricReader: new PrometheusExporter({
        port: 9464,
    }),
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'vtex-storefront',
    }),
    spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
})

sdk.start()