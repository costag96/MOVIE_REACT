import React, { useState, useEffect } from 'react';
import {View ,StyleSheet, ScrollView, Image, FlatList, Button} from 'react-native';
import {getUserApi} from '../api/atlas';
import CarouselGenre from "../components/CarouselGenre";
import {getNewsMoviesApi } from "../api/peliculas";
import { List, Title, Text  } from 'react-native-paper';
import {boton} from "../components/button"



export default function Perfil(props){
    const { navigation } = props;
    const  [usuario, setUsuario] = useState(null);
    const [newMovies,setNewMovies] = useState();

    useEffect(() => {
        getNewsMoviesApi().then((data)=>{
          setNewMovies(data.results);
        });
      }, []);

      // nombre User mediante props para el bienvenido
    return(
        <>
          {newMovies && (
         <ScrollView showsVerticalScrollIndicator={false}>
           
               <Title style={styles.caratulaPerfil }> Bienvenido a tu Perfil ...</Title>
               <ListaAcordeon></ListaAcordeon>
            
                <Title style={styles.textDeseados }>Tu lista de deseados</Title>
            
                <CarouselGenre data={newMovies} navigation={navigation} />
              <Title style={styles.textDeseados }>Tus Reviews</Title>
            
         </ScrollView>
            
          )    
              }
       

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

// TODO Agregar que renderice mediante forEach el componente amigo (nombre + boton borrado)
function ListaAmigos(){
   return(
   
      <FlatList
        data={[
          {key: 'Lucas'},
          {key: 'Pablo21'},
          {key: 'Sorren'},
          {key: 'Antonia'},
          {key: 'Ernesto'},
          {key: 'Alfonso'},
          {key: 'Carla'},
          {key: 'Alberto'},
          {key: 'Jimmy'},
        ]}
        renderItem={({item}) => <Text style={styles.amigos}>{item.key}</Text>}
      />

   )
}

function ListaAcordeon()  {
    const [expanded, setExpanded] = useState(false);
  
    const handlePress = () => setExpanded(!expanded);
  
    return (
      <List.Section titleStyle={{fontSize: 20, fontWeight: 'bold',}}  title="Tus Amigos">
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

      textDeseados:{
        marginBottom: 10,
        marginTop: 10,
        marginLeft:10,
        
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