import React, { useState, useEffect } from 'react';
import {View ,StyleSheet, ScrollView, Image, FlatList, Button} from 'react-native';




export function boton() {
    return(
        <Button
        title="Borrar amigo"
        onPress={() => Alert.alert('Amigo Borrado')}
       />
    )

}

