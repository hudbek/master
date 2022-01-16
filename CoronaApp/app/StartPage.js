import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

class StartPage extends Component{
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  /**
   * Navigate to Home screen after 5 Sec
   */
  componentDidMount () {
    setTimeout(() => this.setState({text: "CoronaApp"}), 2000);
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 5000);
  };
  
  render() {
    return (
      
      <View style={styles.container}>
        <>
        <Animated.Text style={styles.appText}>
            {this.state.text}
        </Animated.Text>
        <Text style={styles.text}>Willkommen zu CoronaApp!</Text>
      </>
      <StatusBar style="auto" />
      </View>
      );
  }

}

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, text:{
    fontSize: 16,
    margin: 15
  }, appText:{
    fontSize: 42,
    fontWeight: "bold",
    margin: 15  
  }
});
