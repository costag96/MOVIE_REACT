import React,{useState, useEffect} from 'react';
import {View,Text, ScrollView, StyleSheet} from 'react-native';
import {getNewsMoviesApi, getTodoGenerosMoviesApi, getMoviesByGenreApi} from "../api/peliculas";
import {Title} from "react-native-paper";
import {map} from "lodash";
import CarouselVertical from "../components/CarouselVertical";
import CarouselGenre from "../components/CarouselGenre";

export default function Home(props){
  const { navigation } = props;
  const [newMovies,setNewMovies] = useState(null);
  const [listaDeGeneros, setlistaDeGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(18);
  const [peliculasPorGenero, setPeliculasPorGenero] = useState(null);

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