import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable } from "react-native-paper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";

// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!

export default FoodDiary = () => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)

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
        setSelectedDate(newDate.toLocaleDateString())
    }

    const previousDay = () => {
        const oneDayInMilliseconds = 1000 * 60 * 60 * 24
        setSelectedDate(new Date(selectedDate.getTime() - oneDayInMilliseconds))
    }


    return (


        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.pressables}>
                <Pressable onPress={previousDay} style={styles.pressable}>
                    <MaterialCommunityIcons name="arrow-left" style={styles.boldText} />
                </Pressable>
                <Pressable onPress={openCalendar} style={styles.pressable}>
                    <Text style={styles.boldText}>{getFormatedDate(selectedDate, "YYYY/MM/DD")}</Text>
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
                            selected={getFormatedDate(selectedDate, "YYYY/MM/DD")}
                            onDateChange={handleChange}
                        />
                        <Pressable onPress={openCalendar} style={styles.pressable}>
                            <Text>Close</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>

            <DataTable>
                <DataTable.Header><DataTable.Title>Aamiainen</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Kaurapuuro</Text></DataTable.Cell>
                    <DataTable.Cell><Text>50 g</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity><MaterialCommunityIcons name="pencil" size={20} /></TouchableOpacity>
                        <TouchableOpacity><MaterialCommunityIcons name="trash-can-outline" size={20} /></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Header><DataTable.Title>Lounas</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Lohifilee</Text></DataTable.Cell>
                    <DataTable.Cell><Text>100 g</Text></DataTable.Cell>
                    <DataTable.Cell>
                        <TouchableOpacity><MaterialCommunityIcons name="pencil" size={20} /></TouchableOpacity>
                        <TouchableOpacity><MaterialCommunityIcons name="trash-can-outline" size={20} /></TouchableOpacity>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Header><DataTable.Title>Päivällinen</DataTable.Title></DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell><Text>Broilerin filee</Text></DataTable.Cell>
                    <DataTable.Cell><Text>150 g</Text></DataTable.Cell>
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
            <View>
                <AddFood />
            </View>
        </ScrollView>


    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    pressable: {
        padding: 15,
        backgroundColor: 'mistyrose',
        borderRadius: 30,
        margin: 10,
        justifyContent: 'center'
    },
    pressables: {
        flexDirection: 'row'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
