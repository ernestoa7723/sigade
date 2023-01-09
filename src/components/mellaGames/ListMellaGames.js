import React, {Component} from "react";
import {Link} from "react-router-dom";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import ListMellaGamesTableData from "./ListMellaGamesTableData";
import ModalMellaGame from "./ModalMellaGame";
import ModalDelete from "../ModalDelete";

class ListMellaGames extends Component {
    render() {
        const addMellaGameModal = () => {
            if (this.props.user !== null) {
                return (
                    <div className="col-auto ms-auto my-auto">
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-mella-game-modal">Añadir</button>
                        <ModalMellaGame data={this.props.data.Faculty} id={'add-mella-game-modal'} obj={null} api_connection={this.props.api_connection} />
                    </div>
                )
            }
        }

        const changeMellaGameModal = (index, mella_game) => {
            if (this.props.user !== null) {
                return (
                    <div className="col text-center">
                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={'#change-mella-game-modal-'.concat(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <ModalMellaGame data={this.props.data.Faculty} id={'change-mella-game-modal-'.concat(index)} obj={mella_game} api_connection={this.props.api_connection} />
                    </div>
                )
            }
        }

        const deleteMellaGameModal = (index, mella_game) => {
            if (this.props.user !== null) {
                return (
                    <div className="col text-center">
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#delete-mella-game-modal-'.concat(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                        <ModalDelete id={'delete-mella-game-modal-'.concat(index)} model={'MellaGame'} obj={mella_game} api_connection={this.props.api_connection} />
                    </div>
                )
            }
        }

        return (
            <main className="flex-shrink-0">
                <div className="container p-3">
                    <div className="row">
                        <div className="d-flex col-auto mb-2">
                            <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/brands/bootstrap.svg" width="50" height="50" alt="" className="me-2"></img>
                            <h1 className="m-0">Juegos Mella</h1>
                        </div>
                        { addMellaGameModal() }
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col" width="10%">Año</th>
                                <th scope="col">Primer lugar</th>
                                <th scope="col">Segundo lugar</th>
                                <th scope="col">Tercer lugar</th>
                                <th scope="col" width="35%">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    this.props.data.MellaGame.map(
                                        (mella_game, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{mella_game.year}</td>
                                                    <ListMellaGamesTableData mella_game={mella_game} position={1} />
                                                    <ListMellaGamesTableData mella_game={mella_game} position={2} />
                                                    <ListMellaGamesTableData mella_game={mella_game} position={3} />
                                                    <td>
                                                        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-1 justify-content-evenly mx-0">
                                                            <div className="col text-center">
                                                                <Link to={`/juegos-mella/${mella_game.id}/`} className="btn btn-primary">
                                                                    <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/solid/trophy-white.svg" width="24" height="24" alt=""></img>
                                                                </Link>
                                                            </div>
                                                            <div className="col text-center"><Link to={`/deportes/?juegos-mella=${mella_game.year}`} className="btn btn-primary">
                                                                <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/solid/futbol-white.svg" width="24" height="24" alt=""></img>
                                                            </Link></div>
                                                            <div className="col text-center">
                                                                <Link to={`/eventos/?juegos-mella=${mella_game.year}`} className="btn btn-primary">
                                                                    <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/solid/calendar-day-white.svg" width="24" height="24" alt=""></img>
                                                                </Link>
                                                            </div>
                                                            { changeMellaGameModal(index, mella_game) }
                                                            { deleteMellaGameModal(index, mella_game) }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        )
    }
}

export default ListMellaGames
