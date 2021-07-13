import {getMovieByIdApi} from "./peliculas";
import {ATLAS_API_HOST} from "../utils/constants";


export function getUserApi(){
 //body fetch del login trae Usuario
  }

  export function getFriends(){
    const usuario = getUserApi();
    const  {_id} = usuario;

    const url = `${ATLAS_API_HOST}user/friend/getfriends/${_id}`
    
    return fetch(url)
    .then((respuesta)=>{
      return respuesta.json();
    })
    .then((resultado)=>{
      return resultado;
    });
  }


    function getMoviesIdUsuario(){
    const usuario = getUserApi();
    const  {movies} = usuario;
    return movies

  }

  export function getMoviesUsuario(){
      const moviesId = getMoviesIdUsuario();
      let movies = [];

      for (let i = 0; i < moviesId.length; i++){
        const movie = getMovieByIdApi(moviesId[i]);
        movies.push(movie);

      }
      return movies;

  }

