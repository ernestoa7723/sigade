import React, {Component, createElement} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 1,

            firstName: '',
            lastName: '',
            username: '',
            email: '',

            sex: '',
            appointment: '',

            password: '',
            passwordConfirm: '',

            wasInit: false,

            errors: []
        }
    }

    render() {
        const handleChanges = (value, property) => {
            let state = {};
            state[property] = value;
            this.setState(state);
        }

        const validateForm = () => {
            let state = this.state
            let errors = []

            if (!this.state.wasInit) {
                if (this.state.password.length < 8) {
                    const message = 'La contraseña debe tener al menos 8 caracteres'
                    errors.splice(errors.length, 0, message)
                } else {
                    if (this.state.password !== this.state.passwordConfirm) {
                        const message = 'Las contraseñas no coinciden'
                        errors.splice(errors.length, 0, message)
                    }
                }
            }

            state['errors'] = errors
            this.setState(state)

            return this.state.errors.length === 0;
        }

        const handleSubmit = (event) => {
            event.preventDefault()

            if (validateForm()) {
                let new_obj = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email,
                    appointment: this.state.appointment,
                    sex: this.state.sex,
                }

                if (this.state.wasInit) {
                    // TODO axios patch http://127.0.0.1:8080/users/ obj.id
                    if (this.props.api_connection) {
                        async function updateObj() {
                            let url = "http://127.0.0.1:8080/users/".concat(this.props.obj.id.toString())

                            const response = axios.put(url, new_obj)
                            console.log(response)
                        }

                        updateObj()
                    } else {
                        console.log(new_obj)
                    }
                } else {
                    new_obj['password'] = this.state.password

                    // TODO axios post http://127.0.0.1:8080/users/
                    if (this.props.api_connection) {
                        async function createObj() {
                            let url = "http://127.0.0.1:8080/users/"

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
        }

        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = this.state
            let wasInit = true

            state['id'] = this.props.obj['id']

            state['firstName'] = this.props.obj['firstName']
            state['lastName'] = this.props.obj['lastName']
            state['username'] = this.props.obj['username']
            state['email'] = this.props.obj['email']
            state['sex'] = this.props.obj['sex']
            state['appointment'] = this.props.obj['appointment']

            state['wasInit'] = wasInit
            this.setState(state)
        }

        const title = () => {
            if (!this.state.wasInit) {
                return <span>Registrar usuario</span>
            } else {
                return <span>{this.props.obj.username}</span>
            }
        }

        const errors = () => {
            if (this.state.errors.length !== 0) {

                let errors = []

                for (let i = 0; i < this.state.errors.length; i++) {
                    errors.splice(i, 0, createElement('li', {key: i}, this.state.errors[i]))
                }

                return (
                    createElement('div', {className: "text-danger text-center mb-3"},
                        createElement('ul', {className: "list-unstyled"}, [
                            errors
                        ])
                    )
                )
            }
        }

        const appointmentStudent = () => {
            if (this.state.wasInit) {
                if (this.props.obj.appointment === 'Estudiante') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioStudent-'.concat(this.state.id)} value="Estudiante" checked onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioStudent-'.concat(this.state.id)} value="Estudiante" onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
        }

        const appointmentTeacher = () => {
            if (this.state.wasInit) {
                if (this.props.obj.appointment === 'Profesor') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioTeacher-'.concat(this.state.id)} value="Profesor" checked onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioTeacher-'.concat(this.state.id)} value="Profesor" onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
        }

        const appointmentAssociatedDean = () => {
            if (this.state.wasInit) {
                if (this.props.obj.appointment === 'Vicedecano') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioAssociateDean-'.concat(this.state.id)} value="Vicedecano" checked onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioAppointmentOptions-'.concat(this.state.id)} id={'inlineRadioAssociateDean-'.concat(this.state.id)} value="Vicedecano" onChange={(event) => {handleChanges(event.target.value, 'appointment')}}></input>
        }

        const sexMale = () => {
            if (this.state.wasInit) {
                if (this.props.obj.sex === 'Masculino') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.id)} id={'inlineRadioMan-'.concat(this.state.id)} value="Masculino" checked onChange={(event) => {handleChanges(event.target.value, 'sex')}}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.id)} id={'inlineRadioMan-'.concat(this.state.id)} value="Masculino"  onChange={(event) => {handleChanges(event.target.value, 'sex')}}></input>
        }

        const sexFemale = () => {
            if (this.state.wasInit) {
                if (this.props.obj.sex === 'Femenino') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.id)} id={'inlineRadioWoman-'.concat(this.state.id)} value="Femenino" checked onChange={(event) => {handleChanges(event.target.value, 'sex')}}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.id)} id={'inlineRadioWoman-'.concat(this.state.id)} value="Femenino" onChange={(event) => {handleChanges(event.target.value, 'sex')}}></input>
        }

        const password = () => {
            if (!this.state.wasInit) {
                return (
                    <div>
                        <div className="form-floating">
                            <input type="password" className="form-control mt-3" required id={'floatingPassword-'.concat(this.state.id)} placeholder="Contraseña" onChange={(event) => {handleChanges(event.target.value, 'password')}}></input>
                            <label htmlFor={'floatingPassword-'.concat(this.state.id)}>Contraseña</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control mt-3" required id={'floatingPasswordConfirm-'.concat(this.state.id)} placeholder="Confirmar contraseña" onChange={(event) => {handleChanges(event.target.value, 'passwordConfirm')}}></input>
                            <label htmlFor={'floatingPasswordConfirm-'.concat(this.state.id)}>Confirmar contraseña</label>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="add-user-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="add-user-label">{ title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => handleSubmit(event)}>
                                { errors() }
                                <div className="form-floating">
                                    <input type="text" required className="form-control" id={'floatingFirstName-'.concat(this.state.id)} autoComplete="disable" placeholder="Nombre" value={this.state.firstName} onChange={(event) => {handleChanges(event.target.value, 'firstName')}}></input>
                                    <label htmlFor={'floatingFirstName-'.concat(this.state.id)}>Nombre</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="text" required className="form-control" id={'floatingLastName-'.concat(this.state.id)} autoComplete="disable" placeholder="Apellidos" value={this.state.lastName} onChange={(event) => {handleChanges(event.target.value, 'lastName')}}></input>
                                    <label htmlFor={'floatingLastName-'.concat(this.state.id)}>Apellidos</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="text" required className="form-control" id={'floatingUsername-'.concat(this.state.id)} autoComplete="disable" placeholder="Nombre de usuario" value={this.state.username} onChange={(event) => {handleChanges(event.target.value, 'username')}}></input>
                                    <label htmlFor={'floatingUsername-'.concat(this.state.id)}>Nombre de usuario</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="email" required className="form-control" id={'floatingEmail-'.concat(this.state.id)} autoComplete="disable" placeholder="Correo electrónico" value={this.state.email} onChange={(event) => {handleChanges(event.target.value, 'email')}}></input>
                                    <label htmlFor={'floatingEmail-'.concat(this.state.id)}>Correo electrónico</label>
                                </div>

                                <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                    <div className="col-4 col-sm-3 p-0 fw-bold">
                                        Cargo
                                    </div>
                                    <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { appointmentStudent() }
                                            <label className="form-check-label" htmlFor={'inlineRadioStudent-'.concat(this.state.id)}>Estudiante</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { appointmentTeacher() }
                                            <label className="form-check-label" htmlFor={'inlineRadioTeacher-'.concat(this.state.id)}>Profesor</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { appointmentAssociatedDean() }
                                            <label className="form-check-label" htmlFor={'inlineRadioAssociateDean-'.concat(this.state.id)}>Vicedecano</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                    <div className="col-4 col-sm-3 p-0 fw-bold">
                                        Sexo
                                    </div>
                                    <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { sexMale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMan-'.concat(this.state.id)}>Masculino</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { sexFemale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioWoman-'.concat(this.state.id)}>Femenino</label>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="form-floating">*/}
                                {/*    <input type="text" className="form-control mt-3" id="floatingInput" placeholder="Carnet de identidad"></input>*/}
                                {/*    <label htmlFor="floatingInput">Carnet de identidad</label>*/}
                                {/*</div>*/}
                                {/*<div className="form-floating">*/}
                                {/*    <input type="text" className="form-control mt-3" id="floatingInput" placeholder="Tipo"></input>*/}
                                {/*    <label htmlFor="floatingInput">Brigada</label>*/}
                                {/*</div>*/}

                                { password() }

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

export default ModalUser
