import '../css/App.css';
import React, { Fragment, useEffect } from 'react';
import Row from './Row';
import Banner from './Banner';
import Navbar from './Navbar';
import { requests } from '../components/requests/requests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const Notification = () =>
    toast.dark(`Bienvenido a FakeFlix! Por Jose Padilla ${new Date().getFullYear()}`, {
      autoClose: 7000,
    });

  useEffect(() => {
    Notification();
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <Banner fetchUrl={requests.fetchNetflixOriginals} />
      <Row
        title='Originales de Fakeflix'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='Tendencias' fetchUrl={requests.fetchTrending} />
      <Row title='Mejor Valoradas' fetchUrl={requests.fetchTopRated} />
      <Row title='Accion' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedia' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentales' fetchUrl={requests.fetchDocumentaries} />
      <Fragment>
        <ToastContainer style={{ width: '375px' }} />
      </Fragment>
    </div>
  );
}

export default App;
