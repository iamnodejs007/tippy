import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';

const Head = () => (
  <View style={styles.headerView}>
    <Header style={styles.header}>
      <Left/>
      <Body>
        <Title>Tip Calculator</Title>
      </Body>
      <Right />
    </Header>
  </View>
)

const styles = StyleSheet.create({
  headerView: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      }
    })
  },
  header:{
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  }
});

export default Head;