import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList , Text} from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({navigation}) {
  const keyExtractor = (item, index) => index.toString();
  const user = auth().currentUser;
  const [arrayOnline, setArrayOnline] = useState([]);
  const [objOnline, setObjonline] = useState({});

  useEffect(() => {
    //listar usuarios online, nodo estado firebase
    database()
      .ref(`usuarios`)
      .orderByChild('state')
      .limitToLast(50)
      .on('child_added', (snap) => {
        if (snap.val().state === true) {
          if (user.uid !== snap.key) {
            //delete objOnline[key];
            setObjonline((prevState) => {
              const key = snap.key;
              const val = snap.val();

              return { ...prevState, [key]: val };
            });
          }
        }
      });

    database()
      .ref(`usuarios`)
      .on('child_changed', (snap) => {
        //console.log(snap.val());
        if (snap.val().state === true) {
          if (user.uid !== snap.key) {
            setObjonline((prevState) => {
              const key = snap.key;
              const val = snap.val();

              return { ...prevState, [key]: val };
            });
          }
        } else {
          setObjonline((prevState) => {
            const key = snap.key;
            delete prevState[key];
            return { ...prevState };
          });
        }
      });
      
  }, []);

  useEffect(() => {
    const newArray = Object.values(objOnline);
    setArrayOnline(newArray);
    console.log(arrayOnline)
  }, [objOnline]);

  // ...rest of the component
  return(
    <View>
    <FlatList
      data={arrayOnline}
      keyExtractor={keyExtractor}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chat', {keyExtractor: arrayOnline})
          }>
          <View style={styles.avatar}>
            {/* <Avatar.Image size={40} source={{uri: item.foto}} /> */}
            <Avatar.Icon size={40} icon="account" />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.nombre}>{item.uid}</Text>
              <Text style={styles.puesto}>{item.email}</Text>
            </View>
          </View>
          <Divider />
        </TouchableOpacity>
      )}
    />
    
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});