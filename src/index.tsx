import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-install-unknown-apps' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InstallUnknownApps = NativeModules.ApkInstaller
  ? NativeModules.ApkInstaller
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function checkAppInstallPermission(): Promise<number> {
  if (Platform.OS !== 'android') {
    return Promise.reject(
      new Error('This library is only available on Android.')
    );
  }
  return InstallUnknownApps.checkInstallPermission();
}

export function requestAppInstallPermission(): Promise<number> {
  if (Platform.OS !== 'android') {
    return Promise.reject(
      new Error('This library is only available on Android.')
    );
  }
  return InstallUnknownApps.requestInstallPermission();
}
