import { useEffect, useState, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet,Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddFood = ({onClick, meal}) => {
    const [filterData, setFilterData] = useState([])
    const [masterData, setMasterData] = useState([])

    const [search, setSearch] = useState('')
    const [selectedItem, setSelectedItem] = useState([])

    /*     useEffect(() => {
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
        }, []); */

    /* useEffect(() => {
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
    }, []); */
   


    const fetchFoods = async () => {
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
                setFilterData(responseJson);
                    
                })
                /*                 setMasterData(prevData => {
                                    const newData = [...prevData, ...responseJson];
                                    // AsyncStorage.setItem('foods', JSON.stringify(newData));
                                    return newData;
                                }); */
            
            .catch((error) => {
                console.error('A network error has occurred: ', error);
            });
    }


    /*  const searchFilter = (text) => {
         setSearch(text);
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
     } */

    const ItemView = ({ item }) => {
        return (
            <Text>
                {item.id}{'. '}{item?.name?.fi?.toUpperCase() ?? ''}
            </Text>
        );
    }

    const ItemSeperatorView = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: '#7a7070' }}></View>
        )
    }

    /*     const selectItem = async (item, meal) => {
            setSelectedItem(item);
            // await AsyncStorage.setItem('selectedItem', JSON.stringify(item));
            switch (meal) {
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
        }; */

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);


    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View>
                <TextInput
                    ref={inputRef}
                    style={styles.textInputStyle}
                    value={search}
                    selectionColor={'#F5680A'}
                    placeholder="Search"
                    onChangeText={setSearch}
                    
                //selectioncolor
                />
            </View>
            <View>
                <TouchableOpacity style={styles.button}
                    title="Search"
                    onPress={fetchFoods}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

            </View>
            <SafeAreaView>
                <FlatList
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={async () => {
                            setSelectedItem(prevItem => ({ ...prevItem, item }))
                            onClick(item, meal);
                            // await AsyncStorage.setItem('selectedItem', JSON.stringify(item))
                        }}>
                            <View style={styles.itemContainer}>
                                <Text styles={styles.itemText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={ItemSeperatorView}

                />
                {/*{selectedItem && (
                   <View>
                       <Text style={styles.result}>Name: {selectedItem.name}</Text>
                        <Text style={styles.result}>Calories: {selectedItem.calories}</Text>
                        
                    </View>
                    )}
                    */} 
                
            </SafeAreaView>
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

        justifyContent: 'center'
    },
    ItemStyle: {
        padding: 20,
    },
    textInputStyle: {
        borderColor: "#F5680A",
        width: "80%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'white',
        elevation: 5,
    },
    button: {
        backgroundColor: "#F5680A",
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        fontSize: 18,
        padding: 10,
        elevation: 5,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
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
    },
    cardContainer: {
        margin: 16,
        borderRadius: 8,
        elevation: 4
    },
    itemContainer: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    itemText: {
        fontSize: 20,
        color: 'black',
    },

})


export default AddFood;

/*<Text style={styles.result}>Calories: {selectedItem.calories}</Text>
                            <Text style={styles.result}>Protein: {selectedItem.protein_g}</Text>
                            <Text style={styles.result}>Carbohydrates: {selectedItem.carbohydrates_total_g}</Text>
                            <Text style={styles.result}>Fat: {selectedItem.fat_total_g}</Text>
                            <Text style={styles.result}>Saturated Fat: {selectedItem.fat_saturated_g}</Text>
                            <Text style={styles.result}>Fiber: {selectedItem.fiber_g}</Text>
                            <Text style={styles.result}>Sugar: {selectedItem.sugar_g}</Text>
                            <Text style={styles.result}>Sodium: {selectedItem.sodium_mg}</Text>
                            <Text style={styles.result}>Potassium: {selectedItem.potassium_mg}</Text>*/