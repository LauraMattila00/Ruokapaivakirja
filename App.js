import Home from './components/Home.js'
import FoodDiary from './components/FoodDiary.js'
import WeightControl from './components/WeightControl.js'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigator from './components/StackNavigator.js';
import { colors } from './styles/colors.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (<>
    <NavigationContainer>

      <Tab.Navigator screenOptions={() => ({
        tabBarActiveTintColor: colors.secondary,
      })}>
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons name="home" color={colors.secondary} size={size} />
            ),
          }} />
        <Tab.Screen
          name="Food Diary"
          component={FoodDiary}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="playlist-edit" color={colors.secondary} size={size} />
            ),
          }} />
        <Tab.Screen
          name="Weight Control"
          component={WeightControl}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={colors.secondary} size={size} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  </>
  );
}