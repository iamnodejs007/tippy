import Expo from "expo";
import React, { Component } from 'react';
import { TextInput, StyleSheet, View, ScrollView, Slider } from 'react-native';
import { Text, Container, Content } from 'native-base';
import { LinearGradient } from 'expo';

import Head from './ui/Head';

const StyledText = ({style = styles.text, children}) => (
  <Text style={style}>{children}</Text>
)

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      tipPercentage: 0.15,
      isReady: false,
      splitValue: 0
    }
  }

  percentageSlider(sliderValue){
    this.setState({tipPercentage: parseFloat(sliderValue) / 100});
  }

  splitSlider(sliderValue){
    this.setState({splitValue: sliderValue});
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    let tip = '0.00';
    let total = '0.00';
    let perPerson = '0.00';

    let inputValue = this.state.inputValue;
    let tipPercentage = this.state.tipPercentage;
    let splitValue = this.state.splitValue;
  
    if (inputValue){
      tip = parseFloat(inputValue) * tipPercentage;
      total = parseFloat(inputValue) + tip;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
      total = (Math.round(total * 100) / 100).toFixed(2);
      if (splitValue !== 0){
        perPerson = (total / splitValue).toFixed(2);
      }
    }

    return (
      <Container>
        <LinearGradient
          colors={['#2980b9', '#2c3e50']}
          start={[0.25 , 0]}
          style={styles.gradient}
        />

        <Head />

        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <StyledText style={styles.header}>Bill Amount</StyledText>
            <TextInput 
              style={styles.text}
              value={this.state.inputValue}
              keyboardType='numeric'
              autoFocus={true}
              placeholder='0.00'
              clearButtonMode='always'
              underlineColorAndroid={'transparent'}
              onChangeText={text => this.setState({inputValue: text})}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Tip</Text>
            <StyledText>${tip}</StyledText>
            <StyledText>
              {(this.state.tipPercentage * 100).toFixed()}%
            </StyledText>
            <Slider 
              value={this.state.tipPercentage * 100}
              maximumValue={100}
              onValueChange={sliderValue => this.percentageSlider(sliderValue)}
              step={5}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>Total</Text>
            <StyledText>${total}</StyledText>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.header}>Split</Text>
            <StyledText>{this.state.splitValue.toString()}</StyledText>

            <Slider 
              value={this.state.splitValue}
              minimumValue={0}
              maximumValue={20}
              step={1}
              onValueChange={sliderValue => this.splitSlider(sliderValue)}
            />
          </View>

          {
            splitValue !== 0 && 
            <View style={styles.section}>
              <Text style={styles.header}>Per Person</Text>
              <StyledText>${perPerson}</StyledText>
            </View>
          }
        </ScrollView>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'linear-gradient(to right, #2980b9, #2c3e50)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // padding: 10,
  },
  section:{
    marginBottom: 25
  },
  header:{
    fontWeight: 'bold',
    color: '#FFF'
  },
  text:{
    color: '#FFF'
  },
  gradient:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  }
});
