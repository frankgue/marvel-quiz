import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import "../../App.css";
import ErrorPage from "../ErrorPage";
import Footer from "../Footer";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../Signup";
import Welcome from "../Welcome";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import ForgetPassword from "../ForgetPassword";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route component={ErrorPage} />
        </Switch>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
