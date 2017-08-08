import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      inputValue: ''
    }
  }

  render() {
    let tip = '0.00';
    if (this.state.inputValue){
      tip = parseFloat(this.state.inputValue) * 0.2;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
    }
    return (
      <View style={styles.container}>
        <Text>
          {tip}
        </Text>
        <TextInput
          value={this.state.inputValue}
          keyboardType='numeric'
          style={styles.input}
          placeholder='0.00'
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({inputValue: text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
  }
});
