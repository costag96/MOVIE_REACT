import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Title,Text} from "react-native-paper";
import {getMovieByIdApi} from "../api/peliculas";
import {BASE_PATH_IMG} from "../utils/constants";
import { map } from 'lodash';
import { Rating } from "react-native-ratings";

export default function Movie(props){
  const { route } = props;
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieByIdApi(id).then((response) => {
      setMovie(response);
    });
  }, []);

  if (!movie) return null;
  return(
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage poster={movie.poster_path} />
        <MovieTitle movie={movie} />
        <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average} />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {marginBottom: 30}]}>Fecha de Lanzamiento: {movie.release_date}</Text>
        <Text>Reviews: FALTA</Text>
      </ScrollView>
    </>
  );
}
function MovieImage(props) {
  const { poster } = props

  return (
    <View style={styles.moviePoster}>
      <Image style={styles.movieImage} source={{ uri: `${BASE_PATH_IMG}/w500${poster}` }} />
    </View>
  )
}

function MovieTitle(props){
  const { movie } = props;

  return(
    <View style={styles.movieInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.movieGenres}>
        {map(movie.genres, (genre)=>(
          <Text key={genre.id} style={styles.genreText}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  )
}

function MovieRating(props){
  const { voteCount, voteAverage } = props;
  const media = voteAverage / 2;
  
  return(
    <View style={styles.movieRating}>
      <Rating 
      type="custom"
      ratingColor="#ffc205"
      ratingBackgroundColor="#192734"
      startingValue={media}
      imageSize={20}
      style={{ marginRight: 15}} 
    />
    <Text style={{fontSize: 16, marginRight: 5}}>{media}</Text>
    <Text style={{fontSize: 12, color:"#8697a5"}}>{voteCount} votos</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  moviePoster:{
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  movieImage:{
    width: "100%",
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  movieInfo:{
    marginHorizontal: 30,
  },
  movieGenres:{
    flexDirection: "row",
  },
  genreText:{
    marginRight: 20,
    color: "#8697a5",
  },
  movieRating:{
    marginHorizontal:30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  overview:{
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: "justify",
    color: "#8697a5"
  },
})