import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "../app/layouts/haeder";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../redux/Actions/helperActions";
import store from "../redux/store";
import PrivateRoute from "./PrivateRoute";

const Home = React.lazy(() => import("../app/components/Home"));
const Events = React.lazy(() => import("../app/components/Events"));
const Invitations = React.lazy(() => import("../app/components/Invitations"));
const ResetPassword = React.lazy(() =>
  import("../app/components/Auth/Password/resetPass")
);

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set auth token header auth
  setAuthToken(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/user/update/password"
              component={ResetPassword}
            />
            <Route exact path="/events" component={Events} />
            <Route exact path="/invites" component={Invitations} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);
