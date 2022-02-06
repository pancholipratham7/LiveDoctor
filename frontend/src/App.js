import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import classes from "./App.module.css";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import { useRouteMatch } from "react-router-dom";

function App(props) {
  // This will match if the current url of the page is of the type specified in path
  // if it will match then it will return an object otherwise it will return null
  const match = useRouteMatch({
    path: "/doctor/:id/dashboard",
    strict: true,
    sensitive: true,
  });

  return (
    <div className={classes["app-container"]}>
      {!match && <Header />}
      <Switch>
        <Route path="/:id/book-appointment">
          <BookAppointmentPage />
        </Route>
        <Route path="/doctor/:id/dashboard">
          <DoctorDashboardPage />
        </Route>
        <Route path="/:id/details" exact>
          <DoctorDetailsPage />
        </Route>
        <Route path="/signUp" exact>
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
