import Expo from "expo";
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Slider } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';

import Head from './ui/Head';
import Values from './ui/Values';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      tipPercentage: 0.2,
      isReady: false
    }
  }

  percentageSlider(sliderValue){
    this.setState({tipPercentage: parseFloat(sliderValue) / 100});
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
            <Values tipPercentage={this.state.tipPercentage} inputValue={this.state.inputValue} />

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
                <Button
                  title="10%"
                  onPress={() => this.setState({tipPercentage: 0.1})}
                />
                <Button
                  title="15%"
                  onPress={() => this.setState({tipPercentage: 0.15})}
                />
                <Button
                  title="20%"
                  onPress={() => this.setState({tipPercentage: 0.2})}
                />
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
