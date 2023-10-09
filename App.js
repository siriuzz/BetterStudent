import React from "react";
import { Platform, Settings, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
import { PaperProvider } from 'react-native-paper';
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ConfigScreen from "./src/Screens/Configuration/Configuration";
//dependencia npm install @react-navigation/bottom-tabs
import FriendScreen from "./src/Screens/Friends/Friends";
import SearchScreen from "./src/Screens/Searcher/Searcher";
import SubjectScreen from "./src/Screens/Subjects/Subjects";
import LeaderBoard from "./src/Screens/LeaderBoard/LeaderBoard";
import ChangePasswordLoggedIn from "./src/Screens/ChangePasswordLoggedIn/ChangePasswordLoggedIn";
import { Ionicons } from '@expo/vector-icons';
import { height } from "@mui/system";







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

const homeName = "Home"
const ConfigurationName = 'Configuracion'
const FriendName = 'Amigos'
const SearchName = 'Buscador'
const SubjectName = 'Asignaturas'


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();



const TabNavigator = () =>{
  return(
    <Tab.Navigator shifting={false} barStyle={{height:55, backgroundColor:"#FFFFFF"}} >
      <Tab.Screen 
      name={SubjectName} 
      component={SubjectScreen} 
      options={{
        tabBarIcon:({focused})=>{
          return(
          <View>
            <Ionicons name={focused? "book":"book-outline"} size={24} color={focused ? "#C08708":"#002793"} />
          </View>)
        },
        tabBarLabel: ""

        }} />
      <Tab.Screen name={FriendName} 
      component={FriendScreen} 
      options={{
        tabBarIcon:(
          {focused})=>{
            return(
            <View>
              <Ionicons name={focused? "person":"person-outline"} size={24} color={focused ? "#C08708":"#002793"} />
            </View>
            )
            },
            tabBarLabel: ""
            }}/>
      <Tab.Screen 
      name={homeName} 
      component={Home} 
      options={{
        tabBarIcon:({focused})=>{
          return(
            <View
            style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  width: Platform.OS == "ios" ? 50 : 35,
                  height: Platform.OS == "ios" ? 50 : 35,
                  top: Platform.OS == "ios" ? -10 : -5,
                  borderRadius: Platform.OS == "ios" ? 25 : 10,
                  elevation: 7,
            }}
            >
          <Ionicons name={focused?"home":"home-outline"} size={24} color={focused ? "#C08708":"#002793"}/>
            </View>
          )
        },
        tabBarLabel: ""
      }}/>
      <Tab.Screen 
      name={SearchName} 
      component={SearchScreen} 
      options={{
        tabBarIcon:({focused})=>{
          return(
          <View>
            <Ionicons name={focused? "search":"search-outline"} size={24} color={focused ? "#C08708":"#002793"} />
          </View>
          )
          },
          tabBarLabel: ""
          }} />
      <Tab.Screen 
      name={ConfigurationName} 
      component={ConfigScreen}
      options={{
        tabBarIcon:({focused})=>{
          return(
          <View>
            <Ionicons name={focused? "settings":"settings-outline"} size={24} color={focused ? "#C08708":"#002793"} />  
          </View>
          )
          },
          tabBarLabel: ""
        }}/>
    </Tab.Navigator>
  )
}

function StackNavigator(){
return(
  <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}} />
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} options={{headerShown:false}} />
        <Stack.Screen name="ChangePasswordLoggedIn" component={ChangePasswordLoggedIn} options={{headerShown:false}} />
        
    </Stack.Navigator>

)
}



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
      
      <StackNavigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
      </StackNavigator>
      
      

      {initialRouteName == "" ? (
        <Loader visible={true}/>
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