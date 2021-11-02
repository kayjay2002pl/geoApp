
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, Alert } from 'react-native';
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
            items: [],
            boolik: false,
            perm: false,
            isloading: false,
            any: false
        };
        this.sendToMap = this.sendToMap.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handle = this.handle.bind(this)
    }
    setPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        } else {
            this.setState({ perm: true })
        }

    }
    setData2 = async () => {
        console.log("ide");
        //await AsyncStorage.setItem('key1', 'value1');
        if (this.state.perm) {
            console.log("id2e");
            this.setState({ isloading: true })
            let pos = await Location.getCurrentPositionAsync({})
            await AsyncStorage.setItem('key' + Math.floor(Math.random() * 100), JSON.stringify(pos, null, 4));
            let keys = await AsyncStorage.getAllKeys();
            let stores = await AsyncStorage.multiGet(keys);
            let maps = stores.map((result, i, store) => {
                let value = JSON.parse(store[i][1]);
                let item = { id: i, time: value.timestamp, lat: value.coords.latitude, long: value.coords.longitude, flag: false }
                return item;
            });
            this.setState({ items: maps })
            this.setState({ isloading: false })
        } else {
            console.log("BUG");
        }

    }
    getData = async () => {
        this.setState({ isloading: true })
        await AsyncStorage.clear()
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let value = JSON.parse(store[i][1]);
            let item = { id: i, time: value.timestamp, lat: value.coords.latitude, long: value.coords.longitude, flag: false }
            return item;
        });

        this.setState({ items: maps })
        this.setState({ isloading: false })
    }
    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/papyrus.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
        this.setPermissions()
        this.setState({ isloading: true })
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let value = JSON.parse(store[i][1]);
            let item = { id: i, time: value.timestamp, lat: value.coords.latitude, long: value.coords.longitude, flag: false }
            return item;
        });

        this.setState({ items: maps })
        this.setState({ isloading: false })
    }
    sendToMap = async () => {
        //let val = await AsyncStorage.getItem('key1')
        //val = JSON.parse(val)
        //console.log(val.coords);
        let any = false;
        let map = this.state.items.map(result => {
            console.log(result);
            if (result.flag) {
                any = true;
                return result;
            }
        });
        console.log(map);
        if (any) {
            this.props.navigation.navigate("Map", map)
        } else {
            Alert.alert(
                "NIC NIE WYBRANO"
            )
        }

    }
    handleSwitch(id) {
        let temp = this.state.items
        temp[id].flag = !temp[id].flag
        this.setState({ items: temp })
    }
    handle() {
        let temp = !this.state.boolik
        this.setState({ boolik: temp })
        console.log(temp);
        this.state.items.forEach(element => {
            element.flag = temp
        });
    }

    render() {
        return (

            this.state.fontloaded
                ?
                <View style={{ flex: 1, margin: 10 }}>
                    <Text style={{
                        fontFamily: 'myfont',
                        fontSize: 100
                    }}>Geolocation</Text>

                    <MyButton
                        title="Dodaj twoją aktualną lokalizację"
                        func={this.setData2}
                        size={40}
                    ></MyButton>
                    <MyButton
                        title="usuń wszystkie wpisy"
                        func={this.getData}
                        size={40}
                    ></MyButton>
                    <MyButton
                        title="pokaż zaznaczone lokalizacje na mapie"
                        func={this.sendToMap}
                        size={40}
                    ></MyButton>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.props.flag ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onChange={this.handle}
                        value={this.state.boolik}
                    />
                    <View style={{ flex: 1 }}>
                        {
                            this.state.isloading == true ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                :
                                <Text />
                        }
                    </View>
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