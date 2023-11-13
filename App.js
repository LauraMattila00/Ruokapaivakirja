import Home from './components/Home.js'
import FoodDiary from './components/FoodDiary.js'
import WeightControl from './components/WeightControl.js'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="FoodDiary" component={FoodDiary} />
        <Tab.Screen name="WeightControl" component={WeightControl} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}