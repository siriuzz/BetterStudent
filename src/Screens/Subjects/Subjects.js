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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../constants/colors";
import { GlobalStyles } from "../GlobalStyles";

function SubjectItem({ code, number, name }) {
  return (
    <View style={{
      width: '100%',
      height: 60,
      backgroundColor: COLORS.white,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      justifyContent: 'left',
      paddingHorizontal: 20,
      marginBottom: 20,
    }}>
      <View style={{ paddingRight: 15 }}>
        <MaterialIcon name="class" size={24} color={COLORS.navyBlue} />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.navyBlue }}>{code}-{number}-{name}</Text>
      </View>
    </View>
  )
}

export default function SubjectScreen({ navigation }) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
      width: '100%',
      paddingTop: '20%',
      paddingHorizontal: '4%',
      alignItems: 'left',
    }}>

      <View>
        <Text style={GlobalStyles.title}>Asignaturas</Text>
      </View>
      <ScrollView >
        <View style={{ alignContent: "center", paddingHorizontal: "1%", marginTop: "1%" }}>
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}