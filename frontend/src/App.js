import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/login">
          <h1>Login Page</h1>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
