import React,{useState, useEffect} from 'react';
import {View,Text, ScrollView, StyleSheet} from 'react-native';
import {getNewsMoviesApi, getTodoGenerosMoviesApi, getMoviesByGenreApi} from "../api/peliculas";
import {Title} from "react-native-paper";
import {map} from "lodash";
import CarouselVertical from "../components/CarouselVertical";
import CarouselGenre from "../components/CarouselGenre";

// El useState se encargará de guardar nuestras pelis  encontradas  y lo que necesitemos  como Array
export default function Home(props){
  const { navigation } = props;
  const [newMovies,setNewMovies] = useState(null);
  const [listaDeGeneros, setlistaDeGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(18);
  const [peliculasPorGenero, setPeliculasPorGenero] = useState(null);

  // El useEffect generará nuestra peticion la cual siempre la generamos en movies.js (llamadas a la api), dicha la devuelve como promesa, se resuelve con async aw, o con .then
  // y la setea en los setState que declaremos (es como si la llenara), en estos casos, para todos los useState va a ser lo mismo, no reutilizamos los useEffect para poder atomizar y modularizar
  useEffect(() => {
    getNewsMoviesApi().then((data)=>{
      setNewMovies(data.results);
    });
  }, []);

  useEffect(() => {
    getTodoGenerosMoviesApi().then((r)=>{
      setlistaDeGeneros(r.genres);
    });
  }, []);

  useEffect(() => {
    getMoviesByGenreApi(generoSeleccionado).then((r)=>{
      setPeliculasPorGenero(r.results);
    })
  }, [generoSeleccionado]);

  const onChangeGenero = (idGenero) => {
    setGeneroSeleccionado(idGenero);
  }

// si newMvoies(la del setState), tiene contenido se renderiza una vista con el contenido que querramos, aca estará el componente carrusel donde estaran nuestras pelis
// donde por props va a ir todo el contenido que  tengamos en los setState y lo pasamos como data para que el componente lo dibuje.

// la Home tendra aparte del carrusel de pelis Nuevas, todo un View con peliculas por genero para poder acceder haciendo click en el genero seleccionado, donde apareceran
// peliculas con un scroll horizontal, para ello se traera primero una lista de generos a exponer (setlistaDeGeneros) y las pelis por genero (setPeliculasPorGenero), va a estar dentro de otro carrusel llamado Carouselgenere
// en peliculasPor genero se guardaran las pelis a pasar por props al carrousel de p. por genero para que las dibuje 
  return(
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newstitle}>Nuevas Peliculas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      ) }
      <View style={styles.moviegeneros}>
        <Title style={styles.titulogeneros}>Peliculas por genero</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listageneros}>
          {map(listaDeGeneros, (genero) => (
            <Text 
            key={genero.id} 
            style={[styles.textogenero, { color : genero.id !== generoSeleccionado ? "#8697a5" : "#fff"}]}
            onPress={() => onChangeGenero(genero.id)}>
              {genero.name}
            </Text>
          ))}
        </ScrollView>
        {peliculasPorGenero && (
          <CarouselGenre data={peliculasPorGenero} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    news:{
      marginVertical: 10,
    },
    newstitle:{
      marginBottom: 15,
      marginHorizontal: 20,
      fontWeight: "bold",
      fontSize: 22,
    },
    moviegeneros:{
      marginTop: 20,
      marginBottom: 50,
    },
    titulogeneros:{
      marginHorizontal: 20,
      fontWeight: "bold",
      fontSize: 22,
    },
    listageneros:{
      marginTop: 5,
      marginBottom: 15,
      padding: 10,
      paddingHorizontal: 20
    },
    textogenero:{
      marginRight: 20,
      fontSize: 16,
    },
});