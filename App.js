import React, {useState, useEffect, useMemo} from 'react';
import {StatusBar, Text, View} from 'react-native';
// importaciones en los cuales estan los themes, cambiandoles el nombre con as, por cuestiones de nombres repetidos
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav } from "@react-navigation/native";
import Navegacion from './src/navegacion/Navegacion';
// import del contexto
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

  // useMemo es un Hook para poder dar valores a una constante y que cuando la aplicacion modifique un componente no se vuelva a su estado original.
  //en este caso solo sufre cambios si theme sufre un cambio
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



     // la parte de todos los ternarios quiere decir que si el theme es dark, el contenido tiene que ser light, y vice, contenido equals texto.
     // al envolver todo con el ppreferencesContextProvider toda la aplicacion va a tener acceso a los valores del contexto..
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
