import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Values = ({ tipPercentage, inputValue, split, splitValue }) => {
  let tip = '0.00';
  let total = '0.00';
  let perPerson = '0.00';

  if (inputValue){
    tip = parseFloat(inputValue) * tipPercentage;
    total = parseFloat(inputValue) + tip;
    tip = (Math.round(tip * 100) / 100).toFixed(2);
    total = (Math.round(total * 100) / 100).toFixed(2);
    if (split){
      perPerson = (total / splitValue).toFixed(2);
    }
  }

  return(
    <View style={styles.values}>
      <Text style={styles.label}>Tip Amount</Text>
      <Text style={styles.tip}>${tip}</Text>

      <Text style={styles.label}>Total Bill</Text>
      <Text style={styles.total}>${total}</Text>
      {split && <Text>Each: ${perPerson}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  values: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#484848',
    width: '100%',
  },
  label: {
    color: '#FFF'
  },
  tip: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFF'
  },
  total: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF'
  }
});

export default Values;