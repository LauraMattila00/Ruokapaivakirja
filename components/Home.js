import { View, Text, Image } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from "../styles/styles"
import { Card } from "react-native-paper"
import { Link, NavigationContainer } from "@react-navigation/native"
import AddCalories from './AddCalories.js';
import WeightControl from "./WeightControl.js"

const Home = () => {
    return (
        <View>
            <Image source={require('../assets/Ruokapaivislogo.png')} />
            <Text style={styles.title} >Today</Text>
            <Card style={{ margin: 8 }}>
                <Link to={{ screen: 'AddCalories' }}>
                    <View style={styles.card}>
                        <View>
                            <Card.Title titleStyle={styles.title3} title="Calories" />
                        </View>
                        <Card.Content style={styles.card}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.bigText}>1800</Text>
                                <Text>Remaining</Text>
                            </View>

                            <View style={{ flexGrow: 0.5 }}>
                                <View style={styles.column}>
                                    <View style={styles.icon}>
                                        <MaterialCommunityIcons name="flag-checkered" size={20} />
                                    </View>
                                    <View>
                                        <Text>Base goal</Text>
                                        <Text style={styles.text}>1800</Text>
                                    </View>
                                </View>
                                <View style={styles.column}>
                                    <View style={styles.icon}>
                                        <MaterialCommunityIcons name="silverware-fork-knife" size={20} />
                                    </View>
                                    <View>
                                        <Text>Food</Text>
                                        <Text style={styles.text}>0</Text>
                                    </View>
                                </View>
                                <View style={styles.column}>
                                    <View style={styles.icon}>
                                        <MaterialCommunityIcons name="walk" size={20} />
                                    </View>
                                    <View>
                                        <Text>Exercise</Text>
                                        <Text style={styles.text}>0</Text>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </View>

                </Link>

            </Card>
            <Card style={{ margin: 8 }}>
                <Card.Title titleStyle={styles.title2} title="Exercise" />
                <Card.Content style={styles.card}>
                    <View style={styles.column}>
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="walk" size={20} />
                        </View>
                        <View>
                            <Text>0 cal</Text>
                        </View>
                    </View>
                    <View style={{ flexGrow: 0.5 }}>
                        <View style={styles.column}>
                            <View style={styles.icon}>
                                <MaterialCommunityIcons name="clock" size={20} />
                            </View>
                            <View>
                                <Text>0:00 hr</Text>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
            <Card style={{ margin: 8 }}>
                <Link to={{ screen: 'WeightControl' }}>
                    <Card.Title titleStyle={styles.title2} title="Weight" />
                    <Card.Content style={styles.card}>

                    </Card.Content>
                </Link>
            </Card>
        </View >
    )
}

export default Home;