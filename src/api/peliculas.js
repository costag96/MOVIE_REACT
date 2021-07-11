import {API_KEY, API_HOST, LANG} from "../utils/constants";

// En peliculas.js se van a crear todas las peticiones y funciones que tenga que ver con las peliculas y la llamada a la api de TMDB, es como modularizar o seccionar para escalar
// luego en las screens se importa el peliculas.js y podemos llamar a estos metodos, dejandonos un codigo mas limpio dentro de los screens.


//funcion que trae las pelis mas nuevas, recibe una pagina por defecto, porque recibe muchas y parte de los parametros de la apiurl son las paginas 
// se usa un fetch normal, retornando una promesa, en el .then con la respuesta tenemos todos los datos recibidos de la api para usarlos luego.
export function getNewsMoviesApi(page=1){
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  
  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

// Devuelve los generos de las pelis que les pasemos por id, lo que hace es buscar en las peliculas las que coincida con el genero
// pasado por parametro y las guarda en un array, se necesitan 2 bucles, uno que guarde los id de los generos y otro que recorra ese array para poder guardar en otro los nombres
export function getGenerosMoviesApi(idGenero){
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  
  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    const arrayGeneros = [];
    idGenero.forEach((id) => {
      resultado.genres.forEach((item) => {
        if(item.id === id) arrayGeneros.push(item.name);
      });
    });
    return arrayGeneros;
  });
}


// Devuelve una lista de todos los generos disponibles para las peliculas, lo devuelve en un json con id genero y nombre
export function getTodoGenerosMoviesApi(){
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  
  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}


// Devuelve peliculas por genero seleecionado (id), utilizado en la home para el seleccionador de pelis por genero
export function getMoviesByGenreApi(idGenres){
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;
 
  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

// Devuelve  una pelicula por ID pasado por parametro, esto va a servir para el screen Movie, al pinchar sobre una peli para mas info
export function getMovieByIdApi(idMovie){
  const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}

export function getPopularMovieApi(page=1){
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}
// Devuelve un json de peliculas por nombre donde search es el nombre de la peli, va a renderizar dinamicamente, esta funcion la va a usar el Screen de Search
export function searchMoviesApi(search){
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;

  return fetch(url)
  .then((respuesta)=>{
    return respuesta.json();
  })
  .then((resultado)=>{
    return resultado;
  });
}