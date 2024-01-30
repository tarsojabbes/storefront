import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import React, { useState } from 'react';

interface IFaroProvider {
  useTracing: boolean,
  children: React.ReactNode
}

export default function FaroProvider(props: IFaroProvider): React.ReactNode {
    const [faroIsInitialized, setFaroIsInitialized] = useState(false)
    const [useTracing, setUseTracing] = useState(false)

    if (typeof window !== 'undefined' && (!faroIsInitialized || props.useTracing !== useTracing)) {
      initializeFaro({
        url: "https://faro-collector-prod-sa-east-1.grafana.net/collect/b4929ea7531360481d27b82126516f7f",
        app: {
          name: 'vtex-storefront',
          version: '1.0.0',
          environment: 'production'
        },
        
        instrumentations: [...getWebInstrumentations()],
      });
      setUseTracing(props.useTracing)
      setFaroIsInitialized(true)
    }
    return (
        <>
        {props.children}
        </>
    )
}