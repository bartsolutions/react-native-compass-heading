import { NativeModules, NativeEventEmitter, Platform } from 'react-native';


const LINKING_ERROR =
  `The package 'react-native-compass-heading' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CompassHeading = NativeModules.CompassHeading
  ? NativeModules.CompassHeading
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );


type dataType = {
  heading: number;
  accuracy: number;
};

const CompassHeadingCallback = {
  start: ( updateRate: number, callback: (data: dataType) => void) => {
    let subscription: { remove: () => any } | null;
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter(CompassHeading);
      subscription = eventEmitter.addListener(
        'HeadingUpdated',
        (data: dataType) => {
          callback(data);
        }
      );
      CompassHeading.start(updateRate || 0);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
      CompassHeading.stop();
    };
  },
};

export default CompassHeadingCallback;
