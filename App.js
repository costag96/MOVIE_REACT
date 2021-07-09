import React, {useState, useMemo} from 'react';
import {StatusBar} from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper} from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNav, DefaultTheme as DefaultThemeNav } from "@react-navigation/native";
import Navegacion from './src/navegacion/Navegacion';
import PreferencesContext from './src/context/PreferencesContext';


export default function App() {

  const [theme,setTheme] = useState("dark");

  DefaultThemePaper.colors.primary = '#1ae1f2';

  DarkThemePaper.colors.primary = '#DA0037';
  DarkThemePaper.colors.accent = '#1ae1f2';

  DarkThemeNav.colors.background = '#15212b';
  DarkThemeNav.colors.card = '#15212b';

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
