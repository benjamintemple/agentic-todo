import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import App from './App'
import { environment } from './relay/environment'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Provider theme={defaultTheme}>
        <App />
      </Provider>
    </RelayEnvironmentProvider>
  </StrictMode>,
)