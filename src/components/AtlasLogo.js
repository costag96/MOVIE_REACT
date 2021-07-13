import React from 'react';
import { Image, View } from 'react-native'

export default function AtlasLogo() {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image
                source={require('../assets/png/movie.png')}
                style={{
                    width: 100,
                    height: 110
                }}
            />
        </View>
    )
}