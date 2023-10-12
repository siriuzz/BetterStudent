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
  FlatList,
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
  const [searchResults, setSearchResults] = useState([]);

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      setSearchResults(searchDummyData(query));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchIconPress = () => {
    // Update the search history when the search icon is pressed
    setSearchHistory((prevHistory) => {
      if (searchQuery && !prevHistory.includes(searchQuery)) {
        return [searchQuery, ...prevHistory];
      }
      return prevHistory;
    });
  };

  const searchDummyData = (query) => {
    // Simulated data with type "result"
    return [
      { type: "result", name: `Result 1 for "${query}"` },
      { type: "result", name: `Result 2 for "${query}"` },
      { type: "result", name: `Result 3 for "${query}"` },
    ];
  };

  const Item = ({ item }) => {
    const handleResultClick = () => {
      setSearchQuery(item.name);
    };

    return (
      <TouchableOpacity onPress={handleResultClick}>
        <View style={styles.resultItem}>
          <Text style={styles.resultText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Searchbar
          placeholder="Buscar Estudiante"
          value={searchQuery}
          iconColor="#C08708"
          placeholderTextColor="#C08708"
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          onChangeText={(query) => handleSearch(query)}
          onIconPress={handleSearchIconPress}
        />

        {searchQuery.length === 0 && searchHistory.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
            <Ionicons name="ios-trash-outline" size={24} color="#002793" />
          </TouchableOpacity>
        )}
      </View>

      {searchQuery.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Item item={item} />}
          style={styles.resultsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <FlatList
          data={searchHistory}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSearch(item)}>
              <View style={styles.resultItem}>
                <Text style={styles.resultText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.resultsList}
        />
      )}
    </SafeAreaView>
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
  resultsList: {
    width: '95%',
    flex: 1,
  },
  resultItem: {
    padding: 16,
    padding: 4,
    margin: 4,
    borderRadius: 4,
  },
  resultText: {
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 'auto',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  historyHeader: {
    fontSize: 16,
    margin: 8,
    fontWeight: 'bold',
  },
});

