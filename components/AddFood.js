import { useEffect, useState, useRef } from 'react';
import { FlatList, SafeAreaView,StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
const AddFood = ({setBreakfast, setLunch, setDinner}) => {
    const [filterData, setFilterData] = useState([])
    const [masterData, setMasterData] = useState([])

    const [search, setSearch] = useState('')
    const [selectedItem, setSelectedItem] = useState([])


    useEffect(() => {
        const loadFoods = async () => {
          const storedFoods = await AsyncStorage.getItem('foods');
          if (storedFoods) {
            const foods = JSON.parse(storedFoods);
            setFilterData(foods);
            setMasterData(foods);
          }
        };
        loadFoods();
        fetchFoods();
      }, []);

      useEffect(() => {
        const loadSelectedItem = async () => {
          const storedItem = await AsyncStorage.getItem('selectedItem');
          if (storedItem) {
            setSelectedItem(JSON.parse(storedItem));
          }
        };
        loadSelectedItem();
      }, []);

      
    const fetchFoods =  async() => {
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
  setFilterData(prevData => {
    const newData = [...prevData, ...responseJson];
    AsyncStorage.setItem('foods', JSON.stringify(newData));
    return newData;
  });
  setMasterData(prevData => {
    const newData = [...prevData, ...responseJson];
    AsyncStorage.setItem('foods', JSON.stringify(newData));
    return newData;
  });
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

    const selectItem = async (item, meal) => {
        setSelectedItem(item);
        await AsyncStorage.setItem('selectedItem', JSON.stringify(item));
        switch(meal) {
            case 'breakfast':
                setBreakfast(prevItems => [...prevItems, item]);
                break;
            case 'lunch':
                setLunch(prevItems => [...prevItems, item]);
                break;
            case 'dinner':
                setDinner(prevItems => [...prevItems, item]);
                break;
            default:
                console.log('Invalid meal');
        }
      };

      const inputRef = useRef(null);

      useEffect(() => {
        inputRef.current.focus();
      }, []);

    
    return (
        
        <SafeAreaView style={{ backgroundColor: 'white' }}>
           
                <View>
                    
                    </View>
                   
            <View >
                <TextInput
                     ref={inputRef}
                     style={styles.textInputStyle}
                     value={search}
                     placeholder="Search"
                     onChangeText={(text) => searchFilter(text)}
                     //selectioncolor
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
                            <TouchableOpacity onPress={async () => {selectItem(item, 'breakfast', 'lunch', 'dinner', 'snack');
                            await AsyncStorage.setItem('selectedItem', JSON.stringify(item))}}>
                                <View style ={styles.itemContainer}>
                                    <Text styles={styles.itemText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={ItemSeperatorView}

                    />
                   {selectedItem && (
                        <View>
                            <Text style={styles.result}>Name: {selectedItem.name}</Text>
                            <Text style={styles.result}>Calories: {selectedItem.calories}</Text>
                            
                        </View>
                    )}
                </View>
               
            </View>
           
        

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },

  
    ItemStyle: {
        padding: 20,
        
    },

    textInputStyle: {
        borderColor: "#070707",
        width: "80%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        fontSize: 16, // Increase this value to make the text and cursor larger
        fontWeight: 'bold',
        backgroundColor: 'white',
       
    },
    button: {
        backgroundColor: "#42a5f5", // Change the background color
        padding: 10, 
        margin:10, 
        flex:1,// Change the padding
        borderRadius: 5, // Change the border radius
        elevation: 5, // Change the elevation
        justifyContent: "center", // Change the alignment along the y-axis
        alignItems: "center", // Change the alignment along the x-axis
        width: "70%", // Change the width
        fontSize: 18, // Change the font size
        paddingTop: 10,
      },
      buttonText: {
        color: 'black', // Change the text color
        fontSize: 15, // Change the text size
        fontWeight: 'bold', // Change the text weight
      },
    result: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        
    },
    cardContainer: {
        margin: 16,
        borderRadius: 8,
        elevation: 4},
 itemContainer: {
            padding: 20, // Increase the padding
            marginVertical: 10, // Add some vertical margin
            backgroundColor: '#f8f8f8', // Add a background color
            borderRadius: 10, // Add some border radius
          },
          itemText: {
            fontSize: 20, // Increase the font size
            color: 'black', // Change the text color
          },

})


export default App;