import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"

import { styles } from "../styles/styles"
import { Link } from "@react-navigation/native";

// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!

export default FoodDiary = () => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(true);
    const [selectedItem, setSelectedItem] = useState([])


    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);



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


    return (

        <ScrollView contentContainerStyle={styles.containerFoodDiary}>
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
                    <AddFood />
                </View>
        
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text>Aamiainen</Text></DataTable.Title></DataTable.Header>

                <List.Accordion
                    title="Add Food"
                    left={props => <List.Icon {...props} icon="food" />}
                    expanded={expanded}
                    onPress={handlePress}
                >
                    <AddFood setBreakfast={setBreakfast} />
                </List.Accordion>
                {breakfast.map((item, index) => (
                    <Text key={index}>{item.name}  - {item.calories} calories</Text>
                ))}



                <DataTable.Header><DataTable.Title>Lounas</DataTable.Title></DataTable.Header>

                <List.Accordion
                    title="Add Food"
                    left={props => <List.Icon {...props} icon="food" />}
                    expanded={expanded}
                    onPress={handlePress}
                >
                    <AddFood setLunch={setLunch} />
                </List.Accordion>
                {lunch.map((item, index) => (
                    <Text key={index}>{item.name} -  {item.calories} calories</Text>
                ))}

                <DataTable.Header><DataTable.Title>Päivällinen</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Broilerin filee</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <List.Accordion
                            title="Add Food"
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
    )}
