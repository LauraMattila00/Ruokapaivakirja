import { View, Text } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from "../styles/styles"
import { Card } from "react-native-paper"


const Home = () => {
    return (
        <View>
            <Text style={styles.title}>Today</Text>
            <Card>
                    <Card.Title titleStyle={styles.title2} title="Calories"/>
                    <Card.Content style={styles.card}>
                        <View style={styles.contentLeft}>
                    <Text>Remaining</Text>
                    </View>
                <View style={{flexGrow: 0.5}}>
                    
                    <Text><MaterialCommunityIcons  name="flag-checkered" style={styles.icon} />Base goal</Text>
                    <Text><MaterialCommunityIcons name="silverware-fork-knife" />Food</Text>
                    <Text><MaterialCommunityIcons name="walk" />Exercise</Text>
                </View>
                </Card.Content>
            </Card>
            <View>
                <Text>Weight</Text>
            </View>
        </View>
    )
}

export default Home;