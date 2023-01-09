import React, {Component} from "react";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import ModalFaculty from "./ModalFaculty";
import ModalDelete from "../ModalDelete";

class ListFaculties extends Component {
    render () {
        if (this.props.user === null) {
            return (
                <main className="flex-shrink-0">
                    <div className="container p-3 fs-1 text-center">
                        <p>Ups!</p>
                        <p>¯ \ _ (ツ) _ / ¯</p>
                        <p>No hay nada para mostrar.</p>
                    </div>
                </main>
            )
        }

        return (
            <main className="flex-shrink-0">
                <div className="container p-3">
                    <div className="row">
                        <div className="col-auto">
                            <h1>Facultades</h1>
                        </div>
                        <div className="col-auto ms-auto my-auto">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-faculty-modal">Añadir</button>
                            <ModalFaculty id={'add-faculty-modal'} obj={null} api_connection={this.props.api_connection} />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                this.props.data.map(
                                    (faculty, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ faculty.name }</td>
                                                <td>
                                                    <div className="row row-cols-3 g-1 mx-0">
                                                        <div className="col text-center">
                                                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={'#change-faculty-modal-'.concat(index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                                </svg>
                                                            </button>
                                                            <ModalFaculty id={'change-faculty-modal-'.concat(index)} obj={faculty} api_connection={this.props.api_connection} />
                                                        </div>
                                                        <div className="col text-center">
                                                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#delete-faculty-modal-'.concat(index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                                </svg>
                                                            </button>
                                                            <ModalDelete id={'delete-faculty-modal-'.concat(index)} model={'Faculty'} obj={faculty} api_connection={this.props.api_connection} />
                                                        </div>
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

export default ListFaculties
