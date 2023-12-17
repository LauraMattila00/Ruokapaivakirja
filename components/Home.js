import { View, Text, Image, ScrollView } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from "../styles/styles"
import { Card } from "react-native-paper"
import { Link, NavigationContainer, useLinkTo, useNavigation } from "@react-navigation/native"
import AddCalories from './AddCalories.js';
import WeightControl from "./WeightControl.js"
import { colors } from "../styles/colors.js"
import { Svg } from 'react-native-svg';
import Logo from '../assets/logo1.svg';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"

const Home = ({ navigation }) => {
    const [dailyCalories, setDailyCalories] = useState()

    useEffect(() => {
        navigation.addListener('focus', () => {
            getCalories()
        })
    })

    const getCalories = async () => {
        try {
            const calories = await AsyncStorage.getItem('calories');
            if (calories !== null) {
                setDailyCalories(calories)
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <ScrollView style={styles.background}>
            <View style={{ height: 300 }}>
                <Logo style={{height: 300}} />
            </View>
            <Text style={styles.title} >Today</Text>
            <Card style={styles.cardStyle} onPress={() => navigation.navigate('AddCalories')}>
                <Card.Title titleStyle={styles.title3} title="Calories" />
                <Card.Content style={styles.card}>
                    <View style={styles.contentLeft}>
                        <Text style={styles.bigText}>{dailyCalories}</Text>
                        <Text>Remaining</Text>
                    </View>
                    <View style={{ flexGrow: 0.5 }}>
                        <View style={styles.column}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name="flag-checkered" size={20}
                                    color={colors.secondary} />
                            </View>
                            <View>
                                <Text>Base goal</Text>
                                <Text style={styles.text}>{dailyCalories}</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={20}
                                    color={colors.secondary} />
                            </View>
                            <View>
                                <Text>Food</Text>
                                <Text style={styles.text}>0</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name="walk" size={20}
                                    color={colors.secondary} />
                            </View>
                            <View>
                                <Text>Exercise</Text>
                                <Text style={styles.text}>0</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Card style={styles.cardStyle}>
                <Card.Title titleStyle={styles.title2} title="Exercise" />
                <Card.Content style={styles.card}>
                    <View style={styles.column}>
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="walk" size={20}
                                color={colors.secondary} />
                        </View>
                        <View style={{ paddingTop: 4 }}>
                            <Text>0 cal</Text>
                        </View>
                    </View>
                    <View style={{ flexGrow: 0.5 }}>
                        <View style={styles.column}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name="clock" size={20}
                                    color={colors.secondary} />
                            </View>
                            <View style={{ paddingTop: 4 }}>
                                <Text>0:00 hr</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Card style={styles.cardStyle}>
                <Link to={{ screen: 'WeightControl' }}>
                    <Card.Title titleStyle={styles.title2} title="Weight" />
                    <Card.Content style={styles.card}>

                    </Card.Content>
                </Link>
            </Card>
        </ScrollView >
    )
}

export default Home;