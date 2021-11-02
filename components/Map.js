
import React, { Component } from 'react';
import { Button, View, Text, PropTypes, Image, FlatList } from 'react-native';
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
            number: 0,
            mapa: []
        };
    }
    componentDidMount() {
        let mapa2 = this.props.route.params.filter(element => element != undefined);
        console.log("AAAAA");
        console.log(mapa2);
        this.setState({ mapa: mapa2 })
    }
    render() {
        console.log(this.state.mapa);



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
                {this.state.mapa.map((val, index) => {
                    return (<MapView.Marker
                        coordinate={{
                            latitude: val.lat,
                            longitude: val.long
                        }}
                        key={index}
                        title={val.id + ""}
                        description={val.time + ""}
                    />);
                })}

            </MapView>

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

}
export default Map;