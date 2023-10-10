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
import COLORS from "../../constants/colors";
import Info from "../../components/Info";
import { GlobalStyles } from "../GlobalStyles";
import FriendListItem from "../../components/FriendListItem";
import SearchBar from "../../components/SearchBar";

export default function FriendScreen({ navigation }) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: '20%',
      alignItems: 'center',
    }}>
      <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.title}>Amigos</Text>
        <SearchBar data={[]} />
        <ScrollView>
          <View style={{ width: '100%', alignItems: 'center', paddingTop: 10, paddingBottom: 20 }}>
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/splash.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
            <FriendListItem image={'../../../assets/Logo.png'} name={"Juan"} major={'ing'} />
          </View>

        </ScrollView>
      </View>

    </SafeAreaView >
  )
}