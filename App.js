import React, {useState, useEffect, useMemo} from 'react';
import {StatusBar, Text, View} from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav } from "@react-navigation/native";
import Navegacion from './src/navegacion/Navegacion';
import PreferencesContext from './src/context/PreferencesContext';
import Login from './src/screens/Login';
import jwtDecode from 'jwt-decode';
import AuthContext from './src/context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token';

export default function App() {

  const [auth, setAuth] = useState(undefined);
  const [theme, setTheme] = useState("dark");

    const toggleTheme = () =>{
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const preference = useMemo(
    ()=> ({
      toggleTheme,
      theme,
    }),
    [theme],
  ); 
  
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        console.log('estoy logueado');        
        console.log(token);
        setAuth({
          token,
          idUser: jwtDecode(token).id
        });
      } else {
        setAuth(null);
      }
    })()
  }, []);
  
  const login = (user) => {
    console.log("Login app.js");
    console.log(user)
    setTokenApi(user.token)
    setAuth({
      token: user.token,
      idUser: user.user._id
    });
  }

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  )
 
  if (auth === undefined) return null;



  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#DA0037';
  DarkThemePaper.colors.accent = '#1ae1f2';
  DarkThemeNav.colors.background = '#181818';
  DarkThemeNav.colors.card = '#181818';



  return (
    //   {/* <PreferencesContext.Provider value={preference}> */}
    //     <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
    //       {/* <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} /> */}
    //       <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
    //             {auth ? <Text> LALA </Text> : <Login/>} 
    //         {/* <Navegacion />  */}
    //       </NavigationContainer>
    //     </PaperProvider>
    //   {/* </PreferencesContext.Provider> */}

    <AuthContext.Provider value={authData}>    
      <PreferencesContext.Provider value={preference}>
          <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
            {auth ? (
            <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
                <Navegacion />
            </NavigationContainer>    
            ) : (
              <Login />
            )}
          </PaperProvider>
      </PreferencesContext.Provider>
    </AuthContext.Provider>
  
  );
}
