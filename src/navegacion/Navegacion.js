import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import StackNavegacion from "./StackNavegacion";
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Navigation(){
  return(
    <Drawer.Navigator 
      initialRouteName="app"
      drawerContent={(props)=> <DrawerContent {...props} />}>
      <Drawer.Screen name="app" component={StackNavegacion} />
    </Drawer.Navigator>
  );
}