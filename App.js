import React from "react";
import { Platform, Settings, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SignUp from "./src/Screens/Sign Up/SignUp"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login/Login';
import Home from './src/Screens/Home/Home';
import Loader from './src/components/Loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConfigScreen from "./src/Screens/Configuration/Configuration";
//dependencia npm install @react-navigation/bottom-tabs
import FriendScreen from "./src/Screens/Friends/Friends";
import SearchScreen from "./src/Screens/Searcher/Searcher";
import SubjectScreen from "./src/Screens/Subjects/Subjects";
import LeaderBoard from "./src/Screens/LeaderBoard/LeaderBoard";
import ChangePasswordLoggedIn from "./src/Screens/ChangePasswordLoggedIn/ChangePasswordLoggedIn";
import { Ionicons } from '@expo/vector-icons';
import { height } from "@mui/system";
import COLORS from "./src/constants/colors";

const homeName = "Home"
const ConfigurationName = 'Configuracion'
const FriendName = 'Amigos'
const SearchName = 'Buscador'
const SubjectName = 'Asignaturas'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ icon, focusedIcon, focused }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Ionicons name={focused ? icon : focusedIcon} size={24} color={focused ? COLORS.gold : COLORS.navyBlue} />
    </View>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator options={{
      // tabBarActiveTintColor: "#C08708",

    }}

      barStyle={{ height: 65, backgroundColor: "#FFFFFF" }} activeColor="#ffffff">
      <Tab.Screen
        name={SubjectName}
        component={SubjectScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon="book" focusedIcon="book-outline" focused={focused} />
            )
          },
          headerShown: false,

          tabBarLabel: "",
          activeBackgroundColor: "#1fffff"

        }}
      />
      <Tab.Screen name={FriendName}
        component={FriendScreen}
        options={{
          tabBarIcon: (
            { focused }) => {
            return (
              <TabIcon icon="person" focusedIcon="person-outline" focused={focused} />
            )
          },
          tabBarLabel: "",
          headerShown: false,

        }} />
      <Tab.Screen
        name={homeName}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  width: 40,
                  height: 40,
                  top: Platform.OS == "ios" ? -10 : -5,
                  borderRadius: Platform.OS == "ios" ? 25 : 10,
                  elevation: 6,
                }}
              >
                <Ionicons name={focused ? "home" : "home-outline"} size={28} color={focused ? "#C08708" : "#002793"} />
              </View>
            )
          },
          tabBarLabel: "",
          headerShown: false,

        }} />
      <Tab.Screen
        name={SearchName}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon="search" focusedIcon="search-outline" focused={focused} />
            )
          },
          tabBarLabel: "",
          headerShown: false,

        }} />
      <Tab.Screen
        name={ConfigurationName}
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon icon="settings" focusedIcon="settings-outline" focused={focused} />
            )
          },
          tabBarLabel: "",
          headerShown: false,

        }} />
    </Tab.Navigator>
  )
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePasswordLoggedIn" component={ChangePasswordLoggedIn} options={{ headerShown: false }} />

    </Stack.Navigator>

  )
}



export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(() => {
    setTimeout(authUser, 1000);
  }, []);
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName('Home');
        } else {
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('SignUp');
      }
    } catch (error) {
      setInitialRouteName('SignUp');
    }
  };

  return (


    <NavigationContainer>

      <StackNavigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      </StackNavigator>



      {initialRouteName == "" ? (
        <Loader visible={true} />
      ) : (
        <>
          {/* initialRouteName={initialRouteName} */}
          {/* screenOptions={{headerShown:false}} */}

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