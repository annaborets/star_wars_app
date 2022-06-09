import React from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { PeoplePage, PlanetsPage, FilmsPage, StarShipsPage, SpeciesPage, VehiclesPage } from '../../Pages'
import { PersonDetails, PlanetDetails, FilmDetails, StarshipsDetails, SpeciesDetails, VehiclesDetails } from '../ItemDetails'

import './App.scss'


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='mainCont'>
                    <Header />

                    <Routes className='main'>
                        <Route path='/' element={<Main />} />

                        <Route path="people" element={<PeoplePage />} />
                        <Route path="people/:id" element={<PersonDetails />} />

                        <Route path="planets" element={<PlanetsPage />} />
                        <Route path="planets/:id" element={<PlanetDetails />} />

                        <Route path="films" element={<FilmsPage />} />
                        <Route path="films/:id" element={<FilmDetails />} />

                        <Route path="starships" element={<StarShipsPage />} />
                        <Route path="starships/:id" element={<StarshipsDetails />} />

                        <Route path="vehicles" element={<VehiclesPage />} />
                        <Route path="vehicles/:id" element={<VehiclesDetails />} />

                        <Route path="Species" element={<SpeciesPage />} />
                        <Route path="Species/:id" element={<SpeciesDetails />} />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                    <Footer className='footer' />
                </div>
            </Router>
        );
    }

};
export default App