# Storefront made Observable with OpenTelemetry

Testing purpose application on how to instrumentate NextJS services for Observability using OpenTelemetry SDK

Disclaimer: Docker, NodeJS and TypeScript must be installed!

### How to Run

1. Set up the environmental variables
```sh
export OTEL_SERVICE_NAME="vtex-storefront"
export OTEL_TRACES_EXPORTER="jaeger"
export OTEL_METRICS_EXPORTER="prometheus"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="http://localhost:9090/"
```

2. Install the project dependencies
```sh
npm i
```

3. Set up the Jaeger service
```sh
docker run --rm \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

4. Set up the Prometheus service
```sh
docker run --rm -v ${PWD}/prometheus.yml:/prometheus/prometheus.yml -p 9090:9090 prom/prometheus --enable-feature=otlp-write-receive
```

5. Run the application
```sh
npm run dev
```

After that, the app will be exposed on <a>http://localhost:3000</a>, traces will be available at <a>http://localhost:16686</a> through Jaeger, and metrics can be found at <a>http://localhost:9090</a> through Prometheus.