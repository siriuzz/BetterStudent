import { color } from "@mui/system";
import { settings } from "firebase/analytics";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import COLORS from "../../constants/colors";



const handleSearch = (query) => {
  // para la logica de busqueda

};

const handleClearHistory = () => {
  // para limpiar el historial
  setSearchHistory([]);
};

//como deberia ser el filtro en teoria
//const filteredResults = items.filter((item) =>
//item.toLowerCase().includes(query.toLowerCase())
//);



const Sbar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Buscar Estudiante"
        value={searchQuery}
        iconColor="#C08708"
        placeholderTextColor={"#C08708"}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        onChangeText={(query) => setSearchQuery(query)}
        onIconPress={() => handleSearch(searchQuery)}
      />

      {searchHistory.length > 0 && (
        <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
          <Ionicons name="ios-trash-outline" size={24} color="red" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
    //el icono que esta con el searchHistory solo debe aparecer cuando tenga un historial
  );
};

export default Sbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: COLORS.white,

  },
  searchBar: {
    width: '95%',
    //height: '10%',
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#001347',
    paddingHorizontal: 16,

  },
  searchInput: {
    fontSize: 16,

  },
});