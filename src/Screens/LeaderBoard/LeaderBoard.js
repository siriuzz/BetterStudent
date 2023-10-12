import { settings } from "firebase/analytics";
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
  FlatList,
} from "react-native";
import Button from "../../components/Button";
import TopButtons from "../../components/TopButtons"
import COLORS from "../../constants/colors";
import LeaderBoardPerson from "../../components/LeaderBoardPerson";
import iconStar from "../../../assets/icon-star.png"
import { GlobalStyles } from "../GlobalStyles";

const data = [ //info de ejemplo
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },
  { image: iconStar, name: 'Donato Machado', major: 'Tecnologías de la Información y de la Comunicación', points: 1000 },

];

export default function LeaderBoard({ navigation }) {
  const [userDetails, setUserDetails] = React.useState({});
  React.useEffect(() => {
    getUserDetails();

  }, []);

  const getUserDetails = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const userDetailsArray = [JSON.parse(userData)]; // Convierte el objeto en un arreglo
        setUserDetails(userDetailsArray);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);//Manejador de Errores
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: '33%',
        alignItems: 'center',
      }}>
      <TopButtons
        enableGoBack={true}
        enableTopRightIcons={false} />

      <View style={{ width: '100%', alignItems: 'flex-start', paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.title}>LeaderBoard</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <LeaderBoardPerson
              filled={index > 0}  //Puedes personalizar esto según tus criterios
              position={index + 1} // Posicion del estudiante
              image={item.image} //Imagen del estudiante
              name={item.name} //Nombre del estudiante
              major={item.major} //Carrera del estudiante
              points={item.points} //Puntos del estudiante
            />
          )}
        />
        <Button onPress={() => { navigation.navigate('Home') }}>Home</Button>
      </View>

    </SafeAreaView>

  )
}