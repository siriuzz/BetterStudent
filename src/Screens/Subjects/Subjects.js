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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.navyBlue }}>{name} - 0{number} </Text>
        <Text style={{ fontSize: 14, color: COLORS.navyBlue }}>Aula: {code}</Text>
      </View>
    </View>
  )
}

export default function SubjectScreen({ navigation }) {
  const [sections, setSections] = React.useState([]);
  React.useEffect(() => {

    async function getSections() {
      const user = await AsyncStorage.getItem('user');
      const userId = JSON.parse(user).id;
      const result = await axios.get(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/Students/${userId}/Sections`);
      setSections(result.data);
    }
    getSections();
  }, [])

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
          {sections.map((section) => {
            return (
              <SubjectItem code={section.classroom_code} number={section.number} name={section.subject.name} />
            )
          })}
          {/* <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} />
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
          <SubjectItem code={'MATE'} number={'1'} name={'Matemáticas'} /> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}