import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, FlatList } from 'react-native'
import { useState } from "react";

export default function SearchBar({ data }) {
    const [searchText, setSearchText] = useState('');
    const [filteredFriends, setFilteredFriends] = useState(data);

    const handleSearch = (text) => {
        setSearchText(text);

        // Filter the friends list based on the search text
        const filtered = data.filter((friend) =>
            friend.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredFriends(filtered);
    };

    const renderFriendItem = ({ item }) => (
        <FriendItem friend={item} />
    );
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Friends"
                onChangeText={handleSearch}
                value={searchText}
            />
            <FlatList
                data={filteredFriends}
                renderItem={renderFriendItem}
                keyExtractor={(item) => item.id.toString()} // Assuming each friend has a unique ID
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    searchInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        // marginBottom: 16,
    },
})
