import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Text, Title } from 'react-native-paper';
import { BASE_PATH_IMG } from '../utils/constants';
import { getGenerosMoviesApi } from '../api/peliculas';
// lodash contiene funciones utiles de js, nos va a servir para el carrusel, se usa para dibujar los generos
import {map, size} from "lodash";


const{ width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

// lo que viene por props desde home
export default function CarouselVertical(props) {
  const { data, navigation } = props;

  // el carrusel, con el render item por cara item que tenga el array devolvera un objeto. dibujando peliculas.
  return (
    <Carousel
    layout={'default'}
    data={data}
    renderItem={(item)=> <RenderItem data={item} navigation={navigation} />}
    sliderWidth={width}
    itemWidth={ITEM_WIDTH} 
    /> 
  );
}

// este renderItem es un componente interno del carrusel que se encarga de dibujar las peliculas, es gran parte del componente principal 
// se hace el destructuring de todo lo que venga en data para poder usarlo.
// va todo dentro del componente Touchable, que es parte de la utilidad del carrusel. Dentro del view se va a dibujar las peliculas de la manera usual
function RenderItem(props){
  const { data, navigation } = props;
  const { id, title, poster_path, genre_ids } = data.item;
  const [generos,setGeneros] = useState(null);
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  // todo este useEffect es para usar el getGenerosMoviesApi. se necesita hacer el useEffect para poder ejecutar la peticion
  useEffect(() => {
    getGenerosMoviesApi(genre_ids).then((respuesta)=>{
      setGeneros(respuesta);
    });
  }, []);

  const onNavigation = () => {
    navigation.navigate("movie",{ id }); // parametro id para saber que peli viene por props
  }

  //  onPress={onNavigation} se va a utilzar para poder hacer click en las pelis y que navegue a una screen para los detalles de la misma en Movie.js
  return(
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri:imageUrl}} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.generos}>
          {generos && 
            map(generos, (gen, index) => (
              <Text key={index} style={styles.genero} >
                  {gen}{index !== size(generos)-1 && ', '}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


// Estilado de la tarjeta, imagen de la peli, el titulo y otras cosas necesarias
const styles = StyleSheet.create({
    card: {
      shadowColor: "#000",
      shadowOffset:{
        width: 0,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    image:{
      width: "100%",
      height: 450,
      borderRadius: 20
    },
    title: {
      marginHorizontal: 10,
      marginVertical: 10,
    },
    generos: {
      flexDirection: "row",
      marginHorizontal: 10,
    },
    genero: {
      fontSize: 12,
      color: "#8997a5",
    },
});