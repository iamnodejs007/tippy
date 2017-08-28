import Expo from "expo";
import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Container, Content } from 'native-base';

import Head from './ui/Head';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      tipPercentage: 0.2,
      isReady: false
    }
  }

  updateCustomTip(customTip){
    if (customTip) {
      this.setState({tipPercentage: parseFloat(customTip) / 100});
    } else {
      this.setState({tipPercentage: 0})
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ isReady: true });
  }

  alert(){
    Alert.alert(
      'Just saying hi',
      null,
      [
        {text: 'Okay', onPress: () => console.log('pressed Okay')},
        {text: 'Cancel', onPress: () => console.log('pressed Cancel')}
      ]
    )
  }

  render() {
    let tip = '0.00';
    if (this.state.inputValue){
      tip = parseFloat(this.state.inputValue) * this.state.tipPercentage;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
    }

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <Head />
        <Content padder>
          <View style={styles.container}>
          <Button
            title="Alert"
            onPress={this.alert}
          />
            <Text>
              ${tip}
            </Text>
            <TextInput
              value={this.state.inputValue}
              keyboardType='numeric'
              style={styles.input}
              placeholder='0.00'
              underlineColorAndroid={'transparent'}
              onChangeText={text => this.setState({inputValue: text})}
            />
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
              <TextInput 
                value={(this.state.tipPercentage * 100).toString()}
                keyboardType='numeric'
                placeholder='20%'
                style={styles.customTip}
                underlineColorAndroid={'transparent'}
                onChangeText={customTip => this.updateCustomTip(customTip)}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
  },
  customTip: {
    height: 30,
    width: 60,
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
  },
  buttonGroup: {
    flexDirection: 'row'
  }
});
