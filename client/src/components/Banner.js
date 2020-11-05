import '../css/banner.css';
import React, { useEffect, useState } from 'react';
import { instance as axios } from './requests/axios-config';

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState({});
  const imgUrl = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(fetchUrl);
        let randomMovieId = Math.floor(Math.random() * res.data.results.length);
        setMovie(res.data.results[randomMovieId]);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getData();

    setInterval(() => {
      getData();
    }, 15000);
  }, [fetchUrl]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${imgUrl}${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Ver</button>
          <button className='banner__button'>Mi Lista</button>
        </div>
        <h1 className='banner__decription'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner__fadeBottom' />
    </header>
  );
}

export default Banner;
