import Expo from "expo";
import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Slider, StatusBar } from 'react-native';
import { Text, Container, Content } from 'native-base';
import { LinearGradient } from 'expo';

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

        <StatusBar barStyle="light-content" />

        <View style={styles.container}>
          <View style={styles.section}>
            <StyledText style={styles.header}>Bill Amount</StyledText>
            <TextInput 
              style={styles.bigText}
              value={this.state.inputValue}
              keyboardType='numeric'
              autoFocus={true}
              selectionColor='white'
              placeholder='0.00'
              placeholderTextColor='rgba(255,255,255,0.5)'
              clearButtonMode='always'
              underlineColorAndroid={'transparent'}
              onChangeText={text => this.setState({inputValue: text})}
            />
          </View>

          {this.state.inputValue !== '' && 
          <View>
          <View style={styles.section}>
            <View style={styles.flexWrapper}>
              <Text style={styles.header}>Tip</Text>
              <StyledText>
                {(this.state.tipPercentage * 100).toFixed()}%
              </StyledText>
            </View>
            <StyledText style={styles.bigText}>${tip}</StyledText>
            <Slider 
              value={this.state.tipPercentage * 100}
              maximumValue={100}
              onValueChange={sliderValue => this.percentageSlider(sliderValue)}
              step={5}
              minimumTrackTintColor='white'
              maximumTrackTintColor='rgba(255,255,255,0.5)'
              thumbTintColor='white'
            />
          </View>

          <View style={[styles.section, styles.flexWrapper]}>
            <View>
              <Text style={styles.header}>Total</Text>
              <StyledText style={styles.bigText}>${total}</StyledText>
            </View>
            {
              splitValue !== 0 && 
              <View>
                    <Text style={[styles.header, {textAlign: 'right'}]}>Per Person</Text>
                    <StyledText style={[styles.bigText, {textAlign: 'right'}]}>${perPerson}</StyledText>
              </View>
            }
          </View>
          
          <View style={styles.section}>
            <View style={styles.flexWrapper}>
              <Text style={styles.header}>Split</Text>
              <StyledText>{this.state.splitValue.toString()}</StyledText>
            </View>

            <Slider 
              value={this.state.splitValue}
              minimumValue={0}
              maximumValue={20}
              step={1}
              minimumTrackTintColor='white'
              maximumTrackTintColor='rgba(255,255,255,0.5)'
              thumbTintColor='white'
              onValueChange={sliderValue => this.splitSlider(sliderValue)}
            />
          </View>

          
          </View>
          }
        </View>

      </Container>
    );
  }
}

const textColor = '#FFF';
const bigFontSize = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    paddingTop: 40
  },
  section:{
    marginBottom: 25
  },
  flexWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header:{
    fontWeight: 'bold',
    color: textColor
  },
  text:{
    color: textColor
  },
  bigText:{
    color: textColor,
    fontSize: bigFontSize
  },
  gradient:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  }
});
