import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { Card, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { styles } from '../styles/styles'
import { colors } from '../styles/colors'




const AddCalories = ({ navigation }) => {

    const [calories, setCalories] = useState()

    const dailyCalories = async () => {
        try {
            await AsyncStorage.setItem('calories', calories);
            navigation.navigate('MainPage')
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <ScrollView style={styles.background} keyboardShouldPersistTaps='handled'>
        <Card style={styles.cardStyle}>
            <Card.Content>
                <Text style={styles.title2}>Insert your daily energy goal here (kCal)</Text>
                <View style={styles.row}>
                <TextInput style={styles.textInputStyle2} keyboardType="numeric" onChangeText={setCalories} selectionColor={colors.secondary}></TextInput>
                <Pressable style={styles.button} onPress={() => dailyCalories(calories)}><Text style={styles.buttonText}>OK</Text></Pressable>
                </View>
            </Card.Content>
        </Card>
        </ScrollView>

    )
}

export default AddCalories;