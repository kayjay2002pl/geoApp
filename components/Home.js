
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image, FlatList, TouchableOpacity } from 'react-native';
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
            perm: false
        };
        this.handle = this.handle.bind(this)
    }
    handle() {
        this.props.navigation.navigate("Main")
    }

    render() {
        return (

            <TouchableOpacity
                style={styles.whole}
                onPress={this.handle}
            >
                <Text style={styles.tekst}>Press Here</Text>
            </TouchableOpacity>
        );
    }
}
/**/

const styles = {
    whole: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tekst: {
        fontSize: 46

    }


}
export default Main;