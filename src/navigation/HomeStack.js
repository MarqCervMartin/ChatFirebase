import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {AuthContext} from './AuthProvider';
import ChatScreen from '../screens/ChatScreen';
import {IconButton} from 'react-native-paper';
import theme from '../theme/colors';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  const {logout} = useContext(AuthContext);

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
        headerTitleAlign: {
          alignItems: 'center',
        },
      }}>
      <ChatAppStack.Screen
        name="Chat Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <IconButton
              icon="logout"
              size={28}
              color= {theme.white}
              onPress={() => logout()}
            />
          ),
          headerTintColor: theme.white,
          headerStyle: {
            backgroundColor: theme.componentColor,
          },
        })}
      />
      <ChatAppStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({
          title: "Hello",
          headerTintColor: theme.white,
          headerStyle: {
            backgroundColor: theme.componentColor,
          },
        })}
      />
    </ChatAppStack.Navigator>
  );
}

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
    </ModalStack.Navigator>
  );
}
