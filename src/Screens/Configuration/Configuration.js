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
  StyleSheet
} from "react-native";
import Button from "../../components/Button";
import COLORS from "../../conts/colors";
import OptionSection from "../../components/OptionSection";

export default function ConfigScreen({navigation}){
  return(
    <SafeAreaView 
      style={{
        flex:1,
        backgroundColor: COLORS.white,
        paddingTop: '17%',
      }}>
      <ScrollView
        contentContainerStyle={{
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        }}
      >
        <Text style={styles.title}>Configuración</Text>

        <View>
        <OptionSection />
        </View>

        <Text>Ir a home</Text>
        <Button onPress={() => {navigation.navigate('Home')}}>Home</Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
  },
})