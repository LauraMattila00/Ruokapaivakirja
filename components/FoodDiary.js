import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Button, Pressable, Modal, StyleSheet } from "react-native"
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { DataTable, List, Card } from "react-native-paper"
import { PieChart } from "react-native-gifted-charts";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddFood from "./AddFood";
import { styles } from "../styles/styles"
import { Link } from "@react-navigation/native";
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
        total + currentValue.supper, 0));
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
            //await loadMeal('supper', selectedDate).then(items => setSupper(items.map(item => item.food)))
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

    // PIE CHART:

    const pieData = [
        { text: 'Protein  ', value: 47, color: '#b0f2b4' },
        { text: 'Carbs', value: 40, color: '#baf2e9' },
        { text: 'Fat', value: 16, color: '#bad7f2' },
        { text: 'Fiber', value: 30, color: '#f2bac9' },
        { text: 'Sugar', value: 30, color: '#f2e2ba' },
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

                    <View style={styles.savedContainer}>
                        {lunch.map((item, index) => (
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
                                <Button title="Delete" onPress={() => deleteFoodItem('lunch', index)} />
                            </View>
                        ))}
                    </View>
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

                    <View style={styles.savedContainer}>
                        {dinner.map((item, index) => (
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
                                <Button title="Delete" onPress={() => deleteFoodItem('dinner', index)} />
                            </View>
                        ))}
                    </View>
                </List.Accordion >
            </Card >


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

                    <View style={styles.savedContainer}>
                        {snacks.map((item, index) => (
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
                                <Button title="Delete" onPress={() => deleteFoodItem('snacks', index)} />
                            </View>

                        ))}
                    </View>
                </List.Accordion>
            </Card>


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
                                <Button title="Delete" onPress={() => deleteFoodItem('supper', index)} />
                            </View>
                        ))}
                    </View>
                </List.Accordion>
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
        </ScrollView >
    )
}