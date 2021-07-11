import React, { useState, useEffect } from 'react';
import {View ,StyleSheet, ScrollView, Image, FlatList} from 'react-native';
import {getUserApi} from '../api/atlas';
import CarouselGenre from "../components/CarouselGenre";
import {getNewsMoviesApi } from "../api/peliculas";
import { List, Title, Text  } from 'react-native-paper';



export default function Perfil(props){
    const { navigation } = props;
    const  [usuario, setUsuario] = useState(null);
    const [newMovies,setNewMovies] = useState(null);

    useEffect(() => {
        getNewsMoviesApi().then((data)=>{
          setNewMovies(data.results);
        });
      }, []);

    return(
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
           
            <Title style={styles.caratulaPerfil }> Bienvenido a tu Perfil ...</Title>
             <ImagenPerfil> </ImagenPerfil>
             <UnaLista></UnaLista>
             <Title style={styles.textMovies }>Tu lista de deseados</Title>
             <CarouselGenre data={newMovies} navigation={navigation} />
             <Title style={styles.textMovies }>Tus Reviews</Title>
           
        </ScrollView>

        </>

    )
}

function ImagenPerfil(){
    return(
        
        <View>
            <Image style={styles.imagenPerfil} source= {{uri: 'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg'}} />
        </View>

    )
}

function ListaAmigos(){
   return(
    <View >
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.amigos}>{item.key}</Text>}
      />
    </View>
   )
}

function UnaLista()  {
    const [expanded, setExpanded] = React.useState(true);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
      <List.Section title="Tus Amigos">
        <List.Accordion
          title="Amigos"
          left={props => <List.Icon {...props} icon="face" />}
          expanded={expanded}
          onPress={handlePress}>
         <ListaAmigos></ListaAmigos>
         
        </List.Accordion>
      </List.Section>
    );
  };
  



const styles = StyleSheet.create({
    imagenPerfil:{
        width: "40%",
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      caratulaPerfil:{
        marginHorizontal:70,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
      },

      textMovies:{
        marginBottom: 10,
        marginTop: 10,
        
      },

      amigos:{
        marginHorizontal:10,
        
        marginTop: 10,
        fontWeight: 'bold',
         fontSize: 20,
        flexDirection: "row",
        alignItems: "center",
      },

      tituloAmigos:{
        marginTop: 20,
        marginBottom: 10,
      },


})