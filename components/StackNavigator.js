import { createStackNavigator } from '@react-navigation/stack';
import AddCalories from './AddCalories';
import Home from './Home';
import WeightControl from './WeightControl';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="AddCalories" component={AddCalories} />
        <Stack.Screen name="WeightControl" component={WeightControl} />
    </Stack.Navigator>
}

export default StackNavigator;