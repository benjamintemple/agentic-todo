import { Environment, Network, RecordSource, Store, RequestParameters, Variables } from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const GRAPHQL_URL = (import.meta as any).env?.VITE_GRAPHQL_URL || 'http://localhost:8080/graphql';
const GRAPHQL_WS_URL = (import.meta as any).env?.VITE_GRAPHQL_WS_URL || 'ws://localhost:8080/graphql/';

async function fetchQuery(params: RequestParameters, variables: Variables) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const result = await response.json();
  
  // Convert integer IDs to strings for Relay compatibility
  if (result.data) {
    result.data = convertIdsToStrings(result.data);
  }
  
  return result;
}

function convertIdsToStrings(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(convertIdsToStrings);
  }
  
  if (typeof obj === 'object') {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'id' && typeof value === 'number') {
        converted[key] = value.toString();
      } else {
        converted[key] = convertIdsToStrings(value);
      }
    }
    return converted;
  }
  
  return obj;
}

const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_URL, {
  reconnect: true,
});

function subscribe(config: any) {
  // Transform Relay config to subscriptions-transport-ws format
  const subscriptionConfig = {
    query: config.text,
    variables: config.variables || {},
  };
  
  const observable = subscriptionClient.request(subscriptionConfig);
  
  // Return an observable-like object that Relay expects
  return {
    subscribe: (observer: any) => observable.subscribe(observer),
  } as any;
}

const network = Network.create(fetchQuery, subscribe);

const store = new Store(new RecordSource());

export const environment = new Environment({
  network,
  store,
});