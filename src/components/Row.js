import '../css/row.css';
import React, { useState, useEffect } from 'react';
import { instance as axios } from '../components/requests/axios-config';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const imgUrl = 'https://image.tmdb.org/t/p/original/';

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      //Busca trailer en youtube basado en el nombre
      movieTrailer(
        movie?.name || movie?.original_title || movie?.original_name || movie?.title
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((err) => {
          console.log('Pelicula no encontrada');
        });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(fetchUrl);
        setMovies(res.data.results);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getData();
  }, [fetchUrl]);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__poster__large'}`}
            key={movie.id}
            src={`${imgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <Youtube
          videoId={trailerUrl}
          opts={{
            height: '390',
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      )}
    </div>
  );
}

export default Row;
