import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Pressable, Modal } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"
import { colors } from '../styles/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default () => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(true)
    const [selectedItem, setSelectedItem] = useState([])
    // Add food diary osa
    const [breakfastExpanded, setBreakfastExpanded] = useState(false);
    const [lunchExpanded, setLunchExpanded] = useState(false);
    const [dinnerExpanded, setDinnerExpanded] = useState(false);
    const [snacksExpanded, setSnacksExpanded] = useState(false);
    const [supperExpanded, setSupperExpanded] = useState(false);

    const [breakfast, setBreakfast] = useState([]);
    const breakfastCalories = Math.ceil(breakfast.reduce((total, currentValue) =>
        total + currentValue.calories, 0));
    const [lunch, setLunch] = useState([]);
    const lunchCalories = Math.ceil(lunch.reduce((total, currentValue) =>
        total + currentValue.calories, 0));
    const [dinner, setDinner] = useState([]);
    const dinnerCalories = Math.ceil(dinner.reduce((total, currentValue) =>
        total + currentValue.calories, 0));
    const [supper, setSupper] = useState([]);
    const supperCalories = Math.ceil(supper.reduce((total, currentValue) =>
        total + currentValue.calories, 0));
    const [snacks, setSnacks] = useState([]);
    const snacksCalories = Math.floor(snacks.reduce((total, currentValue) =>
        total + currentValue.calories, 0));

    const totalCalories = breakfastCalories + lunchCalories +
        dinnerCalories + snacksCalories + supperCalories;

    const [breakfastIconColor, setBreakfastIconColor] = useState(colors.secondary);
    const [lunchIconColor, setLunchIconColor] = useState(colors.secondary);
    const [dinnerIconColor, setDinnerIconColor] = useState(colors.secondary);
    const [snacksIconColor, setSnacksIconColor] = useState(colors.secondary);
    const [supperIconColor, setSupperIconColor] = useState(colors.secondary);

    useEffect(() => {
        const loadData = async () => {
            await loadMeal('breakfast', selectedDate).then(items => setBreakfast(items.map(item => item.food)))
            await loadMeal('lunch', selectedDate).then(items => setLunch(items.map(item => item.food)))
            await loadMeal('dinner', selectedDate).then(items => setDinner(items.map(item => item.food)))
            await loadMeal('supper', selectedDate).then(items => setSupper(items.map(item => item.food)))
            await loadMeal('snacks', selectedDate).then(items => setSnacks(items.map(item => item.food)))
        }
        loadData()
    }, [selectedDate])


    const saveMeal = async (meal, date, food) => {
        try {
            //await AsyncStorage.clear()
            const prevItems = JSON.parse(await AsyncStorage.getItem('foods'))
            const item = {
                meal, date: getFormatedDate(date, 'DD.MM.YYYY'), food
            }
            await AsyncStorage.setItem('foods', JSON.stringify(prevItems ? [...prevItems, item] : [item]));
        } catch (e) {
            console.log(e)
        }
    }

    const loadMeal = async (meal, date) => {
        try {
            const data = await AsyncStorage.getItem('foods');
            const json = JSON.parse(data)
            if (json != null) {
                return json.filter(item => item.meal === meal && item.date === getFormatedDate(date, "DD.MM.YYYY"))
            }
            return [];
        }
        catch (e) {
            console.log(e)
        }
    }

    const handlePress = () => {
        setExpanded(!expanded);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    //loppuu

    const deleteFoodItem = (mealType, index) => {
        switch (mealType) {
            case 'breakfast':
                setBreakfast((prevBreakfast) => {
                    return prevBreakfast.filter((item, i) => i !== index);
                });
                break;
            case 'lunch':
                setLunch((prevLunch) => {
                    return prevLunch.filter((item, i) => i !== index);
                });
                break;
            case 'dinner':
                setDinner((prevDinner) => {
                    return prevDinner.filter((item, i) => i !== index);
                });
                break;
            case 'snacks':
                setSnacks((prevSnacks) => {
                    return prevSnacks.filter((item, i) => i !== index);
                });
                break;
            case 'supper':
                setSupper((prevSupper) => {
                    return prevSupper.filter((item, i) => i !== index);
                });
            default:
                break;
        }
    };

    const onClick = (item, meal) => {
        saveMeal(meal, selectedDate, item)
        // setSelectedItem(item);
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
            case 'snacks':
                setSnacks(prevItems => [...prevItems, item]);
                break;
            case 'supper':
                setSupper(prevItems => [...prevItems, item]);
                break;
            default:
                console.log('Invalid meal');
        }
    }

    //add food diary osa loppuu

    // CALENDAR:

    const openCalendar = () => {
        setOpen(!open)
    }
    const handleChange = (propDate) => {
        const [year, month, date] = propDate.split("/")
        setSelectedDate(new Date(year, month - 1, date))
        setOpen(!open)
    }
    const nextDay = () => {
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24
        const newDate = new Date(selectedDate.getTime() + oneDayInMilliseconds)
        setSelectedDate(newDate)
    }
    const previousDay = () => {
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24
        setSelectedDate(new Date(selectedDate.getTime() - oneDayInMilliseconds))
    }

    return (
        <ScrollView style={styles.background} keyboardShouldPersistTaps='handled'>
            <View style={styles.pressables}>
                <TouchableOpacity onPress={previousDay} style={styles.pressable}>
                    <MaterialCommunityIcons name="chevron-double-left" style={styles.boldText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openCalendar} style={styles.pressable}>
                    <Text style={styles.boldText}>{getFormatedDate(selectedDate, "DD.MM.YYYY")} <MaterialCommunityIcons name="chevron-down" style={styles.boldText} /></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextDay} style={styles.pressable}>
                    <MaterialCommunityIcons name="chevron-double-right" style={styles.boldText} />
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" transparent={true} visible={open}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode="calendar"
                            selected={getFormatedDate(selectedDate, "DD.MM.YYYY")}
                            onDateChange={handleChange}
                        />
                        <Pressable onPress={openCalendar} style={styles.pressable}>
                            <Text>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.title3}>Total calories of the day: {totalCalories} kCal</Text>
            </View>


            <Card style={styles.mealCard}>
                <List.Accordion
                    title={"Breakfast" + " " + breakfastCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={breakfastIconColor} />}
                    expanded={breakfastExpanded}
                    onPress={() => {
                        const newExpandedState = !breakfastExpanded;
                        setBreakfastExpanded(newExpandedState);
                        setBreakfastIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="breakfast" />


                    {breakfast.map((item, index) => (
                        <List.Accordion title={item.name + ' (' + item.calories + ' kcal)'} key={index} left={props => <List.Icon {...props} icon="check" />} style={styles.cardBackground} theme={{ colors: { primary: colors.primary } }}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Name: {item.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Serving: {item.serving_size_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Calories: {item.calories} kcal</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Protein: {item.protein_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Carbs: {item.carbohydrates_total_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fat: {item.fat_total_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Sugar: {item.sugar_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fiber: {item.fiber_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Pressable style={styles.button2} title="Delete" onPress={() => deleteFoodItem('breakfast', index)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={20} />
                                    </Pressable>
                                </DataTable.Row>
                            </DataTable>

                        </List.Accordion>
                    ))}

                </List.Accordion>
            </Card>


            <Card style={styles.mealCard}>
                <List.Accordion
                    title={"Lunch" + " " + lunchCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={lunchIconColor} />}
                    expanded={lunchExpanded}
                    onPress={() => {
                        const newExpandedState = !lunchExpanded;
                        setLunchExpanded(newExpandedState);
                        setLunchIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="lunch" />

                    {lunch.map((item, index) => (
                        <List.Accordion title={item.name + ' (' + item.calories + ' kcal)'} key={index} left={props => <List.Icon {...props} icon="check" />} style={styles.cardBackground} theme={{ colors: { primary: colors.primary } }}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Name: {item.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Serving: {item.serving_size_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Calories: {item.calories} kcal</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Protein: {item.protein_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Carbs: {item.carbohydrates_total_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fat: {item.fat_total_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Sugar: {item.sugar_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fiber: {item.fiber_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Pressable style={styles.button2} title="Delete" onPress={() => deleteFoodItem('lunch', index)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={20} />
                                    </Pressable>
                                </DataTable.Row>
                            </DataTable>

                        </List.Accordion>
                    ))}
                </List.Accordion>
            </Card >


            <Card style={styles.mealCard}>
                <List.Accordion
                    title={"Dinner" + " " + dinnerCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={dinnerIconColor} />}
                    expanded={dinnerExpanded}
                    onPress={() => {
                        const newExpandedState = !dinnerExpanded;
                        setDinnerExpanded(newExpandedState);
                        setDinnerIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="dinner" />

                    {dinner.map((item, index) => (
                        <List.Accordion title={item.name + ' (' + item.calories + ' kcal)'} key={index} left={props => <List.Icon {...props} icon="check" />} style={styles.cardBackground} theme={{ colors: { primary: colors.primary } }}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Name: {item.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Serving: {item.serving_size_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Calories: {item.calories} kcal</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Protein: {item.protein_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Carbs: {item.carbohydrates_total_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fat: {item.fat_total_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Sugar: {item.sugar_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fiber: {item.fiber_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Pressable style={styles.button2} title="Delete" onPress={() => deleteFoodItem('dinner', index)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={20} />
                                    </Pressable>
                                </DataTable.Row>
                            </DataTable>

                        </List.Accordion>
                    ))}
                </List.Accordion >
            </Card >

            <Card style={styles.mealCard}>
                <List.Accordion
                    title={"Supper" + " " + supperCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={supperIconColor} />}
                    expanded={supperExpanded}
                    onPress={() => {
                        const newExpandedState = !supperExpanded;
                        setSupperExpanded(newExpandedState);
                        setSupperIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="supper" />

                    {supper.map((item, index) => (
                        <List.Accordion title={item.name + ' (' + item.calories + ' kcal)'} key={index} left={props => <List.Icon {...props} icon="check" />} style={styles.cardBackground} theme={{ colors: { primary: colors.primary } }}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Name: {item.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Serving: {item.serving_size_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Calories: {item.calories} kcal</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Protein: {item.protein_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Carbs: {item.carbohydrates_total_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fat: {item.fat_total_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Sugar: {item.sugar_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fiber: {item.fiber_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Pressable style={styles.button2} title="Delete" onPress={() => deleteFoodItem('supper', index)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={20} />
                                    </Pressable>
                                </DataTable.Row>
                            </DataTable>

                        </List.Accordion>
                    ))}
                </List.Accordion>
            </Card>

            <Card style={styles.mealCard}>
                <List.Accordion
                    title={"Snacks" + " " + snacksCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={snacksIconColor} />}
                    expanded={snacksExpanded}
                    onPress={() => {
                        const newExpandedState = !snacksExpanded;
                        setSnacksExpanded(newExpandedState);
                        setSnacksIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="snacks" />

                    {snacks.map((item, index) => (
                        <List.Accordion title={item.name + ' (' + item.calories + ' kcal)'} key={index} left={props => <List.Icon {...props} icon="check" />} style={styles.cardBackground} theme={{ colors: { primary: colors.primary } }}>
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Name: {item.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Serving: {item.serving_size_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Calories: {item.calories} kcal</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Protein: {item.protein_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Carbs: {item.carbohydrates_total_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fat: {item.fat_total_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell><Text>Sugar: {item.sugar_g} g</Text></DataTable.Cell>
                                    <DataTable.Cell><Text>Fiber: {item.fiber_g} g</Text></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <Pressable style={styles.button2} title="Delete" onPress={() => deleteFoodItem('snacks', index)}>
                                        <MaterialCommunityIcons name="trash-can-outline" size={20} />
                                    </Pressable>
                                </DataTable.Row>
                            </DataTable>

                        </List.Accordion>
                    ))}
                </List.Accordion>
            </Card>
        </ScrollView >
    )
}