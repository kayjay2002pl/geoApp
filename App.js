
import React, { Component } from 'react';
import { Button, View, Text, PropTypes, Image } from 'react-native';
import { ActivityIndicator } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }


  render() {
    return (
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