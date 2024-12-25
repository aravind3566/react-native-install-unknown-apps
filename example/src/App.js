import { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {
  checkAppInstallPermission,
  requestAppInstallPermission,
} from 'react-native-install-unknown-apps';

export default function App() {
  const [result, setResult] = useState();

  function checkPermission() {
    checkAppInstallPermission()
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        setResult(err.message);
      });
  }

  function requestPermission() {
    requestAppInstallPermission()
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        setResult(err.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        react-native-install-unknown-apps
      </Text>
      <Button title="Check Permission" onPress={checkPermission} />
      <Text>Result: {result?.toString()}</Text>
      <Button title="Request Permission" onPress={requestPermission} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
