import React, {Component} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalFaculty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',

            wasInit: false
        }
    }

    render() {
        const handleChanges = (value, property) => {
            let state = {};
            state[property] = value;
            this.setState(state);
        }

        const handleSubmit = (event) => {
            event.preventDefault()

            let new_obj = {
                name: this.state.name
            }

            if (this.state.wasInit) {
                // TODO axios patch http://127.0.0.1:8080/faculties/ obj.id
                if (this.props.api_connection) {
                    async function updateObj() {
                        let url = "http://127.0.0.1:8080/faculties/".concat(this.props.obj.id.toString())

                        const response = axios.put(url, new_obj)
                        console.log(response)
                    }

                    updateObj()
                } else {
                    console.log(new_obj)
                }
            } else {
                // TODO axios post http://127.0.0.1:8080/faculties/
                if (this.props.api_connection) {
                    async function createObj() {
                        let url = "http://127.0.0.1:8080/faculties/"

                        const response = axios.post(url, new_obj)
                        console.log(response)
                    }

                    createObj()
                } else {
                    console.log(new_obj)
                }
            }

            let modal = document.getElementById(this.props.id)
            let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

            modal.setAttribute('style', 'display: none;')
            modal_backdrop[0].remove()
        }

        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = this.state
            let wasInit = true

            state['name'] = this.props.obj['name']

            state['wasInit'] = wasInit
            this.setState(state)
        }

        const title = () => {
            if (!this.state.wasInit) {
                return <span>Añadir Facultad</span>
            } else {
                return <span>{this.props.obj.name}</span>
            }
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="faculty-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="faculty-label">{ title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => handleSubmit(event)}>
                                <div className="form-floating">
                                    <input type="text" required className="form-control" id={'floatingName'} autoComplete="disable" placeholder="Nombre" value={this.state.name} onChange={(event) => {handleChanges(event.target.value, 'name')}}></input>
                                    <label htmlFor={'floatingName'}>Nombre</label>
                                </div>
                                <div className="mt-3 text-end">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalFaculty
