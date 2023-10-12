import AsyncStorage from "@react-native-async-storage/async-storage";
import { settings } from "firebase/analytics";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  Image
} from "react-native";
import COLORS from "../constants/colors";
import TopButtons from "./TopButtons";
import Logo from "../../assets/Logo.png";
import Input from "./Input";
import Button from "./Button";
import Loader from "./Loader";
import { useNavigation } from '@react-navigation/native';
import Login from "../Screens/Login/Login"



export default function ChangePasswordContent(props) {
  const navigation = useNavigation(); // Usa useNavigation para acceder a la navegación

  const [userDetails, setUserDetails] = React.useState({});
  React.useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };


  const [inputs, setInputs] = React.useState({
    oldPassword: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.password || !inputs.passwordConfirm) {
      handleError("Se requiere una contraseña", "oldPassword");
      handleError("Se requiere una nueva contraseña", "password");
      handleError("Se requiere confirmar la nueva contraseña", "passwordConfirm");
      valid = false;
    } else if (inputs.oldPassword !== userDetails.password) {
      handleError("La contraseña no coincide", "oldPassword");
      valid = false;
    } else if (inputs.password.length < 5) {
      console.log(inputs)
      handleError("La contraseña debe de contener por lo menos 5 caracteres", "password");
      valid = false;
    } else if (inputs.password !== inputs.passwordConfirm) {
      handleError("La contraseña no coincide", "passwordConfirm");
      valid = false;
    }

    if (valid) {
      change();
    }
  };

  const change = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        if (userDetails) {
          userDetails.password = inputs.password;
          userDetails.passwordConfirm = inputs.passwordConfirm;

          AsyncStorage.setItem('user', JSON.stringify(userDetails),);
          logout();
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong!");
      }
    }, 1000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const logout = async () => {
    AsyncStorage.setItem('user', JSON.stringify({ ...userDetails, loggedIn: false }),);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <Loader visible={loading} />

      <ScrollView
        contentContainerStyle={{
          paddingTop: 100,
          paddingHorizontal: 20,
        }}>

        <Image
          source={Logo}
          style={{
            height: 200,
            width: 150,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold", alignSelf: 'center', marginTop: 10 }}>
          Cambiar contraseña
        </Text>
        <Text style={{ color: COLORS.navyBlue, fontSize: 14, fontWeight: "normal", marginTop: 10 }}>
          Tu contraseña debe de tener al menos 5 cararacteres, y deberia de incluir combinaciones de numeros, letras y caracteres especiales
        </Text>

        <View style={{ marginVertical: 20 }}>
          {props.loggedIn === true ? (
            <Input
              placeholder="Ingresa tu contraseña actual"
              iconName="lock-outline"
              placeholderTextColor={COLORS.grey}
              label="Contraseña actual"
              error={errors.oldPassword}
              onFocus={() => {
                handleError(null, "oldPassword");
              }}
              onChangeText={(text) => handleOnChange(text, "oldPassword")}
              password
            />
          ) : (
            null
          )}
          <Input
            placeholder="Ingresa tu nueva contraseña"
            iconName="lock-outline"
            placeholderTextColor={COLORS.grey}
            label="Contraseña nueva"
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
            password
          />
          <Input
            placeholder="Confirma tu nueva contraseña"
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
          <Button title="Continuar" onPress={validate} />
        </View>
      </ScrollView>
      <TopButtons
        enableGoBack={true}
        enableTopRightIcons={false}
      />
    </SafeAreaView>
  )
}