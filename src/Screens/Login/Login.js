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
import COLORS from "../../constants/colors";
import Logo from "../../../assets/Logo.png";
import axios from "axios";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// import NavigationActions from "@react-navigation";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
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
    // console.log(process.env.EXPO_PUBLIC_EXPRESS_URL)

    axios.post(`${process.env.EXPO_PUBLIC_EXPRESS_FORWARDED_URL}/api/login`, {
      email: inputs.email,
      password: inputs.password,
    }).then((response) => {
      // console.log(response);
      if (response.data.email !== undefined) {
        // console.log(response.data);
        AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
        navigation.navigate("Home");
      } else {
        return Alert.alert("Error", "Email or password is incorrect!");

      }

    }).catch((error) => {
      console.log(error);
      return Alert.alert("Error", "Email or password is incorrect!");
    });

    // if (userData) {
    //   userData = JSON.parse(userData);
    //   if (
    //     inputs.email == userData.email &&
    //     inputs.password == userData.password
    //   ) {
    //     AsyncStorage.setItem(
    //       "user",
    //       JSON.stringify({ ...userData, loggedIn: true }),
    //     );
    //     navigation.navigate("Home");
    //   } else {
    //     Alert.alert("Error", "Email or password is incorrect!");
    //   }
    // } else {
    //   Alert.alert("Error", "User does not exist!");
    // }
    setLoading(false);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    // const user = AsyncStorage.getItem('user');
    // console.log(user.name);
    // const preventGoingBack = () => {
    //   if (user.name != undefined) {
    //     console.log("hey ", user);
    //     const resetAction = navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'Home' }], // Replace 'Home' with the name of your desired screen.
    //     });
    //     navigation.dispatch(resetAction);
    //   }
    // }
    // preventGoingBack();
  })

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
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
            ¿No tienes una cuenta? <Text style={{ color: COLORS.darkYellow }}>Regístrate</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
