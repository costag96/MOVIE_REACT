import React,{ useState, useEffect }from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions, Platform, ScrollView} from 'react-native';
import {searchMoviesApi} from "../api/peliculas"
import { Searchbar } from "react-native-paper"
import { size, map } from "lodash";
import {BASE_PATH_IMG} from "../utils/constants"

const { width } = Dimensions.get("window");

// Esta Screen utiliza el searchMoviesApi de Movies.js, se hace el seteo donde guarda el array y tambien el useEffect para poder hacer uso de la funcion, con un if de refresco minimo a 2 letras
// Utiliza el componente Searchbar, donde colocara todo lo que tiene que ver con el buscador y abajo un Scrollview donde hace un map con lodash de lo que venga en movies del setState para poder
// dibujar el componente Movie que se arma mas abajo como funcion subcomponente, sacando por props cada elemento del map,

export default function Search(props){
  const {navigation} = props;
  const[movies,setMovies] = useState(null);
  const[search,setSearch] = useState("");

  useEffect(() => {
    if(size(search)> 2){
      searchMoviesApi(search).then((response)=>{
        setMovies(response.results);
      });
    }
  }, [search])

  return(
    <SafeAreaView>
      <Searchbar 
      placeholder="Busca tu pelicula"
      iconColor= {Platform.OS === "ios" && "transparent"}
      icon="arrow-left"
      style={styles.input}
      onChangeText={(e) => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
         {map(movies, (movie,index)=>(
           <Movie key={index} movie={movie} navigation={navigation} />
         ))}
        </View>
      </ScrollView>   
    </SafeAreaView>
  );
}

function Movie(props){
  const {movie, navigation} = props;
  const {id, title, poster_path} = movie;

  const goMovie = () =>{
    navigation.navigate("movie",{ id });
  }

  return(
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{ uri : `${BASE_PATH_IMG}/w500${poster_path}`}}/>
        ) : <Text>{title}</Text>}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  input:{
    marginTop: -3,
    backgroundColor: "#15212b",
  },
  container:{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  movie:{
    width: width / 2,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: "100%",
    height: "100%",
    alignItems: "center",
  }
})