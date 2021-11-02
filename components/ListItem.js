
import React, { Component } from 'react';
import { Switch, View, Text, PropTypes, Image } from 'react-native';
import MyButton from './MyButton';


class Listitem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img: require('../assets/favicon.png')
        };
        console.log("Content")
        this.handle = this.handle.bind(this)
    }
    handle() {
        this.props.func(this.props.id)
    }

    render() {
        return (
            <View style={styles.item}>
                <Image style={styles.con} source={this.state.img} />
                <View style={styles.con}>
                    <Text style={styles.text}>{this.props.time}</Text>
                    <Text style={styles.text2}>{this.props.lat}</Text>
                    <Text style={styles.text2}>{this.props.long}</Text>

                </View>
                <Switch style={styles.con}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.props.flag ? "#FFCCBC" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onChange={this.handle}
                    value={this.props.flag}
                />


            </View>
        );
    }
}
//Listitem.propTypes = {
//    id: PropTypes.string.isRequired,
//    login: PropTypes.string.isRequired,
//    passwd: PropTypes.string.isRequired,
//    date: PropTypes.string.isRequired,
//};
//const wid = Dimensions.get('window').width;
//const hei = Dimensions.get('window').height;
const styles = {
    item: {
        //width: wid,
        //height: hei * 0.2,
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 10,
    },
    text: {
        fontSize: 20,
        color: "#212121"
    },
    text2: {
        fontSize: 10,
        color: "#757575"
    },
    con: {
        marginLeft: 10,
    }
}
export default Listitem;