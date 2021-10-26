
import React, { Component } from 'react';
import { Button, View, Text, PropTypes, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Location from "expo-location";
import MyButton from './components/MyButton';
import { AsyncStorage } from "react-native"



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  setPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
    }
  }
  setData = async () => {
    //await AsyncStorage.setItem('key1', 'value1');
    await AsyncStorage.setItem('key' + Math.round(Math.random() * 100), 'value' + Math.random());
  }
  setData2 = async () => {
    //await AsyncStorage.setItem('key1', 'value1');
    await AsyncStorage.setItem('key' + 1, 'value' + Math.random());
  }
  getData = async () => {
    let val = await AsyncStorage.getItem('key1');
    console.log(val);
  }
  getAllData = async () => {
    let keys = await AsyncStorage.getAllKeys();
    console.log("keys", keys)
    let stores = await AsyncStorage.multiGet(keys);
    console.log("stores", stores)
    let maps = stores.map((result, i, store) => {
      let key = store[i][0];
      let value = store[i][1];
      console.log(key, value)
    });
  }
  componentDidMount = async () => {
    await Font.loadAsync({
      'myfont': require('./assets/papyrus.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
    });
    this.setState({ fontloaded: true })
    this.setPermissions()
  }
  getPosition = async () => {
    let pos = await Location.getCurrentPositionAsync({ maximumAge: 0 })
    alert(JSON.stringify(pos, null, 4))
  }

  render() {
    return (

      this.state.fontloaded
        ?
        <View style={{ flex: 1 }}>
          <Text style={{
            fontFamily: 'myfont',
            fontSize: 100
          }}>Test</Text>
          <MyButton
            title="SPRWAWDŹ LOKACJĘ"
            func={this.getPosition}
            size={40}
          ></MyButton>
          <MyButton
            title="DODAJ"
            func={this.setData}
            size={40}
          ></MyButton>
          <MyButton
            title="DODAJ.2"
            func={this.setData2}
            size={40}
          ></MyButton>
          <MyButton
            title="CZYTAJ"
            func={this.getData}
            size={40}
          ></MyButton>
          <MyButton
            title="CZYTAJ WSZYSTKO"
            func={this.getAllData}
            size={40}
          ></MyButton>
        </View>
        :
        <View style={{ flex: 1 }}>
          {
            this.state.number == 0 ?
              <ActivityIndicator size={69} color="#0000ff" />
              :
              <ActivityIndicator size="small" color="#ff0000" />
          }

        </View>
    );
  }
}

const styles = {
  item: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
  },

}
export default App;