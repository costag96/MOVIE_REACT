import {ATLAS_API_HOST} from "../utils/constants";


export function getUserApi(){
    const url = `${ATLAS_API_HOST}auth/login`
    
    return fetch(url)
    .then((respuesta)=>{
      return respuesta.json();
    })
    .then((resultado)=>{
      return resultado;
    });
  }