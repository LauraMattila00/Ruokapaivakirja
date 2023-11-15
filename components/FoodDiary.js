import { useState } from "react";
import { Text, View, TouchableOpacity, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import SimpleLineIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!


const FoodDiary = () => {

    const [selectedDate, setSelectedDate] = useState(getToday())
    const [open, setOpen] = useState(false)

    const openCalendar = () => {
        setOpen(!open)
    }

    const handleChange = (propDate) => {
        setSelectedDate(propDate)
        setOpen(!open)
    }

        return (
            <View style={styles.container}>
                <View style={styles.pressables}>
                    <Pressable style={styles.pressable}>
                    <SimpleLineIcons name="arrow-left" style={styles.boldText} />
                    </Pressable>
                    <Pressable onPress={openCalendar} style={styles.pressable}>
                        <Text style={styles.boldText}>{selectedDate}</Text>
                    </Pressable>
                    <Pressable style={styles.pressable}>
                        <SimpleLineIcons name="arrow-right" style={styles.boldText} />
                    </Pressable>
                </View>
                
                
                <Modal animationType="slide" transparent={true} visible={open}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                            mode="calendar"
                            selected={selectedDate}
                            onDateChange={handleChange}
                            />
                            <Pressable onPress={openCalendar} style={styles.pressable}>
                                <Text>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
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

export default FoodDiary;