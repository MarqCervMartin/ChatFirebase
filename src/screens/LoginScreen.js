import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Title} from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import theme from '../theme/colors';
import LinearGradient from 'react-native-linear-gradient'
import imagesURL from '../theme/url';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: imagesURL.backgroundLoginURL}} style={styles.imgBackground}>
        <LinearGradient
          colors={[theme.pink, theme.white]}
          style={styles.linearGradient}
        >
          <Image
            style={styles.image}
            source={{uri: imagesURL.loginURL}}
            resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
          />
          <Title style={styles.titleText}>ChaTerri</Title>
          <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
          />
          <FormButton
            title="Login"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onPress={() => login(email, password)}
          />
          <FormButton
            title="Registrarse"
            modeValue="text"
            uppercase={false}
            labelStyle={styles.navButtonText}
            onPress={() => navigation.navigate('Signup')}
          />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
    color: theme.text,
  },
  navButtonText: {
    fontSize: 16,
  },
  image:{
    width: 150,
    height: 150,
    borderColor: theme.componentColor,
    borderWidth: 2,
    borderRadius: 75
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
