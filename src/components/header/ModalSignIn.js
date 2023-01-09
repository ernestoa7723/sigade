import React, {Component} from "react";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
}

class ModalSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }


    render() {
        const handleChanges = (value, property) => {
            let state = {};
            state[property] = value;
            this.setState(state);
        }

        const handleSubmit = (event) => {
            if (this.props.api_connection) {

            } else {
                event.preventDefault()

                this.props.data.User.forEach(
                    user => {
                        if (this.state.username === user.username) {
                            if (this.state.password === user.password) {
                                setUser(user)

                                let modal = document.getElementById('sign-in-modal')
                                let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

                                modal.setAttribute('style', 'display: none;')
                                modal_backdrop[0].remove()

                            } else {
                                this.setState({error: 'El nombre de usuario y/o contraseña es incorrecto.'})
                            }
                        } else {
                            this.setState({error: 'El nombre de usuario y/o contraseña es incorrecto.'})
                        }
                    }
                )
            }
        }

        const error = () => {
            if (this.state.error !== null) {
                return (
                    <div className="text-danger text-center mb-3">
                        {this.state.error}
                    </div>
                )
            }
        }

        return (
            <div className="modal fade" id="sign-in-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="sign-in-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="sign-in-label">Iniciar sesión</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            { error() }
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingUsername" placeholder="Nombre de usuario" required onChange={(event) => {handleChanges(event.target.value, 'username')}}></input>
                                <label htmlFor="floatingUsername">Nombre de usuario</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control mt-3 " id="floatingPassword" placeholder="Contraseña" required onChange={(event) => {handleChanges(event.target.value, 'password')}}></input>
                                <label htmlFor="floatingPassword">Contraseña</label>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSignIn
