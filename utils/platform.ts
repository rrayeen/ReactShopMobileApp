import {Platform} from 'react-native';

/**
 * Constants that indicate the current platform and environment.
 *
 * @readonly
 * @enum {boolean}
 */

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_DEV = __DEV__;

/**
 * `IS_IOS` is `true` if the app is running on an iOS device.
 * `IS_ANDROID` is `true` if the app is running on an Android device.
 * `IS_DEV` is `true` if the app is running in development mode (i.e. not in a production build).
 */
