import React from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback} from "react-native";

export default function Background() {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#000000',
                width: 1000,
                heigth: 1200
            }}
        />
    )
}