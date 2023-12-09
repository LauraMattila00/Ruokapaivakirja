import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native"
import React, { useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
//import { NavigationContainerProvider, useNavigationContainerRef } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';


// Tämä sivu Tuomaksella työn alla!

// Github lisäys sekä Branch.
// Tarvittavat importit ja lataus.
// Button väri: color='#ffdab9'
// Sivun Design muutoksia?
// Linkitys (Home.js) WeightControl?


const WeightControl = () => {

    const [weights, setWeights] = useState([]);
    const [weightInput, setWeightInput] = useState('');

    const handleAddWeight = () => {
        if (weightInput !== '') {
          const currentDate = new Date().toLocaleDateString();
          const newEntry = { weight: parseFloat(weightInput), date: currentDate };
          setWeights([...weights, newEntry]);
          setWeightInput('');
        }

};

const handleClearChart = () => {
  setWeights([]); // For clearing the chart data.
};

const chartData = {
  labels: weights.map((entry) => entry.date),
  datasets: [
    {
      data: weights.map((entry) => entry.weight),
    },
  ],
};

// Colors?
const chartConfig = {
  backgroundColor: '#ffdab9',
  backgroundGradientFrom: '#ffdab9',
  backgroundGradientTo: '#f8d2d2',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
  borderRadius: 5,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '4',
    stroke: '#ffa726',
  },
};

return (
          
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add Weight"
                  keyboardType="numeric"
                  value={weightInput}
                  onChangeText={(text) => setWeightInput(text)}
                />
                <Button title="Save" onPress={handleAddWeight} color='#ffdab9' />
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Clear Results" onPress={handleClearChart} color='#ffdab9' />
              </View>
              
              {weights.length > 0 ? (
              <View style= {styles.chartContainer}>
              <LineChart
                data={chartData}
                width={370}
                height={270}
                chartConfig={chartConfig}
              />
              </View>
              ) : (
                <Text style={styles.noDataText}>NO SAVED DATA.</Text>
              )}  

              <Text style={styles.header}>Weight History</Text>

              <FlatList
                data={weights}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text>{item.date}</Text>
                    <Text>{item.weight} kg</Text>
                  </View>
                )}
              />
            </View>
          
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    
  },

  header: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    color: 'rgb(245, 104, 10)'
  },

  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
  },

  buttonContainer: {
    marginBottom: 10,

  },

  chartContainer: {
    borderRadius: 20,
    overflow: 'hidden'

  },

  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(245, 104, 10)'
  }

})

export default WeightControl;