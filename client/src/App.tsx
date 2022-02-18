import AlertMessageList from "components/alerts/alert-message-list";
import AppLayout from "components/app-layout/app-layout";
import { useEagerConnect } from "hooks/eager-connect.hook";
import { useInactiveListener } from "hooks/unactive-listener.hook";
import CreateDefiFundPage from "pages/create-defi-fund.page";
import DefiExchangePage from "pages/defi-exchange.page";
import { Route, Switch } from "react-router-dom";
import { usePollBlockNumber } from "state/block/hooks";

const App = () => {
  useEagerConnect();
  usePollBlockNumber();
  useInactiveListener();

  return (
    <AppLayout>
      <Switch>
        <Route exact path="/" component={CreateDefiFundPage} />
        <Route path="/exchange" component={DefiExchangePage} />
        <Route render={() => <div>404</div>} />
      </Switch>
      <AlertMessageList />
    </AppLayout>
  );
};

export default App;
