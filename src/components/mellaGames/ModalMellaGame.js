import React, {Component, createElement} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalMellaGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,

            year: '',
            forms: [{id: 1, value: ''}],

            wasInit: false,

            errors: []
        }
    }

    render() {
        const handleChanges = (form_id, property, value) => {
            let state = this.state

            if (property === 'year') {
                state[property] = parseInt(value)
            }
            if (property === 'value') {
                const forms = this.state.forms

                forms[form_id][property] = parseInt(value)

                state.forms.splice(form_id, 1, forms[form_id])
            }
            if (
                (property === 'position') ||
                (property === 'gold_medals') ||
                (property === 'silver_medals') ||
                (property === 'bronze_medals') ||
                (property === 'points')
            ) {
                const forms_results = this.state.forms_results

                forms_results[form_id][property] = parseInt(value)

                state.forms_results.splice(form_id, 1, forms_results[form_id])
            }

            this.setState(state)
        }

        const addForm = () => {
            const forms = this.state.forms

            if (forms.length < this.props.data.length) {
                let newForm = {id: forms.length + 1, value: ''}

                let state = {}
                state['forms'] = [...forms, newForm]

                this.setState(state)
            } else {
                alert('Ha alcanzado el máximo.')
            }
        }

        const deleteForm = (form_id) => {
            let state = this.state

            const forms = this.state.forms
            forms.splice(form_id, 1)

            forms.forEach(
                form => {
                    if (form.id > form_id) {
                        form.id = form.id - 1
                    }
                }
            )

            state['forms'] = forms

            this.setState(state)
        }

        const validateForm = () => {
            let state = {}
            let errors = []

            this.state.forms.forEach(
                (faculty, index) => {
                    for (let i = index + 1; i < this.state.forms.length; i++) {
                        if (faculty.value === this.state.forms[i].value) {
                            const message = 'No deben existir facultades duplicadas.'
                            errors.splice(errors.length, 0, message)
                        }
                    }
                }
            )

            if (this.state.wasInit) {
                this.state.forms_results.forEach(
                    result => {
                        if (result.position <= 0) {
                            const message = 'Las posiciones no deben ser negativas'
                            errors.splice(errors.length, 0, message)
                        }
                        if (result.gold_medals <= 0) {
                            const message = 'La cantidad de medallas de oro no debe ser negativa'
                            errors.splice(errors.length, 0, message)
                        }
                        if (result.silver_medals <= 0) {
                            const message = 'La cantidad de medallas de plata no debe ser negativa'
                            errors.splice(errors.length, 0, message)
                        }
                        if (result.bronze_medals <= 0) {
                            const message = 'La cantidad de medallas de bronce no debe ser negativa'
                            errors.splice(errors.length, 0, message)
                        }
                        if (result.position > this.state.forms_results.length) {
                            const message = 'No deben existir posiciones mayores al número de facultades.'
                            errors.splice(errors.length, 0, message)
                        }
                    }
                )
            }

            state['errors'] = errors
            this.setState(state)

            return this.state.errors.length === 0;
        }

        const handleSubmit = (event) => {
            event.preventDefault()

            if (validateForm()) {
                let new_obj = {
                    year: this.state.year,
                    faculties: [],
                }

                this.state.forms.forEach(
                    (faculty, index) => {
                        new_obj.faculties.splice(index, 0, faculty.value)
                    }
                )

                if (this.state.wasInit) {
                    new_obj['results'] = []

                    this.state.forms_results.forEach(
                        (result, index) => {
                            new_obj.results.splice(index, 0, {
                                mella_game: result.mella_game.id,
                                faculty: result.faculty.id,
                                position: result.position,
                                gold_medals: result.gold_medals,
                                silver_medals: result.silver_medals,
                                bronze_medals: result.bronze_medals,
                                points: result.points
                            })
                        }
                    )

                    // TODO axios patch http://127.0.0.1:8080/mella-games/ obj.id
                    if (this.props.api_connection) {
                        async function updateObj() {
                            let url = "http://127.0.0.1:8080/mella-games/".concat(this.props.obj.id.toString())

                            const response = axios.put(url, new_obj)
                            console.log(response)
                        }

                        updateObj()
                    } else {
                        console.log(new_obj)
                    }
                } else {
                    // TODO axios post http://127.0.0.1:8080/mella-games/
                    if (this.props.api_connection) {
                        async function createObj() {
                            let url = "http://127.0.0.1:8080/mella-games/"

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

            state['id'] = parseInt(this.props.obj['id'])

            state['year'] = parseInt(this.props.obj['year'])
            state['forms'] = []
            state['forms_results'] = this.props.obj['results']

            this.props.obj['results'].forEach(
                (tuple, index) => {
                    state['forms'].splice(index, 0, {id: index + 1, value: tuple.faculty.id})
                }
            )

            state['wasInit'] = wasInit
            this.setState(state)
        }

        const title = () => {
            if (!this.state.wasInit) {
                return <span>Añadir Juegos Mella</span>
            } else {
                return <span>Juegos Mella {this.props.obj.year}</span>
            }
        }

        const errors = () => {
            if (this.state.errors.length !== 0) {

                let errors = []

                for (let i = 0; i < this.state.errors.length; i++) {
                    errors.splice(i, 0, createElement('li', {}, this.state.errors[i]))
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

        const buttonAddForm = () => {
            if (!this.state.wasInit) {
                return (
                    <div className="col-auto ms-auto">
                        <button type="button" className="btn btn-primary" onClick={addForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </button>
                    </div>
                )
            }
        }

        const buttonDeleteForm = (index) => {
            if (!this.state.wasInit) {
                return (
                    <div className="col-auto px-0 ms-3">
                        <button type="button" className="btn btn-danger" onClick={event => deleteForm(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                )
            }
        }

        const medalForm = (index) => {
            if (this.state.wasInit) {
                let mella_game_id = this.props.obj.id

                return (
                    <div className="row row-cols-5 px-0 mx-auto mt-1">
                        <div className="col px-1 ps-0">
                            <label htmlFor={'position-'.concat(mella_game_id).concat(index)}>Posición</label>
                            <input type="number" className="form-control" id={'position-'.concat(mella_game_id).concat(index)} value={this.state.forms_results[index].position} required onChange={event => handleChanges(index, 'position', event.target.value)} />
                        </div>
                        <div className="col px-1">
                            <label htmlFor={'gold_medals-'.concat(mella_game_id).concat(index)}>Oro</label>
                            <input type="number" className="form-control" id={'gold-medals-'.concat(mella_game_id).concat(index)} value={this.state.forms_results[index].gold_medals} required onChange={event => handleChanges(index, 'gold_medals', event.target.value)} />
                        </div>
                        <div className="col px-1">
                            <label htmlFor={'silver_medals-'.concat(mella_game_id).concat(index)}>Plata</label>
                            <input type="number" className="form-control" id={'silver-medals-'.concat(mella_game_id).concat(index)} value={this.state.forms_results[index].silver_medals} required onChange={event => handleChanges(index, 'silver_medals', event.target.value)} />
                        </div>
                        <div className="col px-1">
                            <label htmlFor={'bronze_medals-'.concat(mella_game_id).concat(index)}>Bronce</label>
                            <input type="number" className="form-control" id={'bronze-medals-'.concat(mella_game_id).concat(index)} value={this.state.forms_results[index].bronze_medals} required onChange={event => handleChanges(index, 'bronze_medals', event.target.value)} />
                        </div>
                        <div className="col px-1 pe-0">
                            <label htmlFor={'points-'.concat(mella_game_id).concat(index)}>Puntos</label>
                            <input type="number" className="form-control" id={'points-'.concat(mella_game_id).concat(index)} value={this.state.forms_results[index].points} required onChange={event => handleChanges(index, 'points', event.target.value)} />
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-modal')} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-modal')}>{ title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            { errors() }
                            <div className="form-floating">
                                <input type="number" className="form-control" id={'floatingYear-'.concat(this.props.id)} placeholder="Año" value={this.state.year} required onChange={(event) => {handleChanges(null, 'year', event.target.value)}}></input>
                                <label htmlFor={'floatingYear-'.concat(this.props.id)}>Año</label>
                            </div>
                            <div className="form-floating mt-3">
                                <div className="row">
                                    <div className="col-auto my-auto fw-bold">
                                        Facultades
                                    </div>
                                    { buttonAddForm() }
                                </div>
                                <div>
                                    {
                                        this.state.forms.map(
                                            (form, index) => {
                                                return (
                                                    <div key={index} className="p-3 border rounded mt-3 bg-light">
                                                        <div className="row px-0 mx-auto mt-3">
                                                            <div className="col px-0">
                                                                <select className="form-select" required onChange={(event) => {handleChanges(index, 'value', event.target.value)}}>
                                                                    <option value="">Selecciona una facultad</option>
                                                                    {
                                                                        this.props.data.map(
                                                                            (faculty, index) => {
                                                                                if (faculty.id === form.value) {
                                                                                    return <option key={index} value={faculty.id} selected>{faculty.name}</option>
                                                                                } else {
                                                                                    return <option key={index} value={faculty.id}>{faculty.name}</option>
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                </select>
                                                            </div>
                                                            { buttonDeleteForm(index) }
                                                        </div>
                                                        {
                                                            medalForm(index)
                                                        }
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalMellaGame
