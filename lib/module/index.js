import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-compass-heading' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const CompassHeading = NativeModules.CompassHeading ? NativeModules.CompassHeading : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const CompassHeadingCallback = {
  start: (updateRate, callback) => {
    let subscription;
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter(CompassHeading);
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
export default CompassHeadingCallback;
//# sourceMappingURL=index.js.map