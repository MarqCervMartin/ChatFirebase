import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              let {user} = await auth().signInWithEmailAndPassword(
                email,
                password,
              );
              await database()
                .ref('usuarios/' + user.uid)
                .update({state: true});
              console.log('Usuario loggeado');
            } catch (e) {
              console.log(e);
            }
          },
          register: async (name, email, password) => {
            try {
              let {user} = await auth().createUserWithEmailAndPassword(
                email,
                password,
              );
              //setUser(user)
              console.log(user);
              const usuario = {
                uid: user.uid,
                displayName: name,
                email: user.email,
                state: true,
              };
              await database()
                .ref('usuarios/' + user.uid)
                .set(usuario);
              console.log('Usuario guardado');
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await database()
                .ref('usuarios/' + user.uid)
                .update({state: false});
              await auth().signOut();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export const AuthContext = createContext({});
