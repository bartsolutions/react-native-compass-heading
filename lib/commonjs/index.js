"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-compass-heading' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const CompassHeading = _reactNative.NativeModules.CompassHeading ? _reactNative.NativeModules.CompassHeading : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const CompassHeadingCallback = {
  start: (updateRate, callback) => {
    let subscription;
    if (_reactNative.Platform.OS === 'android') {
      const eventEmitter = new _reactNative.NativeEventEmitter(CompassHeading);
      subscription = eventEmitter.addListener('HeadingUpdated', data => {
        callback(data);
      });
      CompassHeading.start(updateRate || 0);
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
      CompassHeading.stop();
    };
  }
};
var _default = CompassHeadingCallback;
exports.default = _default;
//# sourceMappingURL=index.js.map