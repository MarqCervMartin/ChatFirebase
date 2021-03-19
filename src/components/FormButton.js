import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../theme/colors'

const {width, height} = Dimensions.get('screen');

export default function FormButton({title, modeValue, ...rest}) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      color={theme.text}
      style={[styles.button, modeValue == 'contained' && styles.buttonBackgroundContainer]}
      contentStyle={styles.buttonContainer}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
  buttonBackgroundContainer:{
    backgroundColor: theme.componentColor,
  },
});
