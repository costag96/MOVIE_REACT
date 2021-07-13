import React, {useState} from 'react';
import { StyleSheet, View, Alert} from "react-native";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreference from "../hooks/usePreferences";
import useAuth from '../hooks/useAuth'

export default function DrawerContent(props){
  
  const {navigation} = props;
  const [active, setActive] = useState("home"); 
  const {theme, toggleTheme} = usePreference();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesion",
      "Estas seguro que quieres salir?",
      [
        {
          text: "NO"
        },
        {
          text: "SI",
          onPress: logout,
        }
      ],
      { cancelable: false }
    )
  }

  const onChangeScreen = (screen) =>{
    setActive(screen);
    navigation.navigate(screen);
  }

  return(
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item label="Inicio" active={active === 'home'} onPress={() => onChangeScreen('home')}/>
        <Drawer.Item label="Peliculas Populares" active={active === 'popular'} onPress={() => onChangeScreen('popular')}/>
        <Drawer.Item label="Nuevas peliculas" active={active === 'news'} onPress={() => onChangeScreen('news')}/>
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
        <Drawer.Item
          label="Logout"
          onPress={logoutAccount}
        />
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