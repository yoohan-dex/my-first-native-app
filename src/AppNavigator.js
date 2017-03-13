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
import BindPhone from './scenes/BindPhone';

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
    key: String,
    routes: [],
  },
  app: { login: Boolean },
  user: {
    state: String,
    bind: Boolean,
    userType: '' | 'wechat' | 'phone',
  },
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
    this.checkState = this.checkState.bind(this);
    this.watchDriverState = this.watchDriverState.bind(this);
    this.checkUserType = this.checkUserType.bind(this);
    this.watchUserType = this.watchUserType.bind(this);
    this.state = {
      driverState: '',
    };
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;
      const key = routes[routes.length - 1].key;
      if (key === 'home' || key === 'login' || key === 'register-message' || key === 'bind-phone' || key === 'upload-message') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });

    // this.checkState(this.props.user.state);
    this.checkUserType();
    if (!this.props.app.login) {
      this.homeToLogin();
    }
  }

  componentWillUpdate(nextProps) {
    this.watchLogin(nextProps);
    // this.watchState(nextProps);
    this.watchLogout(nextProps);
  }

  componentDidUpdate(preProps) {
    this.watchDriverState(preProps);
    this.watchUserType(preProps);
  }

  watchDriverState(preProps) {
    if (preProps.user.state !== this.props.user.state) {
      this.setState({
        driverState: this.props.user.state,
      });
    }
  }

  checkUserType() {
    const { userType, bind } = this.props.user;
    if (userType === 'wechat' && !bind) {
      const { navigation } = this.props;
      const currentRoute = navigation.routes[navigation.routes.length - 1].key;

      this.replaceRoute(currentRoute, 'bind-phone');
    } else {
      this.checkState(this.props.user.state);
    }
  }

  watchUserType(preProps) {
    if (preProps.user.userType !== this.props.user.userType) {
      setTimeout(() => this.checkUserType(), 1);
    }
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
    }
  }
  watchState: (nextProps: Props) => void
  watchState(nextProps) {
    if (this.props.user.state !== nextProps.user.state) {
      this.checkState(this.state.driverState);
    }
  }

  checkState(state: String) {
    const { navigation } = this.props;
    const currentRoute = navigation.routes[navigation.routes.length - 1].key;
    console.log(currentRoute);
    switch (state) {
      case HAVE_REJECTED:
      case NOT_SUBMITTED:
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
      case 'bind-phone':
        return <BindPhone />;
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
