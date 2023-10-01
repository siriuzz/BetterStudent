import React from "react";
import { Settings, StyleSheet, Text, View } from "react-native";
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
//import MainContainer from "./src/Screens/MainContainer/MainContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import ConfigScreen from "./src/Screens/Configuration/Configuration";
//dependencia npm install @react-navigation/bottom-tabs
import FriendScreen from "./src/Screens/Friends/Friends";
import SearchScreen from "./src/Screens/Searcher/Searcher";
import SubjectScreen from "./src/Screens/Subjects/Subjects";
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 





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
const Tab = createBottomTabNavigator();

function TabNavigator(){
  return(
        <Tab.Navigator initialRouteName={homeName}
        screenOptions={({route}) => ({
            tabBarIcon:({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if(rn === homeName){
                    iconName = focused ? 'home': 'home-outline'
                    color= focused ? '#C08708' : '#002793'
                } else if (rn === ConfigurationName){
                    iconName = focused ? 'settings': 'settings-outline'
                    color= focused ? '#C08708' : '#002793'
                } else if(rn===FriendName){
                  iconName = focused ? 'person-add': 'person-add-outline'
                  color= focused ? '#C08708' : '#002793'
                }else if(rn===SearchName){
                  iconName = focused ? 'search': 'search-outline'
                  color= focused ? '#C08708' : '#002793'
                }else if(rn===SubjectName){
                  iconName = focused ? 'book': 'book-outline'
                  color= focused ? '#C08708' : '#002793'
                }

                return <Icon name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: '#C08708',
            tabBarInactiveTintColor: '#002793'
            })}>
            <Tab.Screen name={SubjectName} component={SubjectScreen}/>
            <Tab.Screen name={FriendName} component={FriendScreen}/>
            <Tab.Screen name={homeName} component = {Home}/>
            <Tab.Screen name={SearchName} component={SearchScreen}/>
            <Tab.Screen name ={ConfigurationName} component={ConfigScreen}/>
        </Tab.Navigator> 
)
  }

function StackNavigator(){
return(
  <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={TabNavigator} />
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
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
