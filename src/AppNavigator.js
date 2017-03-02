import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import Login from './scenes/Login';
import MobileLogin from './scenes/MobileLogin';
import MobileRegister from './scenes/MobileRegister';
import RegisterMessage from './scenes/RegisterMessage';
import ItemDetial from './scenes/ItemDetail';
import Home from './scenes/Home';
import Wallet from './scenes/Wallet';
import SuccessPage from './scenes/SuccessPage';
import ResetPassword from './scenes/ResetPassword';

import {
  NOT_SUBMITTED,
  HAVE_REJECTED,
  HAVE_SUBMITTED,
  ISSUE,
  PASS,
} from './constants/driverState';

const {
  popRoute,
  replaceAt,
  reset,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;
type Props = {
  popRoute: () => void,
  navigation: {
    key: string,
    routes: [],
  },
  app: { login: boolean },
  user: { state: string },
  replaceAt: () => void,
  reset: () => void,
}
class AppNavigator extends Component {

  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind(this);
    this.watchState = this.watchState.bind(this);
    this.watchLogin = this.watchLogin.bind(this);
    this.watchLogout = this.watchLogout.bind(this);
    this.initialRoute = this.initialRoute.bind(this);
    this.homeToLogin = this.homeToLogin.bind(this);
    this.loginToHome = this.loginToHome.bind(this);
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });

    this.initialRoute();
    if (!this.props.app.login) {
      this.homeToLogin();
    }
  }

  componentWillUpdate(nextProps) {
    this.watchLogin(nextProps);
    this.watchLogout(nextProps);
  }

  initialRoute() {
    try {
      this.props.reset([{
        key: 'home',
        index: 0,
      }]);
    } catch (e) {
      // nothing
    }
  }
  homeToLogin() {
    this.replaceRoute('home', 'login');
  }

  loginToHome() {
    this.replaceRoute('login', 'home');
  }
  watchlogin: (nextProps: Props) => void
  watchLogin(nextProps) {
    const { app } = this.props;
    if (!app.login && nextProps.app.login) {
      try {
        this.initialRoute();
      } catch (e) {
        // nothing..
      }
      this.watchState(nextProps);
    }
  }
  watchState: (nextProps: Props) => void
  watchState(nextProps) {
    const { app, navigation } = this.props;
    if (app.login && (this.props.user.state !== nextProps.user.state)) {
      const currentRoute = navigation.routes[navigation.routes.length - 1].key;
      switch (nextProps.user.state) {
        case NOT_SUBMITTED:
        case HAVE_REJECTED:
          this.replaceRoute(currentRoute, 'register-message');
          break;
        case HAVE_SUBMITTED:
          this.replaceRoute(currentRoute, 'upload-message');
          break;
        case PASS:
        case ISSUE:
        default:
          break;
      }
    }
  }

  watchLogout(nextProps) {
    const { app } = this.props;
    if (app.login && !nextProps.app.login) {
      this.initialRoute();
      this.homeToLogin();
    }
  }

  replaceRoute(from, to) {
    this.props.replaceAt(from, { key: to }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  props: Props
  _renderScene({ scene }) { // eslint-disable-line class-methods-use-this
    switch (scene.route.key) {
      case 'home':
        return <Home />;
      case 'mobile-login':
        return <MobileLogin />;
      case 'mobile-register':
        return <MobileRegister />;
      case 'register-message':
        return <RegisterMessage />;
      case 'login':
        return <Login />;
      case 'item-detail':
        return <ItemDetial />;
      case 'wallet':
        return <Wallet />;
      case 'reset-password':
        return <ResetPassword />;
      case 'upload-message':
        return <SuccessPage />;
      default:
        return <Login />;
    }
  }
  render() {
    const { routes } = this.props.navigation;
    const login = routes[routes.length - 1].key === 'login';
    return (
      <View style={{ flex: 1, width: null, height: null }}>
        <StatusBar
          animated
          backgroundColor={login ? 'transparent' : '#6B7E88'}
          barStyle={login ? 'light-content' : 'default'}
          translucent={login}
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    reset: routes => dispatch(reset(routes, 'global')),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  app: state.app,
  user: state.user,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
