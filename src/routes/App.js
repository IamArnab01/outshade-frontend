import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "../app/layouts/haeder";

const Home = React.lazy(() => import("../app/components/Home"));

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);
