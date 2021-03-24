import { Switch, Route } from "react-router-dom";
import CreateSoap from "./CreateSoap";
import SoapPage from "./SoapPage";

function App() {
  return (
    <Switch>
      <Route path="/soap" exact>
        <CreateSoap />
      </Route>
      <Route path="/soap/:id">
        <SoapPage />
      </Route>
    </Switch>
  );
}

export default App;
