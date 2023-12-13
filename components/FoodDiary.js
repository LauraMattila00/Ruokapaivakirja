import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Pressable, Modal, StyleSheet } from "react-native"
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
    const [expanded, setExpanded] = useState(true);
    const [selectedItem, setSelectedItem] = useState([])


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



    const openCalendar = () => {
        setOpen(!open)
    }
    const handlePress = () => {
        setExpanded(!expanded);
    };

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
                    expanded={expanded}
                    onPress={handlePress}
                >
                    <AddFood onClick={onClick} meal="breakfast" />
                </List.Accordion>
                {breakfast.map((item, index) => (
                    <Text key={index}>{item.name}  - {item.calories} calories</Text>
                ))}

                <List.Accordion
                    title={"Lunch" + " " + lunchCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" />}
                    expanded={expanded}
                    onPress={handlePress}
                >
                    <AddFood onClick={onClick} meal="lunch" />
                </List.Accordion>
                {lunch.map((item, index) => (
                    <Text key={index}>{item.name} -  {item.calories} calories</Text>
                ))}

                <DataTable.Header><DataTable.Title>Päivällinen</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Broilerin filee</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <List.Accordion
                            title="Dinner"
                            left={props => <List.Icon {...props} icon="food" />}
                            expanded={expanded}
                            onPress={handlePress}
                        >
                            <AddFood setDinner={setDinner} />
                        </List.Accordion>
                        {dinner.map((item, index) => (
                            <Text key={index}>{item.name}</Text>
                        ))}
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity><MaterialCommunityIcons name="pencil" size={20} /></TouchableOpacity>
                        <TouchableOpacity><MaterialCommunityIcons name="trash-can-outline" size={20} /></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Header><DataTable.Title>Iltapala</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Maitorahka</Text></DataTable.Cell>
                    <DataTable.Cell><Text>200 g</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity><MaterialCommunityIcons name="pencil" size={20} /></TouchableOpacity>
                        <TouchableOpacity><MaterialCommunityIcons name="trash-can-outline" size={20} /></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Header><DataTable.Title>Välipalat / Muut</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Omena</Text></DataTable.Cell>
                    <DataTable.Cell><Text>1 kpl</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity><MaterialCommunityIcons name="pencil" size={20} /></TouchableOpacity>
                        <TouchableOpacity><MaterialCommunityIcons name="trash-can-outline" size={20} /></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </ScrollView>
    )
}
