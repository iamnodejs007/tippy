import Expo from "expo";
import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Container, Content } from 'native-base';

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
            <View style={styles.inputs}>
              <TextInput
                value={this.state.inputValue}
                keyboardType='numeric'
                style={styles.input}
                placeholder='0.00'
                placeholderTextColor='#FFF'
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
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  inputs: {
    backgroundColor: '#212121',
    padding: 20
  },
  input: {
    height: 40,
    width: '100%',
    padding: 5,
    color: '#FFF'
  },
  customTip: {
    height: 40,
    width: 60,
    padding: 5,
    color: '#FFF'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
