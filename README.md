# 📱 react-native-install-unknown-apps

A lightweight React Native library to manage and enable the **'Install Unknown Apps'** permission on **Android devices**. Ideal for apps that need to install APK files from external sources.

## 🚀 Installation

Using **npm**:

```sh
npm install react-native-install-unknown-apps
```

Using **yarn**:

```sh
yarn add react-native-install-unknown-apps
```

## 📖 Usage

```js
import {
  checkAppInstallPermission,
  requestAppInstallPermission,
} from 'react-native-install-unknown-apps';

// Check if the app can request install packages permission
const checkPermission = async () => {
  const hasPermission = await checkAppInstallPermission();
  if (!hasPermission) {
    await requestAppInstallPermission();
  }
};

checkPermission();
```

## 🛠️ API

### `checkAppInstallPermission()`

- Returns: `Promise<boolean>`
- Checks if the app has permission to install unknown apps.

### `requestAppInstallPermission()`

- Opens a permission dialog to request install unknown apps permission.

## ✅ Supported Platforms

- **Android** (API level 26+)
- Not supported on iOS

## 🎥 Demo Video

(https://github.com/aravind3566/react-native-install-unknown-apps/blob/main/assets/demo.gif)

Watch the demo video to see the library in action:

[![Watch the video](https://img.youtube.com/vi/18PS-yj3KM4/0.jpg)](https://youtube.com/shorts/18PS-yj3KM4)


## 📄 License

MIT

---

Made with ❤️ by [Aravind] 🚀
