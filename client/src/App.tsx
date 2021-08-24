import AppLayout from "components/app-layout/app-layout";
import CreateDefiFundPage from "pages/create-defi-fund.page";
import DefiExchangePage from "pages/defi-exchange.page";
import React from "react";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/" component={CreateDefiFundPage} />
        <Route path="/exchange" component={DefiExchangePage} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </AppLayout>
  );
};

export default App;
