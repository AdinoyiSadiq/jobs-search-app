import { Notifications } from 'expo';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';

import registerForNotifications from './services/push_notifications';
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';


const MainNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      map: MapScreen,
      deck: DeckScreen,
      review: {
        screen: createStackNavigator({
          review: ReviewScreen,
          settings: SettingsScreen
        }),
        navigationOptions: ({navigation}) => ({
          title: 'Review',
          tabBarIcon: ({ tintColor }) => {
            return <Icon name='favorite' size={30} color={tintColor} />
          }
        })
    }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }
});
 
const AppContainer = createAppContainer(MainNavigator);
 
export default class App extends Component {
  // componentDidMount() {
  //   registerForNotifications();
  //   Notifications.addListener((notification) => {
  //     const { data: { text }, origin } = notification;
  //     if (origin === 'recieved' && text) {
  //       Alert.alert(
  //         'New Push Notification',
  //         text,
  //         [{ text: 'Ok.' }]
  //       );
  //     }
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
