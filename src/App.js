import React, { Component, lazy, Suspense } from 'react';
import GlobalStyle from './css/global';
import { Route, Switch, Redirect } from 'react-router-dom';

const Layout = lazy(() => import('./containers/Layout'));

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path='/' component={Layout} />
        <Redirect to='/dashboard' />
      </Switch>
    );
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalStyle />
          {routes}
        </Suspense>
      </>
    );
  }
}

export default App;