import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import axios from "axios";

import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import Header from "./header/Header";
import ModalSignIn from "./header/ModalSignIn"
import Footer from "./Footer";

import Main from "./Main";

import ListMellaGames from "./mellaGames/ListMellaGames";
import ListSports from "./sports/ListSports";
import ListEvents from "./events/ListEvents";

import ListFaculties from "./faculties/ListFaculties"
import ListUsers from "./users/ListUsers";

import DetailMellaGame from "./mellaGames/DetailMellaGame";
import DetailSport from "./sports/DetailSport";

function getUser() {
    let userString = sessionStorage.getItem('user')

    return JSON.parse(userString)
}

function App() {
    const [state, setState] = useState();

    const api_connection = false

    useEffect(() => {
        if (api_connection) {
            const getDataMellaGame = async () => {
                const response = await axios.get('http://127.0.0.1:8080/mella-games/')
                state['MellaGame'] = await response.data
            }
            const getDataSport = async () => {
                const response = await axios.get('http://127.0.0.1:8080/sports/')
                state['Sport'] = await response.data
            }
            const getDataEvent = async () => {
                const response = await axios.get('http://127.0.0.1:8080/events/')
                state['Event'] = await response.data
            }
            const getDataFaculty = async () => {
                const response = await axios.get('http://127.0.0.1:8080/faculties/')
                state['Faculty'] = await response.data
            }
            const getDataUser = async () => {
                const response = await axios.get('http://127.0.0.1:8080/users/')
                state['User'] = await response.data
            }

            getDataMellaGame()
            getDataSport()
            getDataEvent()
            getDataFaculty()
            getDataUser()

            setState(state)
        } else {
            const getData = async () => {
                const response = await axios.get('http://127.0.0.1:3000/data.json')
                const data = await response.data
                setState(data)
            }
            getData()
        }
    }, [state]);

    let user = getUser()

    return state && (
        <div className="d-flex flex-column h-100">
            <BrowserRouter>
                <Header user={user} />
                <ModalSignIn data={{User: state.User}} user={user} api_connection={api_connection} />
                <Routes>
                    <Route exact path='/' element={<Main user={user} />}></Route>

                    <Route exact path='/juegos-mella/' element={<ListMellaGames data={{Faculty: state.Faculty, MellaGame: state.MellaGame}} user={user} api_connection={api_connection} />}></Route>
                    <Route exact path='/juegos-mella/:id/' element={<DetailMellaGame data={state.MellaGame} user={user} api_connection={api_connection} />}></Route>

                    <Route exact path='/deportes/' element={<ListSports data={{Faculty: state.Faculty, MellaGame: state.MellaGame, Sport: state.Sport}} user={user} api_connection={api_connection} />}></Route>
                    <Route exact path='/deporte/:id/' element={<DetailSport data={state.Sport} user={user} api_connection={api_connection} />}></Route>

                    <Route exact path='/eventos/' element={<ListEvents data={{MellaGame: state.MellaGame, Sport: state.Sport, Event: state.Event}} user={user} api_connection={api_connection} />}></Route>

                    <Route exact path='/facultades/' element={<ListFaculties data={state.Faculty} user={user} api_connection={api_connection} />}></Route>

                    <Route exact path='/usuarios/' element={<ListUsers data={state.User}  user={user} api_connection={api_connection} />}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
