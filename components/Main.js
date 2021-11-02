
import React, { Component } from 'react';
import { Button, View, Text, PropTypes, Image, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Location from "expo-location";
import MyButton from './MyButton';
import { AsyncStorage } from "react-native"
import Listitem from './ListItem';



class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            items: []
        };
        this.sendToMap = this.sendToMap.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }
    setPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }
    setData2 = async () => {
        //await AsyncStorage.setItem('key1', 'value1');
        let pos = await Location.getCurrentPositionAsync({ maximumAge: 0 })
        await AsyncStorage.setItem('key' + Math.floor(Math.random() * 100), JSON.stringify(pos, null, 4));
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let value = JSON.parse(store[i][1]);
            let item = { id: i, time: value.timestamp, lat: value.coords.latitude, long: value.coords.longitude, flag: false }
            return item;
        });

        this.setState({ items: maps })

    }
    getData = async () => {
        await AsyncStorage.clear()
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let value = JSON.parse(store[i][1]);
            let item = { id: i, time: value.timestamp, lat: value.coords.latitude, long: value.coords.longitude, flag: false }
            return item;
        });

        this.setState({ items: maps })
    }
    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/papyrus.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
        this.setPermissions()
    }
    sendToMap = async () => {
        let val = await AsyncStorage.getItem('key1')
        val = JSON.parse(val)
        console.log(val.coords);
        this.props.navigation.navigate("Map", val)
    }
    handleSwitch(id) {
        let temp = this.state.items
        temp[id].flag = !temp[id].flag
        this.setState({ items: temp })
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
                        func={this.sendToMap}
                        size={40}
                    ></MyButton>
                    <FlatList
                        style={styles.flatlist}
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <Listitem
                                style={styles.listitem}
                                id={item.id}
                                time={item.time}
                                lat={item.lat}
                                long={item.long}
                                func={this.handleSwitch}
                                flag={item.flag}
                            ></Listitem>}

                    />

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
/**/

const styles = {
    item: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 10,
    },
    listitem: {
        marginTop: 10
    }

}
export default Main;