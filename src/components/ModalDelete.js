import React, {Component} from "react";
import axios from "axios";

class ModalDelete extends Component {
    render() {
        const title = () => {
            if (this.props.model === 'MellaGame') {
                return <span>Eliminar Juegos Mella {this.props.obj.year}</span>
            }
            if (this.props.model === 'Sport') {
                return <span>Eliminar {this.props.obj.name} {this.props.obj.modality} {this.props.obj.mella_game.year}</span>
            }
            if (this.props.model === 'Event') {
                return (
                    <span>
                        Eliminar
                        <br/>
                        {this.props.obj.sport.name} {this.props.obj.sport.modality} {this.props.obj.sport.mella_game.year} {this.props.obj.name}
                    </span>
                )
            }
            if (this.props.model === 'Faculty') {
                return <span>Eliminar {this.props.obj.name}</span>
            }
            if (this.props.model === 'User') {
                return <span>Eliminar {this.props.obj.username}</span>
            }
        }

        const confirmation = () => {
            if (this.props.model === 'MellaGame') {
                return 'Juegos Mella'.concat(' ').concat(this.props.obj.year)
            }
            if (this.props.model === 'Sport') {
                return this.props.obj.name.concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.mella_game.year)
            }
            if (this.props.model === 'Event') {
                return this.props.obj.sport.name.concat(' ').concat(this.props.obj.sport.modality).concat(' ').concat(this.props.obj.sport.mella_game.year).concat(' ').concat(this.props.obj.name)
            }
            if (this.props.model === 'Faculty') {
                return this.props.obj.name
            }
            if (this.props.model === 'User') {
                return this.props.obj.username
            }
        }

        const handleSubmit = (event) => {
            event.preventDefault()

            if (this.props.api_connection) {
                async function deleteObj() {
                    let url = ""

                    // TODO del http://127.0.0.1:8080/mella-games/ obj.id
                    if (this.props.model === 'MellaGame') {
                        url = "http://127.0.0.1:8080/mella-games/"
                    }

                    // TODO del http://127.0.0.1:8080/sports/ obj.id
                    if (this.props.model === 'Sport') {
                        url = "http://127.0.0.1:8080/sports/"
                    }

                    // TODO del http://127.0.0.1:8080/events/ obj.id
                    if (this.props.model === 'Event') {
                        url = "http://127.0.0.1:8080/events/"
                    }

                    // TODO del http://127.0.0.1:8080/faculties/ obj.id
                    if (this.props.model === 'Faculty') {
                        url = "http://127.0.0.1:8080/faculties/"
                    }

                    // TODO del http://127.0.0.1:8080/users/ obj.id
                    if (this.props.model === 'User') {
                        url = "http://127.0.0.1:8080/users/"
                    }

                    const response = await axios.delete(url.concat(this.props.obj.id.toString()))
                    console.log(response)
                }

                deleteObj()
            } else {
                console.log(this.props.obj)
            }

            let modal = document.getElementById(this.props.id)
            let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

            modal.setAttribute('style', 'display: none;')
            modal_backdrop[0].remove()
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-label')} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-label')}>{ title() }</h1>
                            <button type="button" className="btn-close mt-0 mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            <div className="text-start">
                                <p>
                                    ¿Está seguro que desea eliminar { confirmation() }?
                                    <br/>
                                    Los datos eliminados no se podrán recuperar.
                                </p>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-danger">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDelete
