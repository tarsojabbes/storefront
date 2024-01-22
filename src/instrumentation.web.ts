import { ConsoleSpanExporter, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-web';

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'web-tracer'
  }),
);

const tracerProvider = new WebTracerProvider({
  resource: resource,
});

tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

tracerProvider.register();

export default tracerProvider.getTracer('web-tracer');
