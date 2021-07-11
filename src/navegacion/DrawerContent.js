import React, {useState} from 'react';
import { StyleSheet, View} from "react-native";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreference from "../hooks/usePreferences";

export default function DrawerContent(props){
  
  const {navigation} = props;
  // set state que nos indica pagina actual, siempre empezando en home, aparte sabemos que en el state va toda variable que puede cambiar de valor
  const [active, setActive] = useState("home"); 
  const {theme, toggleTheme} = usePreference();

  //actua en el onPress llamando a onChangeScreen, donde se le pasa por parametro el name que tiene la screen para asi poder navegar
  const onChangeScreen = (screen) =>{
    setActive(screen);
    navigation.navigate(screen);
  }

  // Aca va todo lo que va a aparecer en el menu hamburguesa, osea es el contenido del drawer, actua como componente reemplazando el agregar uno por uno como un stack
  // Va tambien el switch para cambiar de white/dark theme dentro de otro Drawer.section, el switch usa onValueChange usando el toggleTheme del context, pudiendo mantener los valores aunque cambie otras cosas
  return(
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item label="Inicio" active={active === 'home'} onPress={() => onChangeScreen('home')}/>
        <Drawer.Item label="Peliculas Populares" active={active === 'popular'} onPress={() => onChangeScreen('popular')}/>
        <Drawer.Item label="Nuevas peliculas" active={active === 'news'} onPress={() => onChangeScreen('news')}/>
        <Drawer.Item label="Perfil" active={active === 'Perfil'} onPress={() => onChangeScreen('perfil')}/>
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item label ="Logout"/>
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})