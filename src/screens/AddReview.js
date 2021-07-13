import React, { useState, useEffect } from 'react';
import {View, StyleSheet,ScrollView, Image, Alert} from 'react-native';
import {Title,Text,TextInput, Button} from "react-native-paper";
import {getMovieByIdApi} from "../api/peliculas";
import {BASE_PATH_IMG} from "../utils/constants";








export default function AddReview({route}){

   const  [revText, setRevText] = useState('');
   const [score, setScore ] = useState('');
   const {movie} = route.params;
     
return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Poster poster={movie.poster_path}/>
        <Title style = {styles.movietitle}>{movie.title}</Title>
        <TextInput mode = "outlined" placeholder = "Input Review" style={styles.review}
         value = {revText} onChangeText = {text => setRevText(text)}/>
        <TextInput placeholder = "Enter Rating (1-5)" keyboardType = "numeric" style={[styles.genText, {marginTop: 30}, {marginBottom: 30}]}
        value = {score} onchangeText = {text => setScore(text)}/>
        <Button mode = "contained" icon="content-save-outline" mode="contained" onPress={() => {
            (validateForm(revText, score)) ? console.log('API CALL') : console.log('Invalidated') 
        }}>
            Save
        </Button>
      </ScrollView>
    </>


)
}

function validateForm (revText, score){

    let success = false;

    const myScore = Number(score);

            if (revText == null || revText.length < 4){
                console.log('Error1');
                Alert.alert('OOPS', 'Las reviews deben tener mas de 4 chars', 
                [{text: 'Ok', onPress: () => console.log({revText})}
                ]);
                return success;
            }
            if (myScore < 1 || myScore > 5 || myScore == NaN){
                console.log('Error2');
                return success;
            }
            console.log('Sucess');    
            sucess = true;
            return success;
            
}

function Poster(props){

    const {poster} = props;

    return (
        <View style={styles.moviePoster}>
            <Image style={styles.movieImage} source = {{uri: `${BASE_PATH_IMG}/w300${poster}`}}/>
        </View>    
    )

}

function buildSchema(text, score){

    
    //get idUser

    const myReview = {
        "text": text,
        "score": score,  
        "idPelicula": movie.id, //Validar si ese es el key a acceder
        "idUser": '', //Traer de algun lado
        "movieImg": movie.poster_path
    };  

    return myReview
}


const styles = StyleSheet.create({

    genText: {
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: "justify",
        color: "#8697a5",
    },
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
      movietitle: {
          marginHorizontal: 30,
      },
      review: {
        height: 80,
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: "justify",
        color: "#8697a5",
        
      }

})