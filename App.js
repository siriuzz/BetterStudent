import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import SignUp from "./src/Screens/Sign Up/SignUp"
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screens/Login/Login';
import Home from './src/Screens/Home/Home';
import Loader from './src/components/Loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subjects from "./src/Screens/Subjects/Subjects";
import LeaderBoard from "./src/Screens/LeaderBoard/LeaderBoard";
import Configuration from "./src/Screens/Configuration/Configuration";
import ChangePasswordLoggedIn from "./src/Screens/ChangePasswordLoggedIn/ChangePasswordLoggedIn";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');
    React.useEffect(() => {
    setTimeout(authUser, 1000);
    }, []);
  const authUser = async() => {
    try{
      let userData = await AsyncStorage.getItem('user');
      if(userData) {
        userData = JSON.parse(userData);
        if(userData?.loggedIn) {
          setInitialRouteName('Home');
        }else {
          setInitialRouteName('Login');
        }
      }else {
        setInitialRouteName('SignUp');
      }
    }catch(error) {
      setInitialRouteName('SignUp');
    }
  };
  return (
    <NavigationContainer>
      {initialRouteName == "" ? (
        <Loader visible={true}/>
      ) : (
        <>
          <Stack.Navigator 
            initialRouteName={initialRouteName}
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
            <Stack.Screen name="Configuration" component={Configuration} />
            <Stack.Screen name="ChangePasswordLoggedIn" component={ChangePasswordLoggedIn} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
