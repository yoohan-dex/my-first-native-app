import React, { Component, PropTypes } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { drawer, View } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import Login from './scenes/Login';
import MobileLogin from './scenes/MobileLogin';
import MobileRegister from './scenes/MobileRegister';
import RegisterMessage from './scenes/RegisterMessage';
import ItemDetial from './scenes/ItemDetail';
import Home from './scenes/Home';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {
  static propTypes = {
    popRoute: PropTypes.func,
    navigation: PropTypes.shape({
      key: PropTypes.string,
      routes: PropTypes.array,
    }),
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
  }

  popRoute() {
    this.props.popRoute();
  }

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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
