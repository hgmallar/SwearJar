import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPiggyBank} from '@fortawesome/free-solid-svg-icons';

import CountButton from './components/CountButton';
import FillingBar from './components/FillingBar';

import firebase from './firebase.js';

class App extends Component {
  state = {
    hilaryCount: 0,
    bryceCount: 0,
    garrettCount: 0,
  };

  async componentDidMount() {
    await firebase
      .database()
      .ref('hilaryCount')
      .on('value', snapshot => {
        const data1 = snapshot.val();
        this.setState({hilaryCount: data1});
      });
    await firebase
      .database()
      .ref('bryceCount')
      .on('value', snapshot => {
        const data2 = snapshot.val();
        this.setState({bryceCount: data2});
      });
    await firebase
      .database()
      .ref('garrettCount')
      .on('value', snapshot => {
        const data3 = snapshot.val();
        this.setState({garrettCount: data3});
      });
  }

  incrementCounter = counterName => {
    let number = this.state[counterName] + 1;
    this.setState({[counterName]: number});
    firebase.database().ref(counterName).set(number).catch(alert);
  };

  decrementCounter = counterName => {
    let number = this.state[counterName];
    if (number !== 0) {
      number -= 1;
    }
    this.setState({[counterName]: number});
    firebase.database().ref(counterName).set(number).catch(alert);
  };

  resetCounters = () => {
    this.setState({hilaryCount: 0, bryceCount: 0, garrettCount: 0});
    firebase.database().ref('hilaryCount').set(0).catch(alert);
    firebase.database().ref('bryceCount').set(0).catch(alert);
    firebase.database().ref('garrettCount').set(0).catch(alert);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Swear</Text>
          <View style={styles.headerImage}>
            <FontAwesomeIcon icon={faPiggyBank} size="5x" />
          </View>
          <Text style={styles.headerText}>Jar</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.countStyle}>{this.state.hilaryCount}</Text>
          <Text style={styles.countStyle}>{this.state.bryceCount}</Text>
          <Text style={styles.countStyle}>{this.state.garrettCount}</Text>
        </View>
        <View style={styles.row}>
          <CountButton
            decrementCounter={this.decrementCounter}
            incrementCounter={this.incrementCounter}
            name="hilaryCount"
            title="Hilary"
          />
          <CountButton
            decrementCounter={this.decrementCounter}
            incrementCounter={this.incrementCounter}
            name="bryceCount"
            title="Bryce"
          />
          <CountButton
            decrementCounter={this.decrementCounter}
            incrementCounter={this.incrementCounter}
            name="garrettCount"
            title="Garrett"
          />
        </View>
        <View style={styles.row}>
          <FillingBar count={this.state.hilaryCount} />
          <FillingBar count={this.state.bryceCount} />
          <FillingBar count={this.state.garrettCount} />
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.resetButton}
            onPress={() => this.resetCounters()}>
            <Text style={styles.textStyle}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 20,
    color: '#72CC50',
  },
  headerText: {
    fontSize: 30,
    fontFamily: "'Short Stack', cursive",
    alignSelf: 'center',
    paddingVertical: 10,
    color: '#72CC50',
  },
  headerImage: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 5,
  },
  countStyle: {
    width: 80,
    color: '#019875',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resetButton: {
    width: 80,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 7,
    fontWeight: 'bold',
    backgroundColor: 'rgb(191, 216, 52)',
  },
  textStyle: {
    color: '#019875',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 20,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
