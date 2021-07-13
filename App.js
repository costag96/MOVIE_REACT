import React, {useState, useMemo} from 'react';
import {StatusBar} from 'react-native';
// importaciones en los cuales estan los themes, cambiandoles el nombre con as, por cuestiones de nombres repetidos
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav } from "@react-navigation/native";
import Navegacion from './src/navegacion/Navegacion';
// import del contexto
import PreferencesContext from './src/context/PreferencesContext';




export default function App() {

  // useState para los cambios de theme, empezando como dark.
  const [theme,setTheme] = useState("dark");

  // seteo de colores para los Themes
  DefaultThemePaper.colors.primary = '#1ae1f2';

  DarkThemePaper.colors.primary = '#DA0037';
  DarkThemePaper.colors.accent = '#1ae1f2';

  DarkThemeNav.colors.background = '#15212b';
  DarkThemeNav.colors.card = '#15212b';

  const toggleTheme = () =>{
   // esto setea los themes, si esta en light a dark, y vice
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

     // la parte de todos los ternarios quiere decir que si el theme es dark, el contenido tiene que ser light, y vice, contenido equals texto.
     // al envolver todo con el ppreferencesContextProvider toda la aplicacion va a tener acceso a los valores del contexto..
  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
        <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
          <Navegacion />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
