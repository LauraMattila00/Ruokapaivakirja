import Home from './components/Home.js'
import FoodDiary from './components/FoodDiary.js'
import WeightControl from './components/WeightControl.js'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigator from './components/StackNavigator.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (<>
    <NavigationContainer>
    
      <Tab.Navigator>
        <Tab.Screen 
          name="Etusivu" 
          component={StackNavigator}
          options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}  />
        <Tab.Screen 
          name="Ruokapäiväkirja" 
          component={FoodDiary} 
          options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="playlist-edit" color={color} size={size} />
          ),
        }} />
        <Tab.Screen 
          name="Painonhallinta" 
          component={WeightControl}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}