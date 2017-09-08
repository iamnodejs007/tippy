import Expo from "expo";
import React from 'react';
import { TextInput, StyleSheet, View, Slider } from 'react-native';
import { Text, Container, Content } from 'native-base';

import Head from './ui/Head';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      tipPercentage: 0.2,
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
        <Head />
        <View style={styles.container}>
          <Content style={{ width: '100%' }}>

            <View>
              <Text>Bill Amount</Text>
              <TextInput 
                value={this.state.inputValue}
                keyboardType='numeric'
                autoFocus={true}
                placeholder='0.00'
                clearButtonMode='always'
                underlineColorAndroid={'transparent'}
                onChangeText={text => this.setState({inputValue: text})}
              />
            </View>

            <View>
              <Text>Tip</Text>
              <Text>${tip}</Text>
              <Text>
                {(this.state.tipPercentage * 100).toFixed()}%
              </Text>
              <Slider 
                value={this.state.tipPercentage * 100}
                maximumValue={100}
                onValueChange={sliderValue => this.percentageSlider(sliderValue)}
                step={5}
              />
            </View>

            <View>
              <Text>Total: ${total}</Text>
            </View>
            
            <View>
              <Text>
                Split: {this.state.splitValue.toString()}
              </Text>

              <Slider 
                value={this.state.splitValue}
                minimumValue={0}
                maximumValue={20}
                step={1}
                onValueChange={sliderValue => this.splitSlider(sliderValue)}
              />
            </View>

            <View>
              {splitValue !== 0 && <Text>Each: ${perPerson}</Text>}
            </View>

          </Content>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    // alignItems: 'center',
    height: '100%',
    width: '100%'
  }
});
