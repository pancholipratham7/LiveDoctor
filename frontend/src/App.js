import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes["app-container"]}>
      <Header />
      <Switch>
        <Route path="/:id/book-appointment">
          <BookAppointmentPage />
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
