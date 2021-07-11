import React from 'react';
import {IconButton} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "../screens/Home"
import Movie from "../screens/Movie"
import News from "../screens/News"
import Popular from "../screens/Popular"
import Search from "../screens/Search"
import Perfil from "../screens/Perfil";

const Stack = createStackNavigator();

export default function StackNavegacion(props){

  const {navigation} = props;
  
  // menu hamburguesa
  const buttonLeft = (screen) => {

    switch(screen){
      case "search":
      case "movie" :
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()}/>
      )
      default: 
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()}/>
      )
    };
  };

  // este es el boton de  search con la lupita, que nos va a llevar al componente search, boton que va a aparecer en todos los screens, por eso
  // se va a usar como headerRight en todos los stack.Screen
  const buttonRight = () => {
    return(
      <IconButton icon="magnify" onPress={() => navigation.navigate("search")}/>
    );
  };

  // Stack de screens disponibles en la app para navegar
  return(
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{title: "AtlasApp", headerLeft: () => buttonLeft("home"), headerRight: () => buttonRight()}} />
      <Stack.Screen name="movie" component={Movie} options={{title: "",headerTransparent: true, headerLeft: () => buttonLeft("movie"), headerRight: () => buttonRight()}} />
      <Stack.Screen name="news" component={News} options={{title: "Nuevas Peliculas", headerLeft: () => buttonLeft("news"), headerRight: () => buttonRight()}} />
      <Stack.Screen name="popular" component={Popular} options={{title: "Peliculas Populares", headerLeft: () => buttonLeft("popular"), headerRight: () => buttonRight()}} />
      <Stack.Screen name="search" component={Search} options={{title: "", headerTransparent: true, headerLeft: () => buttonLeft("search")}} />
      <Stack.Screen name="perfil" component={Perfil} options={{title: "Mi Perfil", headerLeft: () => buttonLeft("home"), headerRight: () => buttonRight()}} />
    </Stack.Navigator>
  )
}