import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme from '../theme/colors'

const {width, height} = Dimensions.get('screen');

export default function FormInput({labelName, ...rest}) {
  return (
    <TextInput
      mode={'outlined'}
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest}
      left={
        labelName == 'Email'
        ? <TextInput.Icon name={() => <Icon name={'envelope'} size={20} />} />
        : <TextInput.Icon name={() => <Icon name={'eye'} size={20} />} />
      }
      theme={{colors: {primary: theme.componentColor }}}

    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});
