import Expo from "expo";
import React from 'react';
import { StyleSheet, TextInput, View, Slider, Switch } from 'react-native';
import { Button, Text, Container, Content, Form, Item, Input, Label } from 'native-base';

import Head from './ui/Head';
import Values from './ui/Values';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      tipPercentage: 0.2,
      isReady: false,
      split: false,
      splitValue: 2
    }
  }

  percentageSlider(sliderValue){
    this.setState({tipPercentage: parseFloat(sliderValue) / 100});
  }

  splitToggle(switchValue){
    this.setState({split: switchValue});
  }

  splitSlider(switchValue){
    this.setState({splitValue: switchValue});
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

    return (
      <Container>
        <Head />
        <View style={styles.container}>
          <Content style={{ width: '100%' }}>
            <Values tipPercentage={this.state.tipPercentage} inputValue={this.state.inputValue} split={this.state.split} splitValue={this.state.splitValue} />

            <Form>
              <Item stackedLabel>
                <Label>Bill Amount</Label>
                <Input 
                  value={this.state.inputValue}
                  keyboardType='numeric'
                  placeholder='0.00'
                  clearButtonMode='always'
                  underlineColorAndroid={'transparent'}
                  onChangeText={text => this.setState({inputValue: text})}
                />
              </Item>
            </Form>

            <View style={styles.inputs}>
              <View style={styles.buttonGroup}>
                <Button bordered onPress={() => this.setState({tipPercentage: 0.1})}>
                  <Text>10%</Text>
                </Button>
                <Button bordered onPress={() => this.setState({tipPercentage: 0.15})}>
                  <Text>15%</Text>
                </Button>
                <Button bordered onPress={() => this.setState({tipPercentage: 0.2})}>
                  <Text>20%</Text>
                </Button>
              </View>
            </View>
            <Text>
              Tip Percentage: {(this.state.tipPercentage * 100).toFixed()}%
            </Text>
            <Slider 
              value={this.state.tipPercentage * 100}
              maximumValue={100}
              onValueChange={sliderValue => this.percentageSlider(sliderValue)}
              step={5}
            />
            <Text>
              Split: {this.state.split ? this.state.splitValue.toString() : 'False'}
            </Text>
            <Switch 
              value={this.state.split}
              onValueChange={switchValue => this.splitToggle(switchValue)}
            />
            <Slider 
              disabled={!this.state.split}
              value={this.state.splitValue}
              minimumValue={2}
              maximumValue={10}
              step={1}
              onValueChange={sliderValue => this.splitSlider(sliderValue)}
            />
          </Content>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  inputs: {
    backgroundColor: '#FFF',
    padding: 20
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
