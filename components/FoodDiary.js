import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Button, Pressable, Modal, StyleSheet, TextInput } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"
import { Link } from "@react-navigation/native";


// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!

export default () => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    // Add food diary osa
    const [breakfastExpanded, setBreakfastExpanded] = useState(false);
    const [lunchExpanded, setLunchExpanded] = useState(false);
    const [dinnerExpanded, setDinnerExpanded] = useState(false);
    const [snacksExpanded, setSnacksExpanded] = useState(false);
    const [supperExpanded, setSupperExpanded] = useState(false);

    const [breakfast, setBreakfast] = useState([]);
    const breakfastCalories = breakfast.reduce((total, currentValue) =>
        total + currentValue.calories, 0).toFixed(0);
    const [lunch, setLunch] = useState([]);
    const lunchCalories = lunch.reduce((total, currentValue) =>
        total + currentValue.calories, 0);
    const [dinner, setDinner] = useState([]);
    const dinnerCalories = dinner.reduce((total, currentValue) =>
        total + currentValue.calories, 0)
    /* const supperCalories = supper.reduce((total, currentValue) =>
        total + currentValue.supper, 0);
    const snacksCalories = snacks.reduce((total, currentValue) =>
        total + currentValue.snacks, 0); */

    const totalCalories = breakfastCalories + lunchCalories +
        dinnerCalories;
    // + supperCalories + snacksCalories;


    const [snacks, setSnacks] = useState([]);
    const [supper, setSupper] = useState([]);

    const [breakfastIconColor, setBreakfastIconColor] = useState('green');
    const [lunchIconColor, setLunchIconColor] = useState('green');
    const [dinnerIconColor, setDinnerIconColor] = useState('green');
    const [snacksIconColor, setSnacksIconColor] = useState('green');
    const [supperIconColor, setSupperIconColor] = useState('green');


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
    //add food diary osa loppuu

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

    const onClick = (item, meal) => {
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

    console.log(lunch)


    return (
        <ScrollView >
            <View style={styles.pressables}>
                <Pressable onPress={previousDay} style={styles.pressable}>
                    <MaterialCommunityIcons name="arrow-left" style={styles.boldText} />
                </Pressable>
                <Pressable onPress={openCalendar} style={styles.pressable}>
                    <Text style={styles.boldText}>{getFormatedDate(selectedDate, "DD.MM.YYYY")}</Text>
                </Pressable>
                <Pressable onPress={nextDay} style={styles.pressable}>
                    <MaterialCommunityIcons name="arrow-right" style={styles.boldText} />
                </Pressable>
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

            <View>
                <Text style={styles.title3}>Total calories of the day: {totalCalories}</Text>
            </View>


    


            <DataTable>
                <List.Accordion
                    title={"Breakfast" + " " + breakfastCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" />}
                    expanded={breakfastExpanded}
                    onPress={() => {
                        const newExpandedState = !breakfastExpanded;
                        setBreakfastExpanded(newExpandedState);
                        setBreakfastIconColor(newExpandedState ? 'green' : '#F49379');
                    }}
                    style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}
                >
                    <AddFood onClick={onClick} meal="breakfast" />
                </List.Accordion>
                <View style={styles.savedContainer}>
                    {breakfast.map((item, index) => (
                        <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#f8f8f8', borderRadius: 5, fontStyle: 'bold' }}>
                            <Text>Name: {item.name}</Text>
                            <Text>Calories: {item.calories}</Text>
                            <Text>Protein: {item.protein_g}</Text>
                            <Text>Carbs: {item.carbohydrates_total_g}</Text>
                            <Text>Fat: {item.fat_total_g}</Text>
                            <Text>Saturated Fat: {item.fat_saturated_g}</Text>
                            <Text>Fiber: {item.fiber_g}</Text>
                            <Text>Sugar: {item.sugar_g}</Text>
                            <Text>serving:{item.serving_size_g}</Text>
                            <Button title="Delete" onPress={() => deleteFoodItem('breakfast', index)} />
                        </View>
                        
                    ))}
                </View>
                <List.Accordion
                    title={"Lunch" + " " + lunchCalories + " kCal"}
                    left={(props) => <List.Icon {...props} icon="food" color={lunchIconColor} />}
                    expanded={lunchExpanded}
                    onPress={() => {
                        const newExpandedState = !lunchExpanded;
                        setLunchExpanded(newExpandedState);
                        setLunchIconColor(newExpandedState ? 'green' : '#F49379');
                    }}
                    style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}
                >
                    <AddFood onClick={onClick} meal="lunch" />
                </List.Accordion>
                {lunch.map((item, index) => (
                    <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#f8f8f8', borderRadius: 5, fontStyle: 'bold' }}>
                        <Text>Name: {item.name}</Text>
                        <Text>Calories: {item.calories}</Text>
                        <Text>Protein: {item.protein_g}</Text>
                        <Text>Carbs: {item.carbohydrates_total_g}</Text>
                        <Text>Fat: {item.fat_total_g}</Text>
                        <Text>Saturated Fat: {item.fat_saturated_g}</Text>
                        <Text>Sugar: {item.sugar_g}</Text>
                        <Button title="Delete" onPress={() => deleteFoodItem('lunch', index)} />
                    </View>
                ))}
                <List.Accordion
                    title="Dinner"
                    left={(props) => <List.Icon {...props} icon="food" color={dinnerIconColor} />}
                    expanded={dinnerExpanded}
                    onPress={() => {
                        const newExpandedState = !dinnerExpanded;
                        setDinnerExpanded(newExpandedState);
                        setDinnerIconColor(newExpandedState ? 'green' : '#F49379')
                    }}
                    style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}
                >
                    <AddFood onClick={onClick} meal="dinner" />
                </List.Accordion>
                {dinner.map((item, index) => (
                    <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#f8f8f8', borderRadius: 5 }}>
                        <Text>Name: {item.name}</Text>
                        <Text>Calories: {item.calories}</Text>
                        <Text>Protein: {item.protein_g}</Text>
                        <Text>Carbs: {item.carbohydrates_total_g}</Text>
                        <Text>Fat: {item.fat_total_g}</Text>
                        <Text>Saturated Fat: {item.fat_saturated_g}</Text>
                        <Text>Sugar: {item.sugar_g}</Text>

                        <Button title="Delete" onPress={() => deleteFoodItem('dinner', index)} />
                    </View>
                ))}

                <List.Accordion
                    title="Snacks"
                    left={(props) => <List.Icon {...props} icon="food" color={snacksIconColor} />}
                    expanded={snacksExpanded}
                    onPress={() => {
                        const newExpandedState = !snacksExpanded;
                        setSnacksExpanded(newExpandedState);
                        setSnacksIconColor(newExpandedState ? 'green' : '#F49379');
                    }} style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}>
                    <AddFood onClick={onClick} meal="snacks" />
                </List.Accordion>
                {snacks.map((item, index) => (
                    <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#f8f8f8', borderRadius: 5 }}>
                        <Text>Name: {item.name}</Text>
                        <Text>Calories: {item.calories}</Text>
                        <Text>Protein: {item.protein_g}</Text>
                        <Text>Carbs: {item.carbohydrates_total_g}</Text>
                        <Text>Fat: {item.fat_total_g}</Text>
                        <Text>Saturated Fat: {item.fat_saturated_g}</Text>
                        <Text>Sugar: {item.sugar_g}</Text>
                        <Button title="Delete" onPress={() => deleteFoodItem('snacks', index)} />
                    </View>
                ))}
                <List.Accordion
                    title="Supper"
                    left={(props) => <List.Icon {...props} icon="food" color={supperIconColor} />}
                    expanded={supperExpanded}
                    onPress={() => {
                        const newExpandedState = !supperExpanded;
                        setSupperExpanded(newExpandedState);
                        setSupperIconColor(newExpandedState ? 'green' : '#F49379');
                    }} style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}>
                    <AddFood onClick={onClick} meal="supper" />
                </List.Accordion>
                {supper.map((item, index) => (
                    <View key={index} style={{ padding: 10, margin: 10, backgroundColor: '#f8f8f8', borderRadius: 5 }}>
                        <Text>Name: {item.name}</Text>
                        <Text>Calories: {item.calories}</Text>
                        <Text>Protein: {item.protein_g}</Text>
                        <Text>Carbs: {item.carbohydrates_total_g}</Text>
                        <Text>Fat: {item.fat_total_g}</Text>
                        <Text>Saturated Fat: {item.fat_saturated_g}</Text>
                        <Text>Sugar: {item.sugar_g}</Text>
                        <Button title="Delete" onPress={() => deleteFoodItem('supper', index)} />
                    </View>
                ))}
            </DataTable>
        </ScrollView>
    )
}
