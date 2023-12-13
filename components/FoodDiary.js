import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Button, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"
import { Link } from "@react-navigation/native";


// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!

export default FoodDiary = () => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
   // Add food diary osa
    const [breakfastExpanded, setBreakfastExpanded] = useState(false);
    const [lunchExpanded, setLunchExpanded] = useState(false);
    const [dinnerExpanded, setDinnerExpanded] = useState(false);
    const [snacksExpanded, setSnacksExpanded] = useState(false);

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [breakfastIconColor, setBreakfastIconColor] = useState('green');
    const [lunchIconColor, setLunchIconColor] = useState('green');
    const [dinnerIconColor, setDinnerIconColor] = useState('green');
    const [snacksIconColor, setSnacksIconColor] = useState('green');

   
    const handlePress = () => {
        setExpanded(!expanded);
    };
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
            <DataTable>
                <List.Accordion
                    title="Breakfast"
                    left={(props) => props ? <List.Icon {...props} icon="food" color={breakfastIconColor} /> : null}
                    expanded={breakfastExpanded}
                    onPress={() => {
                        const newExpandedState = !breakfastExpanded;
                        setBreakfastExpanded(newExpandedState);
                        setBreakfastIconColor(newExpandedState ? 'green' : '#F49379');
                    }} style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}
                >
                    <AddFood setBreakfast={setBreakfast} deleteItem={deleteFoodItem} />
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
                            <Button title="Delete" onPress={() =>deleteFoodItem('breakfast', index)} />
                        </View>
                    ))}
                </View>
                <List.Accordion
                    title="Lunch"
                    left={(props) => <List.Icon {...props} icon="food" color={lunchIconColor} />}
                    expanded={lunchExpanded}
                    onPress={() => {
                        const newExpandedState = !lunchExpanded;
                        setLunchExpanded(newExpandedState);
                        setLunchIconColor(newExpandedState ? 'green' : '#F49379');
                    }}
                    style={{ borderRadius: 20, borderColor: '#d8c5bf', borderWidth: 1, paddingBottom: 10 }}
                >
                    <AddFood setLunch={setLunch} />
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
                    <AddFood setDinner={setDinner} />
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
                    <AddFood setSnacks={setSnacks} />
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
                        <Button title="Delete" onPress={() => deleteFoodItem( 'snacks', index)} />
                    </View>
                ))}
            </DataTable>
        </ScrollView>
    )
}
