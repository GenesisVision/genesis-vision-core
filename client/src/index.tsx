import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import App from "./App";
import { Web3Provider } from "@ethersproject/providers";
import { SWRConfig } from "swr";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import MulticallUpdater from "./state/multicall/updater";
import TransactionUpdater from "./state/transactions/updater";
import store from "state";

import { createGlobalStyle } from "styled-components";
import { RootStyle } from "styles/root-styles";
import { AlertContextProvider } from "contexts/alerts.context";

function Updaters() {
  return (
    <>
      <MulticallUpdater />
      <TransactionUpdater />
    </>
  );
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const GlobalStyle = createGlobalStyle`
  ${RootStyle}
`;

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <AlertContextProvider>
        <Router>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(process.env.REACT_APP_API_URL + resource, init).then(
                  res => res.json()
                )
            }}
          >
            <Updaters />
            <App />
            <GlobalStyle />
          </SWRConfig>
        </Router>
      </AlertContextProvider>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById("root")
);
