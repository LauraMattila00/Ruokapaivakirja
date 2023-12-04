import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";




const AddCalories = () => {
    return (
        <View>
            <Text>Insert your daily energy goal here (kCal)</Text>
            <TextInput></TextInput>
        </View>

    )
}

export default AddCalories;