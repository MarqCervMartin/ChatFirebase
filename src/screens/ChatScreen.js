import React, {useState, useContext, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import Loading from '../components/Loading';
import theme from '../theme/colors';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  Avatar,
} from 'react-native-gifted-chat';

const ChatScreen = ({route, navigation}) => {
    const {keyExtractor} = route.params;
    //console.log("KeyExtractor: ", keyExtractor)

    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState();
    const user = auth().currentUser;

    function handleSend(messages) {
        const text = messages[0].text;
        const tiempo = new Date().getTime();
        //A channel entry
        database()
          .ref(`chat/${channel}`)
          .push({
            _id: Math.round(Math.random() * 1000000),
            text,
            createdAt: new Date().getTime(),
            status: false,
            user: {
              _id: user.uid,
              email: user.email,
            },
            userRecived: {
              _id: keyExtractor.uid,
              email: keyExtractor.email,
            },
          })
          .then((res) => {
            //Aqui despues de enviar mensaje
            //console.log('mensaje guardado');
          })
          .catch((e) => console.log(e));
        //Update last message: Usuarios
        //User A send, User B received
        //updateLastMessage(currentUser, keyExtractor, tiempo);
    
        //copia de User received
        //updateLastMessage(keyExtractor, currentUser, tiempo);
    }
    /*
    return (
        <View>
            <Text>Hello chat {keyExtractor[0].uid}</Text>
        </View>
    )*/

    useEffect(() => {
          if (user.uid < keyExtractor.uid) {
            setChannel(user.uid + keyExtractor.uid);
          } else {
            setChannel(keyExtractor.uid + user.uid);
          }
          const messagesListener = database()
            .ref(`chat/${channel}`)
            .orderByChild('createdAt')
            .limitToLast(20)
            .on('child_added', (snapshot) => {
                //console.log('********AGREGANDO************');
                setMessages((prevState) => [...prevState, snapshot.val()]);
            });
        return () => database().ref(`chat/${channel}`).off('child_added', messagesListener);
      }, [channel]);

    function renderBubble(props) {
        return (
          // Step 3: return the component
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: theme.componentColor,
              },
              left: {
                backgroundColor: theme.white,
              },
            }}
            textStyle={{
              right: {
                color: '#fff',
              },
            }}
          />
        );
      }
    
      function renderLoading() {
        //1 Comprobar si existe el canal en caso contrario crearlo
        
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6646ee" />
          </View>
        );
      }
    
      function renderSend(props) {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
              <IconButton icon="send-circle" size={48} color={theme.componentColor} />
            </View>
          </Send>
        );
      }
    
      function scrollToBottomComponent() {
        return (
          <View style={styles.bottomComponentContainer}>
            <IconButton icon="chevron-double-down" size={36} color={theme.componentColor} />
          </View>
        );
      }
    
      function renderSystemMessage(props) {
        return (
          <SystemMessage
            {...props}
            wrapperStyle={styles.systemMessageWrapper}
            textStyle={styles.systemMessageText}
          />
        );
      }
    
      const renderAvatar = (props) => (
        <Avatar
          {...props}
          imageStyle={{
            left: {borderWidth: 3, borderColor: 'blue'},
            right: {},
          }}
        />
      );
    
      function mapUser(user) {
        return {
          _id: user.uid,
          name: user.email,
        };
      }
    
      return (
        <GiftedChat
          messages={messages}
          inverted={false}
          onSend={handleSend}
          user={mapUser(user)}
          placeholder="   Escribir mensaje..."
          showUserAvatar
          //renderAvatar={renderAvatar}
          alwaysShowSend
          scrollToBottom
          renderBubble={renderBubble}
          renderLoading={renderLoading}
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          renderSystemMessage={renderSystemMessage}
        />
      );
}
const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomComponentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    systemMessageWrapper: {
      backgroundColor: '#6646ee',
      borderRadius: 4,
      padding: 5,
    },
    systemMessageText: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
    },
    tick: {
      fontSize: 10,
      backgroundColor: 'transparent',
      color: '#fff',
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
  });

export default ChatScreen
