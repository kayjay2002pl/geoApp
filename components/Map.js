
import React, { Component } from 'react';
import { Button, View, Text, PropTypes, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as Font from "expo-font";
import * as Location from "expo-location";
import MyButton from './MyButton';
import { AsyncStorage } from "react-native"
import MapView from 'react-native-maps';



class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };
    }


    render() {

        return (

            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 50.111,
                    longitude: 20.111,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: this.props.route.params.coords.latitude,
                        longitude: this.props.route.params.coords.longitude,
                    }}
                    title={"pos"}
                    description={"opis"}
                />
            </MapView>

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
export default Map;