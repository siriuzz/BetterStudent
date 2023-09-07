import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB7n-_rxgpAp_r5t87blrMLnX8R1tfi9i8",
  authDomain: "betterstudent-2d8de.firebaseapp.com",
  projectId: "betterstudent-2d8de",
  storageBucket: "betterstudent-2d8de.appspot.com",
  messagingSenderId: "102026675691",
  appId: "1:102026675691:web:08e6fd642dd9a93292c5ae",
  measurementId: "G-9Y0HC7WVP6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
