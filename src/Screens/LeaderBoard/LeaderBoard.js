import { settings } from "firebase/analytics";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  Image,
} from "react-native";
import Button from "../../components/Button";



export default function LeaderBoard({navigation}){
  return(
    <View style={{marginTop:'10%', paddingHorizontal: 20,}}>
      <Text>Leader board screen</Text>
      <Text>Ir a home</Text>
      <Button onPress={() => {navigation.navigate('Home')}}>Home</Button>
      <Text>Ir a configuracion</Text>
      <Button onPress={() => {navigation.navigate('Configuration')}}>Configuration</Button>
    </View>
  )
}