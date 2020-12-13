/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/App';
import {Providers} from './src/Providers'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Providers);
