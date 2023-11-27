import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';

const App = () => {

    const [filterData, setFilterData] = useState([])
    const [masterData, setMasterData] = useState([])

    const [search, setSearch] = useState('')
    const [selectedItem, setSelectedItem] = useState([])


    useEffect(() => {
        fetchFoods();
        return () => {

        }
    }, [])

    const fetchFoods = () => {
        const apiKey = 'dGxFQdpsi5C54xpi0VATwLach0DWvX8zWF85Cbd9'; // Replace 'YOUR_API_KEY' with your actual API key
        const apiURL = `https://api.api-ninjas.com/v1/nutrition?query=${search}`;
        fetch(apiURL, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson); // to log the answer in the console
                setFilterData(prevData => [...prevData, ...responseJson]); //  list
                setMasterData(prevData => [...prevData, ...responseJson]);
            })
            .catch((error) => {
                console.error('A network error has occurred: ', error);
            });
    }


    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(masterData)
            setSearch(text);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <Text>
                {item.id}{'. '}{item.name && item.name.fi ? item.name.fi.toUpperCase() : ''}
            </Text>
        );
    }

    const ItemSeperatorView = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: '#7a7070' }}></View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    value={search}
                    placeholder="search here"
                    onChangeText={(text) => searchFilter(text)}
                />
                <View>
                    <TouchableOpacity style={styles.button}
                        title="Search"
                        onPress={fetchFoods}>
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>

                </View>
                <View>
                    <FlatList
                        data={filterData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => setSelectedItem(item)}>
                                <View>
                                    <Text>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={ItemSeperatorView}

                    />
                    {selectedItem && (
                        <View>
                            <Text style={styles.result}>Name: {selectedItem.name}</Text>
                            <Text style={styles.result}>Calories: {selectedItem.calories}</Text>
                            <Text style={styles.result}>Serving Size: {selectedItem.serving_size_g}</Text>
                            <Text style={styles.result}>Fat Total: {selectedItem.fat_total_g}</Text>
                            <Text style={styles.result}>Fat Saturated: {selectedItem.fat_saturated_g}</Text>
                            <Text style={styles.result}>Protein: {selectedItem.protein_g}</Text>
                            <Text style={styles.result}>Sodium: {selectedItem.sodium_mg}</Text>
                            <Text style={styles.result}>Potassium: {selectedItem.potassium_mg}</Text>
                            <Text style={styles.result}>Cholesterol: {selectedItem.cholesterol_mg}</Text>
                            <Text style={styles.result}>Carbohydrate: {selectedItem.carbohydrate_g}</Text>
                            <Text style={styles.result}>Fiber: {selectedItem.fiber_g}</Text>
                            <Text style={styles.result}>Sugar: {selectedItem.sugar_g}</Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8d2d2',
        marginTop: 30,
        padding: 60,
        width: '120%',
        marginLeft: -30,
        marginRight: 30,
        borderRadius: 30,
        elevation: 6,
        flex: 0,
    },
    ItemStyle: {
        padding: 20,
        
    },
    textInputStyle: {
        borderWidth: 1,
        paddingLeft: 20,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        borderRadius: 30,
        width: '150%',
        borderColor: '#ffffff',
        backgroundColor: '#e0aeae',
        textAlign: 'center',
        alignSelf: 'center',
        elevation: 3,
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',

       
    },
    button: {
        backgroundColor: '#e0aeae',
        borderColor: '#323030',
        borderRadius: 30,
        padding: 10,
        width: '50%',
        marginLeft: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,  
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    result: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }

})


export default App;