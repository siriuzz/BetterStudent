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

import Logo from "../../../assets/Logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import COLORS from "../../conts/colors";

const SignUp = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.fullName) {
      handleError("Se require tu nombre completo", "fullName");
      valid = false;
    }

    if (!inputs.email) {
      handleError("Se requiere un correo", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Ingresa un correo valido", "email");
      valid = false;
    }

    if (!inputs.phoneNumber) {
      handleError("Se requiere un numero telefónico", "phoneNumber");
      valid = false;
    } else if (inputs.phoneNumber.length < 10 || inputs.phoneNumber.match(/\D/)) {
        handleError("Ingresa un numero telefónico valido", "phoneNumber");
        valid = false;
    }

    if (!inputs.password || !inputs.passwordConfirm) {
      handleError("Se requiere una contraseña", "password");
      handleError("Se requiere confirmar la contraseña", "passwordConfirm");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("La contraseña debe de contener por lo menos 5 caracteres", "password");
      valid = false;
    } else if (inputs.password !== inputs.passwordConfirm) {
        handleError("La contraseña no coincide", "password");
        handleError("La contraseña no coincide", "passwordConfirm");
        valid = false;
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", "Something went wroing!");
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
            height: 130,
            width: 100,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: COLORS.black,
            fontSize: 40,
            fontWeight: "bold",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Registrate
        </Text>
        <View style={{ marginVertical: 10, marginTop: 1 }}>
          <Input
            placeholder="Ingresa tu nombre completo"
            placeholderTextColor={COLORS.grey}
            iconName="account-outline"
            label="Nombre"
            error={errors.fullName}
            onFocus={() => {
              handleError(null, "fullName");
            }}
            onChangeText={(text) => handleOnChange(text, "fullName")}
          />
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
            keyboardType="numeric"
            placeholder="Ingresa tu número de teléfono"
            placeholderTextColor={COLORS.grey}
            iconName="phone-outline"
            label="Numero de telefono"
            error={errors.phoneNumber}
            onFocus={() => {
              handleError(null, "phoneNumber");
            }}
            onChangeText={(text) => handleOnChange(text, "phoneNumber")}
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
          <Input
            placeholder="Ingresa tu contraseña"
            iconName="lock-outline"
            placeholderTextColor={COLORS.grey}
            label="Confirmar contraseña"
            error={errors.passwordConfirm}
            onFocus={() => {
              handleError(null, "passwordConfirm");
            }}
            onChangeText={(text) => handleOnChange(text, "passwordConfirm")}
            password
          />
          <Button title="Enviar" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Text style={{ color: COLORS.darkYellow }}>Inicia sesión</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
