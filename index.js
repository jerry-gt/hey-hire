/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import messaging from '@react-native-firebase/messaging';

 import App from './App';
 import {expo} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background: ' + remoteMessage);
});
 
 AppRegistry.registerComponent(expo.name, () => App);
 