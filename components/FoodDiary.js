import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Button, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
//import PieChart from 'react-native-pie-chart'
import { PieChart } from "react-native-gifted-charts";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"
import { Link } from "@react-navigation/native";
import { colors } from '../styles/colors'

// HOXHOX TÄMÄ SIVU LAURALLA TYÖN ALLA !!

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

    const [breakfastIconColor, setBreakfastIconColor] = useState(colors.secondary);
    const [lunchIconColor, setLunchIconColor] = useState(colors.secondary);
    const [dinnerIconColor, setDinnerIconColor] = useState(colors.secondary);
    const [snacksIconColor, setSnacksIconColor] = useState(colors.secondary);


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

    // PIE CHART:

    const pieData = [
        { text: 'Protein  ', value: 47, color: '#b0f2b4'},
        { text: 'Carbs', value: 40, color: '#baf2e9'},
        { text: 'Fat', value: 16, color: '#bad7f2'},
        { text: 'Fiber', value: 30, color: '#f2bac9'},
        { text: 'Sugar', value: 30, color: '#f2e2ba'},
    ];

    const centerLabel = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: colors.secondary, fontWeight: 'bold' }}>1756</Text>
                <Text style={{ fontSize: 14, color: colors.secondary, fontWeight: 'bold' }}>kCal</Text>
            </View>
        )
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
                <Text style={styles.title3}>Total calories of the day: {totalCalories}</Text>
            </View>

            <Card style={styles.mealCard}>

                <List.Accordion
                    title={"Breakfast" + " " + breakfastCalories + " kCal"}
                    left={props => <List.Icon {...props} icon="food" color={breakfastIconColor} />}
                    expanded={breakfastExpanded}
                    onPress={() => {
                        const newExpandedState = !breakfastExpanded;
                        setBreakfastExpanded(newExpandedState);
                        //setBreakfastIconColor(newExpandedState ? colors.primary : colors.secondary);
                    }}
                    titleStyle={styles.text}
                    style={styles.cardBackground}
                    theme={{ colors: { primary: colors.primary } }}
                >
                    <AddFood onClick={onClick} meal="breakfast" />


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
                </List.Accordion>
            </Card>


            <Card style={styles.mealCard}>
                <View>
                    <List.Accordion
                        title={"Lunch" + " " + lunchCalories + " kCal"}
                        left={(props) => <List.Icon {...props} icon="food" color={lunchIconColor} />}
                        expanded={lunchExpanded}
                        onPress={() => {
                            const newExpandedState = !lunchExpanded;
                            setLunchExpanded(newExpandedState);
                            //setBreakfastIconColor(newExpandedState ? colors.primary : colors.secondary);
                        }}
                        titleStyle={styles.text}
                        style={styles.cardBackground}
                        theme={{ colors: { primary: colors.primary } }}
                    >
                        <AddFood onClick={onClick} meal="lunch" />
                    </List.Accordion>
                </View>

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
            </Card>

            <Card style={styles.mealCard}>
                <View>
                    <List.Accordion
                        title={"Dinner" + " " + dinnerCalories + " kCal"}
                        left={(props) => <List.Icon {...props} icon="food" color={dinnerIconColor} />}
                        expanded={dinnerExpanded}
                        onPress={() => {
                            const newExpandedState = !dinnerExpanded;
                            setDinnerExpanded(newExpandedState);
                            //setBreakfastIconColor(newExpandedState ? colors.primary : colors.secondary);
                        }}
                        titleStyle={styles.text}
                        style={styles.cardBackground}
                        theme={{ colors: { primary: colors.primary } }}
                    >
                        <AddFood setDinner={setDinner} />
                    </List.Accordion>
                </View>

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
            </Card>

            <Card style={styles.mealCard}>
                <View>
                    <List.Accordion
                        title="Snacks"
                        left={(props) => <List.Icon {...props} icon="food" color={snacksIconColor} />}
                        expanded={snacksExpanded}
                        onPress={() => {
                            const newExpandedState = !snacksExpanded;
                            setSnacksExpanded(newExpandedState);
                            //setBreakfastIconColor(newExpandedState ? colors.primary : colors.secondary);
                        }}
                        titleStyle={styles.text}
                        style={styles.cardBackground}
                        theme={{ colors: { primary: colors.primary } }}
                    >
                        <AddFood setSnacks={setSnacks} />
                    </List.Accordion>
                </View>

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
            </Card>

            <Card style={styles.cardStyle}>
                <Card.Content style={styles.card}>
                    <PieChart
                        data={pieData}
                        donut={true}
                        radius={120}
                        innerRadius={50}
                        showText={true}
                        labelsPosition='outward'
                        centerLabelComponent={centerLabel}
                        textColor="black"

                    />
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

/* 
                    <PieChart
                        widthAndHeight={200}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.45}
                        coverFill={colors.primary}
                    />
*/