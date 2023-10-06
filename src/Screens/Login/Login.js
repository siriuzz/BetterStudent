import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import COLORS from "../../conts/colors";
import Logo from "../../../assets/Logo.png";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError("Email is required", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Password is required", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, loggedIn: true }),
          );
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", "Email or password is incorrect!");
        }
      } else {
        Alert.alert("Error", "User does not exist!");
      }
    }, 1000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Image 
            source={Logo}
            style={{
            height: 250,
            width: 200,
            alignSelf: 'center',
            }}
        />
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold", alignSelf: 'center', marginTop: 10 }}>
          Iniciar sesión
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Ingresa tu correo"
            iconName="email-outline"
            placeholderTextColor={COLORS.grey}
            label="Correo"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <Input
            placeholder="Ingresa tu contraseña"
            iconName="lock-outline"
            placeholderTextColor={COLORS.grey}
            label="Contraseña"
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
            password
          />
          <Button title="Ingresar" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("SignUp")}
            style={{
              color: COLORS.black,
              marginTop: 1,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ¿No tienes una cuenta? <Text style={{ color: COLORS.darkYellow }}>Registrate</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;