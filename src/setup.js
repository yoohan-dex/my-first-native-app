
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import configureStore, { runSaga } from './configureStore';

function setup():Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };

      runSaga();
    }
    render() {
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
