import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Dimensions } from "react-native"
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tämä sivu Tuomaksella työn alla!
// slice(-4).map (Näyttää vain 4 tulosta chartissa.)

const WeightControl = () => {

    const screenWidth = Dimensions.get("window").width;  
    const [weights, setWeights] = useState([]);
    const [weightInput, setWeightInput] = useState('');

    useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedWeights = await AsyncStorage.getItem('weights');
        if (storedWeights !== null) {
          setWeights(JSON.parse(storedWeights));
        }

    } catch (error) {
      console.error('Error retrieving data from AsyncStorage', error);
    }
    }

    retrieveData();
  }, []);

    const handleAddWeight = async () => {
        if (weightInput !== '') {
          const currentDate = new Date().toLocaleDateString();
          const newEntry = { weight: parseFloat(weightInput), date: currentDate };
          const updatedWeights = [...weights, newEntry];
          setWeights(updatedWeights);
          setWeightInput('');

          // Saving to AsyncStorage
          try {
            await AsyncStorage.setItem('weights', JSON.stringify(updatedWeights));
            console.log('Data saved succesfully');
          } catch (error) {
            console.error('Error saving data: ', error);
          }  
          
        }

};

const handleClearChart = () => {
  setWeights([]); // For clearing the chart data.

  // Clear AsyncStorage.
  AsyncStorage.removeItem('weights');
};

const handleDeleteWeight = async (index) => {
  const updatedWeights = [...weights];
  updatedWeights.splice(index, 1);
  setWeights(updatedWeights);

  try {
    await AsyncStorage.setItem('weights', JSON.stringify(updatedWeights));
    console.log('Data removed succesfully');
  } catch  (error) {
    console.error('Error removing data: ', error);
  }  
};

const chartData = {
  labels: weights.map((entry) => entry.date),
  datasets: [
    {
      data: weights.map((entry) => entry.weight),
    },
  ],
};

const chartConfig = {
  backgroundColor: 'rgb(255, 255, 255)',
  backgroundGradientFrom: 'rgb(244, 147, 121)',
  backgroundGradientTo: 'rgb(245, 148, 44)',
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
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={weightInput}
                  onChangeText={(text) => setWeightInput(text)}
                />
                <View style={styles.buttonContainer}>
                 <TouchableOpacity onPress={handleAddWeight} style={styles.touchableOpacity}>
                  <Text style={styles.buttonText}>SAVE</Text>
                 </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={handleClearChart} style={styles.touchableOpacity}>
                <Text style={styles.buttonText}>Clear History</Text>
               </TouchableOpacity>
              </View>
              
              {weights.length > 0 ? (
              <View style= {styles.chartContainer}>
              <LineChart
                data={chartData}
                width={screenWidth}
                height={256}
                verticalLabelRotation={0}
                chartConfig={chartConfig}
              />
              </View>
              ) : (
                <Card style={styles.noDataCard}>
                  <Card.Content>
                    <Paragraph style={styles.noDataText}>NO SAVED DATA</Paragraph>
                  </Card.Content>
                </Card>
              )}  

              <View>
                <Card style={styles.card}>
                  <Card.Content>
                    <Title style={styles.header}>Weight History</Title>
                  </Card.Content>
                </Card>
              </View>

              <FlatList
                data={weights}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.item}>
                    <Text>{item.date}</Text>
                    <Text>{item.weight} kg</Text>
                    <TouchableOpacity onPress={() => handleDeleteWeight(index)}>
                      <Text style={styles.deleteButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(242, 243, 202)',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    //color: 'rgb(245, 148, 44)'
    
  },

  noDataCard: {
    margin: 4,
    padding: 10,
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'rgb(255, 255, 255)',

  },

  card: {
    flexDirection: 'row',
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: 'rgb(255, 255, 255)',
  },

  header: {
    padding: 10,
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    color: 'rgb(245, 148, 44)'
  },
  
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
  },

  buttonContainer: {
    marginBottom: 0,
    backgroundColor: 'rgb(245, 148, 44)',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1
  },

  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },

  chartContainer: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 5,
    marginTop: 5,
  },

  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgb(245, 148, 44)'
  }

})

export default WeightControl;