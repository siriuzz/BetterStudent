import { settings } from "firebase/analytics";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";
import Button from "../../components/Button";
import COLORS from "../../conts/colors";
import { GlobalStyles } from "../GlobalStyles";
import edit from "../../../assets/icon-edit.png";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfigScreen({navigation}){
  return(
    <SafeAreaView 
      style={{
        flex:1,
        backgroundColor: COLORS.white,
        paddingTop: '18%',
      }}>
      <ScrollView
        contentContainerStyle={{
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        }}
      >
        <Text style={GlobalStyles.title}>Configuración</Text>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('Home')}}>
            <View style={styles.nameIcon}>
              <Icon 
                name="newspaper-variant-outline"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Foto de perfil</Text>
            </View>
            {/*<Text style={styles.mode}></Text>*/}
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="bell-outline"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Notificaciones</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="alphabetical"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Idioma</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="security"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Seguridad</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="theme-light-dark"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Tema</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="account-question-outline"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Ayuda y soporte</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.nameIcon}>
              <Icon 
                name="message-text-outline"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Contactanos</Text>
            </View>
            <Text style={styles.mode}>Proximamente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('ChangePasswordLoggedIn')}}>
            <View style={styles.nameIcon}>
              <Icon 
                name="lock-outline"
                style={{fontSize: 24, marginRight: 12}}/>
              <Text>Cambiar contraseña</Text>
            </View>
            {/*<Text style={styles.mode}></Text>*/}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: 'white',
    elevation: 2,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    height: 34,
    width: 34,
    resizeMode: 'cover',
    borderRadius: 60,
  },
  option: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  mode: {
    color: COLORS.navyBlue,
  },
  nameIcon: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space",
    alignItems: "center",
  }
})