import { API_URL, ATLAS_API_HOST } from "../utils/constants";
import {getMovieByIdApi} from "./peliculas";

export async function registerApi(formData) {
    // try {
    //     const url = `${API_URL}/user`;
    //     const params = {
    //         method : "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //     };
    //     const response = await fetch(url, params);
    //     const result = await response.json();
    //     return result;
    // } catch (error) {
    //     return null;
    // }
    const url = `${API_URL}/user`;
        const params = {
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
    };
    return await fetch(url, params)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

export async function loginApi(formData) {
    try{
    const url = `${API_URL}/auth/login`;
        const params = {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
    };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
    // return await fetch(url, params)
    //     .then((respuesta) => {
    //         return respuesta.json();
    //     })
    //     .then((data) => console.log(data))
    //     .catch((error) => console.log(error))    
}

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

export function addMovieToFavApi(data){
  const url = `${ATLAS_API_HOST}/user/movies/addmovie`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUzOWZmMmViNzM3MjM4MmM0ZGQ5ZTkiLCJpYXQiOjE2MjYwNTM0MTcsImV4cCI6MTYyODczMTgxN30.5HDKFJjXHsH5eIgsGYsCcD4JEIEMqBjDnQsPXHKCDAc"
    },
    body: JSON.stringify(data)
  }
  
  return fetch(url,params)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

export function deleteMovieToFavApi(data){
  const url = `${ATLAS_API_HOST}/user/movies/deletemovie/`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUzOWZmMmViNzM3MjM4MmM0ZGQ5ZTkiLCJpYXQiOjE2MjYwNTM0MTcsImV4cCI6MTYyODczMTgxN30.5HDKFJjXHsH5eIgsGYsCcD4JEIEMqBjDnQsPXHKCDAc"
    },
    body: JSON.stringify(data)
  }
  
  return fetch(url,params)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

export function getMoviesApi(USER_ID="60e39ff2eb7372382c4dd9e9"){
  const url = `${ATLAS_API_HOST}/user/movies/getmovies/${USER_ID}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUzOWZmMmViNzM3MjM4MmM0ZGQ5ZTkiLCJpYXQiOjE2MjYwNTM0MTcsImV4cCI6MTYyODczMTgxN30.5HDKFJjXHsH5eIgsGYsCcD4JEIEMqBjDnQsPXHKCDAc"
    }
  }

  return fetch(url,params)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

