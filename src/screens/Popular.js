import React,{ useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableWithoutFeedback} from 'react-native';
import { Title, Text, Button } from "react-native-paper";
import { map } from "lodash";
import {getPopularMovieApi} from "../api/peliculas"
import { BASE_PATH_IMG } from "../utils/constants"
import noImage from "../assets/png/default-image.png"
import { Rating } from "react-native-ratings";

export default function Popular(props){
  const{ navigation } = props
  const[movies,setMovies] = useState(null);
  const[showButton,setShowButton] = useState(true);
  const[page,setPage] = useState(1);

  useEffect(() => {
    getPopularMovieApi(page).then((response) => {
      const totalPages = response.total_pages;
      if ( page < totalPages ){
        if(!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results])
        }
      }else {
        setShowButton(false);
      }
    });
  }, [page]);

  return(
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie key={index} movie={movie} navigation={navigation}/>
      ))}
    {showButton && 
    <Button
      mode="contained"
      contentStyle={styles.loadContained}
      style={styles.loadButton}
      labelStyle={{ color: "#fff"}}
      onPress={() => setPage(page + 1)}
    >
      Cargar mas...
    </Button>}
    </ScrollView>
  );
}

function Movie(props){
  const { movie, navigation } = props;
  const { id, poster_path, title, release_date, vote_count, vote_average } = movie;

  const goMovie = () =>{
    navigation.navigate("movie",{ id });
  }

  return(
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.lateralizq}>
          <Image 
            style={styles.image}
            source={
              poster_path ? { uri: `${BASE_PATH_IMG}/w500${poster_path}`} : noImage 
            }
          />
        </View>
        <View>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating voteCount={vote_count} voteAverage={vote_average} />
        </View>
      </View> 
    </TouchableWithoutFeedback>
  );
}

function MovieRating(props){
  const {voteCount, voteAverage} = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating 
        type="star"
        ratingColor="#ffc205"
        ratingBackgroundColor="#192734"
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15}} 
      />
      <Text style={{fontSize: 15, color: "#8697a5", marginTop: 5}}>{voteCount} votos </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  movie:{
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  lateralizq:{
    marginRight: 20,
  },
  image:{
    width: 100,
    height: 150,
  },
  viewRating:{
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  loadContained:{
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadButton:{
    backgroundColor: "transparent",
  },
});