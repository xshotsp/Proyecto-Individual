import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";
export const ORDER_RATING = "ORDER_RATING";
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES";
export const RESET_SEARCH = "RESET_SEARCH";
export const RESET_VIDEOGAMES = "RESET_VIDEOGAMES";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      let allResults = [];
      let currentPage = 1;
      const gamesPerPage = 15;
      const maxGames = 100;

      
      while (currentPage <= Math.ceil(maxGames / gamesPerPage)) {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=1be5de2656ee4bd488a4b8248b6e8343&page=${currentPage}`
        );

        const remainingGames = maxGames - allResults.length;
        const gamesToAdd = Math.min(gamesPerPage, remainingGames);

       
        allResults = allResults.concat(response.data.results.slice(0, gamesToAdd));

        if (allResults.length >= maxGames) {
          break; 
        }

        currentPage++;
      }

      dispatch({ type: GET_VIDEOGAMES, payload: allResults });
    } catch (error) {
      console.error("Error al obtener videojuegos:", error);
      
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://api.rawg.io/api/genres?key=1be5de2656ee4bd488a4b8248b6e8343");
      dispatch({ type: GET_GENRES, payload: response.data.results });
    } catch (error) {
      console.error("Error al obtener géneros:", error);
      
    }
  };
};
export const filterVideogames = (value) => {
  return { type: FILTER_VIDEOGAMES, payload: value };
};

export const filterByGenre = (value) => {
  return { type: FILTER_BY_GENRE, payload: value };
};

export const orderVideogames = (value) => {
  return { type: ORDER_VIDEOGAMES, payload: value };
};

export const orderRating = (value) => {
  return { type: ORDER_RATING, payload: value };
};
export const searchVideogames = (value) => {
  return async (dispatch, getState) => {
    try {
      // Realizar la búsqueda solo si el valor no está vacío
      if (value !== "") {
        const response = await axios.get(`/videogames?name=${value}`);
        // Verificar si los juegos ya existen en el estado antes de agregarlos
        const existingGames = getState().videogames || [];
        const uniqueGames = response.data.filter(
          (game) => !existingGames.some((existingGame) => existingGame.id === game.id)
        );
        dispatch({ type: SEARCH_VIDEOGAMES, payload: uniqueGames });
      }
    } catch (error) {
      console.error("Error en la búsqueda de videojuegos:", error);
      window.alert("No hay resultados que coincidan con la búsqueda");
    }
  };
};


export const resetSearch = () => {
  return { type: RESET_SEARCH };
};

export const resetVideogames = () => {
  return { type: RESET_VIDEOGAMES };
};

export const deleteVideogame = (id) => {
  return { type: DELETE_VIDEOGAME, payload: id };
};
