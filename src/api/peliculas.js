import {API_KEY, API_HOST, LANG} from "../utils/constants";


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