import { Text, View, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";




const AddCalories = ({navigation}) => {

    const [calories, setCalories] = useState()

    const dailyCalories = async (calories) => {
        try {
          await AsyncStorage.setItem('calories', calories);
          navigation.navigate('Home')
        } catch (e) {
            console.log(e)
        }
      };

    return (
        <View>
            <Text>Insert your daily energy goal here (kCal)</Text>
            <TextInput onChangeText={setCalories}></TextInput>
            <Pressable onPress={() => dailyCalories(calories)}><Text>Ok</Text></Pressable>
        </View>

    )
}

export default AddCalories;