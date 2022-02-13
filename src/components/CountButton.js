import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      onLongPress={() => props.decrementCounter(props.name)}
      activeOpacity={0.6}
      style={styles.button}
      onPress={() => props.incrementCounter(props.name)}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 80,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#00AEAD',
    borderRadius: 7,
  },
  textStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
