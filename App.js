import Expo from "expo";
import React from 'react';
import { StyleSheet, View, Slider } from 'react-native';
import { Text, Container, Content, Form, Item, Input, Label } from 'native-base';

import Head from './ui/Head';
import Values from './ui/Values';

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

    return (
      <Container>
        <Head />
        <View style={styles.container}>
          <Content style={{ width: '100%' }}>
            <Values tipPercentage={this.state.tipPercentage} inputValue={this.state.inputValue} splitValue={this.state.splitValue} />

            <Form>
              <Item stackedLabel>
                <Label>Bill Amount</Label>
                <Input 
                  value={this.state.inputValue}
                  keyboardType='numeric'
                  autoFocus={true}
                  placeholder='0.00'
                  clearButtonMode='always'
                  underlineColorAndroid={'transparent'}
                  onChangeText={text => this.setState({inputValue: text})}
                />
              </Item>
              <Item stackedLabel>
                <Label>Tip</Label>
                <Text>
                  {(this.state.tipPercentage * 100).toFixed()}%
                </Text>
              </Item>
            </Form>

            <Slider 
              value={this.state.tipPercentage * 100}
              maximumValue={100}
              onValueChange={sliderValue => this.percentageSlider(sliderValue)}
              step={5}
            />
            
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
  }
});
