import React, {Component, createElement} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalSport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forms: [{id: 1, mella_game: '', name: '', modality: '', sex: ''}],

            wasInit: false,

            errors: []
        }
    }

    render() {
        const handleChanges = (form_id, property, value) => {
            let state = this.state

            if (property === 'position') {
                let forms_results = this.state.forms_results

                forms_results[form_id][property] = value

                state.forms_results.splice(form_id, 1, forms_results[form_id])
            } else {
                let forms = this.state.forms

                forms[form_id][property] = value

                state.forms.splice(form_id, 1, forms[form_id])
            }

            this.setState(state)
        }

        const addForm = () => {
            let state = {}
            let forms = this.state.forms
            let newForm = {id: forms.length + 1, mella_game: '', name: '', modality: '', sex: ''}

            state['forms'] = [...forms, newForm]
            this.setState(state)
        }

        const deleteForm = (form_id) => {
            let state = {}
            let forms = this.state.forms

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

            if (this.state.wasInit) {
                this.state.forms_results.forEach(
                    result => {
                        if (result.position <= 0) {
                            const message = 'Las posiciones no deben ser negativas'
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
                let new_objs = []

                this.state.forms.forEach(
                    (form, index) => {
                        let new_obj = {
                            mella_game: parseInt(form.mella_game),
                            name: form.name,
                            modality: form.modality.concat(' ').concat(form.sex),
                        }

                        new_objs.splice(index, 0, new_obj)
                    }
                )

                if (this.state.wasInit) {
                    this.state.forms_results.forEach(
                        (result, index) => {
                            new_objs[0]['results'] = []

                            new_objs[0].results.splice(index, 0, {
                                sport: result.sport.id,
                                faculty: result.faculty.id,
                                position: result.position,
                            })
                        }
                    )

                    // TODO axios patch http://127.0.0.1:8080/sports/ obj.id
                    if (this.props.api_connection) {
                        async function updateObj() {
                            let url = "http://127.0.0.1:8080/sports/".concat(this.props.obj.id.toString())

                            const response = axios.put(url, new_objs[0])
                            console.log(response)
                        }

                        updateObj()
                    } else {
                        console.log(new_objs[0])
                    }
                } else {
                    // TODO axios post http://127.0.0.1:8080/sports/
                    if (this.props.api_connection) {
                        async function createObj() {
                            let url = "http://127.0.0.1:8080/sports/"

                            new_objs.forEach(
                                new_obj => {
                                    const response = axios.post(url, new_obj)
                                    console.log(response)
                                }
                            )
                        }

                        createObj()
                    } else {
                        new_objs.forEach(
                            new_obj => {
                                console.log(new_obj)
                            }
                        )
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

            state['forms'] = []
            state['forms'].splice(0, 0, {id: this.props.obj.id, mella_game: this.props.obj.mella_game.id, name: this.props.obj.name, modality: this.props.obj.modality.split(' ')[0], sex: this.props.obj.modality.split(' ')[1]})

            state['forms_results'] = []

            this.props.obj['results'].forEach(
                (tuple, index) => {
                    state['forms_results'].splice(index, 0, {id: index + 1, sport: tuple.sport.id, faculty: tuple.faculty.id, position: tuple.position})
                }
            )

            state['wasInit'] = wasInit
            this.setState(state)
        }

        const title = () => {
            if (!this.state.wasInit) {
                return <span>Añadir Deporte</span>
            } else {
                return <span>{this.props.obj.name.concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.mella_game.year)}</span>
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
                    <div className="d-flex">
                        <button type="button" className="btn btn-primary ms-auto" onClick={addForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </button>
                    </div>
                )
            } else {
                return null
            }
        }

        const buttonDeleteForm = (index) => {
            if (!this.state.wasInit) {
                return (
                    <div className="col-auto px-0 ms-1">
                        <button type="button" className="btn btn-danger" onClick={event => {deleteForm(index)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                )
            }
        }

        const modalityTeam = (form, index) => {
            if (this.state.wasInit) {
                if (this.props.obj.modality.split(' ')[0] === 'Equipo') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(form.id).concat(index)} id={'inlineRadioTeam_'.concat(form.id).concat(index)} value="Equipo" checked onChange={event => handleChanges(index, 'modality', event.target.value)}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(form.id).concat(index)} id={'inlineRadioTeam_'.concat(form.id).concat(index)} value="Equipo" onChange={event => handleChanges(index, 'modality', event.target.value)}></input>
        }

        const modalitySingle = (form, index) => {
            if (this.state.wasInit) {
                if (this.props.obj.modality.split(' ')[0] === 'Individual') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(form.id).concat(index)} id={'inlineRadioSingle_'.concat(form.id).concat(index)} value="Individual" checked onChange={event => handleChanges(index, 'modality', event.target.value)}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(form.id).concat(index)} id={'inlineRadioSingle_'.concat(form.id).concat(index)} value="Individual" onChange={event => handleChanges(index, 'modality', event.target.value)}></input>
        }

        const sexMale = (form, index) => {
            if (this.state.wasInit) {
                if (this.props.obj.modality.split(' ')[1] === 'Masculino') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioMale_'.concat(form.id).concat(index)} value="Masculino" checked onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioMale_'.concat(form.id).concat(index)} value="Masculino" onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
        }

        const sexFemale = (form, index) => {
            if (this.state.wasInit) {
                if (this.props.obj.modality.split(' ')[1] === 'Femenino') {
                   return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioFemale_'.concat(form.id).concat(index)} value="Femenino" checked onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioFemale_'.concat(form.id).concat(index)} value="Femenino" onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
        }

        const sexMix = (form, index) => {
            if (this.state.wasInit) {
                if (this.props.obj.modality.split(' ')[1] === 'Mixto') {
                    return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioMix_'.concat(form.id).concat(index)} value="Mixto" checked onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
                }
            }
            return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(form.id).concat(index)} id={'inlineRadioMix_'.concat(form.id).concat(index)} value="Mixto" onChange={event => handleChanges(index, 'sex', event.target.value)}></input>
        }

        const resultsForm = () => {
            if (this.state.wasInit) {

                let inputsPosition = []

                this.props.obj.results.forEach(
                    (result, j) => {
                        let children = createElement('div', {key: j, className: 'row mt-1'}, [
                            createElement('div', {className: 'col text-start'},
                                createElement('label', {}, result.faculty.name)
                            ),
                            createElement('div', {className: 'col-3'}, [
                                createElement('input', {type: 'number', className: 'form-control text-center', value: this.state.forms_results[j].position, required: true, onChange: event => handleChanges(j, 'position', event.target.value)})
                            ])
                        ])

                        inputsPosition.splice(j, 0, children)
                    }
                )

                return createElement('div', {className: 'col col-md-auto col-lg-6 row pe-0 mt-3'}, [
                    createElement('div', {}, [
                        createElement('div', {className: 'row'}, [
                            createElement('label', {className: 'col fw-bold'}, 'Facultad'),
                            createElement('label', {className: 'col-3 fw-bold'}, 'Posición')
                        ])
                    ]),
                    createElement('div', {}, [
                        inputsPosition
                    ])
                ])
            }
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-label')} aria-hidden="true">
                <div className="modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-label')}>{ title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            { buttonAddForm() }
                            <div>
                                {
                                    this.state.forms.map(
                                        (form, index) => {
                                            return (
                                                <div key={index} className="row p-3 border rounded mx-auto mt-3 bg-light">
                                                    { errors() }
                                                    <div className="col row row-cols-1 row-cols-md-2">
                                                        <div className="col px-1">
                                                            <select name={'selectMellaGame_'.concat(form.id).concat(index)} id={'selectMellaGame_'.concat(form.id).concat(index)} className="form-select" required onChange={event => handleChanges(index, 'mella_game', event.target.value)}>
                                                                <option value="">Selecciona una edición</option>
                                                                {
                                                                    this.props.data.MellaGame.map(
                                                                        (mella_game, index) => {
                                                                            if (mella_game.id === form.mella_game) {
                                                                                return <option key={index} value={mella_game.id} selected>Juegos Mella {mella_game.year}</option>
                                                                            } else {
                                                                                return <option key={index} value={mella_game.id}>Juegos Mella {mella_game.year}</option>
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col px-1 mt-1 mt-md-0">
                                                            <input type="text" className="form-control" id={'floatingName_'.concat(form.id).concat(index)} placeholder="Nombre" value={form.name} required onChange={event => handleChanges(index, 'name', event.target.value)}></input>
                                                        </div>
                                                        <div className="col col-md-auto row px-0 mx-auto mx-md-0 mt-3">
                                                            <div className="form-floating row row-cols-1 px-0 mx-auto">
                                                                <div className="col text-start fw-bold">
                                                                    Modalidad
                                                                </div>
                                                                <div className="col row row-cols-2 mx-auto mt-1">
                                                                    <div className="col col-lg-auto row row-cols-1 row-cols-lg-2 px-0 mx-auto mb-auto">
                                                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                                                            { modalityTeam(form, index) }
                                                                            <label className="form-check-label" htmlFor={'inlineRadioTeam_'.concat(index)}>Equipo</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                                                            { modalitySingle(form, index) }
                                                                            <label className="form-check-label" htmlFor={'inlineRadioSingle_'.concat(index)}>Individual</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col col-lg-auto row row-cols-1 row-cols-lg-3 px-0 mx-auto">
                                                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                                                            { sexMale(form, index) }
                                                                            <label className="form-check-label" htmlFor={'inlineRadioMale_'.concat(form.id).concat(index)}>Masculino</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                                                            { sexFemale(form, index) }
                                                                            <label className="form-check-label" htmlFor={'inlineRadioFemale_'.concat(form.id).concat(index)}>Femenino</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                                                            { sexMix(form, index) }
                                                                            <label className="form-check-label" htmlFor={'inlineRadioMix_'.concat(form.id).concat(index)}>Mixto</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        { resultsForm() }
                                                    </div>
                                                    { buttonDeleteForm(index) }
                                                </div>
                                            )
                                        }
                                    )
                                }
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

export default ModalSport
