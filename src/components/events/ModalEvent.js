import React, {Component} from "react";
import DatePicker from 'react-date-picker';
import TimePicker from "react-time-picker";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forms: [{id: 1, sport: '', name: '', place: '', date: '', time: ''}],

            wasInit: false
        }
    }

    render() {
        const handleChanges = (form_id, property, value) => {
            let state = this.state
            let forms = this.state.forms

            forms[form_id][property] = value

            state.forms.splice(form_id, 1, forms[form_id])

            this.setState(state)
        }

        const addForm = () => {
            let state = {}
            let forms = this.state.forms
            let newForm = {id: forms.length + 1, sport: '', name: '', place: '', date: '', time: ''}

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

        const handleSubmit = (event) => {
            event.preventDefault()

            let new_objs = []

            this.state.forms.forEach(
                (form, index) => {
                    let new_obj = {
                        sport: parseInt(form.sport),
                        name: form.name,
                        place: form.place,
                        date_time: form.date.toDateString().concat(' ').concat(form.time)
                    }

                    new_objs.splice(index, 0, new_obj)
                }
            )

            if (this.state.wasInit) {
                // TODO axios patch http://127.0.0.1:8080/events/ obj.id
                if (this.props.api_connection) {
                    async function updateObj() {
                        let url = "http://127.0.0.1:8080/events/".concat(this.props.obj.id.toString())

                        const response = axios.put(url, new_objs[0])
                        console.log(response)
                    }

                    updateObj()
                } else {
                    console.log(new_objs[0])
                }
            } else {
                // TODO axios post http://127.0.0.1:8080/events/
                if (this.props.api_connection) {
                    async function createObj() {
                        let url = "http://127.0.0.1:8080/events/"

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

        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = this.state
            let wasInit = true

            state['id'] = this.props.obj['id']

            state['forms'] = []

            let date_time = this.props.obj.date_time
            let date = date_time.split(' ', 4)
            let month = date[1]
            let day = date[2]
            let year = date[3]
            let new_date = new Date(year.concat('-').concat(month).concat('-').concat(day))

            state['forms'].splice(0, 0, {id: this.props.obj.id, sport: this.props.obj.sport.id.toString(), name: this.props.obj.name, place: this.props.obj.place, date: new_date, time: this.props.obj.date_time.split(' ')[4]})

            state['wasInit'] = wasInit
            this.setState(state)
        }

        const title = () => {
            if (!this.state.wasInit) {
                return <span>Añadir Evento</span>
            } else {
                return <span>{this.props.obj.sport.name.concat(' ').concat(this.props.obj.sport.modality).concat(' ').concat(this.props.obj.sport.mella_game.year.concat(' ').concat(this.props.obj.name))}</span>
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

        return (
            <div className="modal fade" id={ this.props.id } data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={ this.props.id.concat('-label') } aria-hidden="true">
                <div className="modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={ this.props.id.concat('-label') }>{ title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            { buttonAddForm() }
                            <div className="form-floating">
                                {
                                    this.state.forms.map(
                                        (form, index) => {
                                            return (
                                                <div key={index} className="row p-3 border rounded mx-auto mt-3 bg-light">
                                                    <div className="col row row-cols-1 row-cols-md-2">
                                                        <div className="col px-1">
                                                            <select name={'selectSport_'.concat(index)} id={'selectSport_'.concat(index)} className="form-select" required onChange={event => handleChanges(index, 'sport', event.target.value)}>
                                                                <option value="">Selecciona un deporte</option>
                                                                {
                                                                    this.props.data.map(
                                                                        (sport, index) => {
                                                                            if (sport.id.toString() === form.sport) {
                                                                                return <option key={index} value={sport.id} selected>{sport.name} {sport.modality} {sport.mella_game.year}</option>
                                                                            } else {
                                                                                return <option key={index} value={sport.id}>{sport.name} {sport.modality} {sport.mella_game.year}</option>
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col px-1 mt-1 mt-md-0">
                                                            <input type="text" className="form-control" id={'floatingName_'.concat(index)} placeholder="Nombre" value={form.name} required onChange={event => handleChanges(index, 'name', event.target.value)}></input>
                                                        </div>
                                                        <div className="col col-md-12 col-lg px-1 mt-1 mt-md-3">
                                                            <input type="text" className="form-control" id={'floatingPlace_'.concat(index)} placeholder="Lugar" value={form.place} required onChange={event => handleChanges(index, 'place', event.target.value)}></input>
                                                        </div>
                                                        <div className="col col-md-12 col-lg row row-cols-1 row-cols-md-2 px-1 mx-auto mt-1 mt-md-3">
                                                            <div className="col col-lg-auto px-0 pe-md-1 pe-lg-0">
                                                                <DatePicker
                                                                    className="form-control p-1"
                                                                    required
                                                                    onChange={value => {handleChanges(index, 'date', value)}}
                                                                    disableCalendar
                                                                    value={ this.state.forms[index].date}
                                                                />
                                                            </div>
                                                            <div className="col col-lg-auto px-0 ps-md-1 ps-lg-0">
                                                                <TimePicker
                                                                    className="form-control p-1 mt-1 mt-md-0"
                                                                    required
                                                                    disableClock
                                                                    onChange={value => {handleChanges(index, 'time', value)}}
                                                                    value={this.state.forms[index].time}
                                                                />
                                                            </div>
                                                        </div>
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
        );
    }
}

export default ModalEvent
