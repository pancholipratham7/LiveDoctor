import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/signIn" exact>
          <SignUpPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
