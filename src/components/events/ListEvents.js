import React, {Component} from "react";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import ModalEvent from "./ModalEvent";
import ModalDelete from "../ModalDelete";

class ListEvents extends Component{
    constructor(props) {
        super(props);

        this.state = {
            filterMellaGames: '',
            filterSports: ''
        }
    }

    render() {
        const handleChanges = (value, property) => {
            let state = {}
            state[property] = value
            this.setState(state)
        }

        const addEventModal = () => {
            if (this.props.user !== null) {
                return (
                    <div className="col col-auto ms-auto my-md-auto">
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#add-event-modal">Añadir</button>
                        <ModalEvent data={this.props.data.Sport} id={'add-event-modal'} obj={null} api_connection={this.props.api_connection} />
                    </div>
                )
            }
        }

        const adminTh = () => {
            if (this.props.user !== null) {
                return (
                    <th scope="col">Acciones</th>
                )
            }
        }

        const adminTd = (index, event) => {
            if (this.props.user !== null) {
                return (
                    <td>
                        <div className="row row-cols-1 row-cols-md-2 g-1 justify-content-evenly mx-0">
                            <div className="col text-center">
                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={'#change-event-modal-'.concat(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                                <ModalEvent data={this.props.data.Sport} id={'change-event-modal-'.concat(index)} obj={event} api_connection={this.props.api_connection} />
                            </div>
                            <div className="col text-center">
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#delete-event-modal-'.concat(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </button>
                                <ModalDelete id={'delete-event-modal-'.concat(index)} model={'Event'} obj={event} api_connection={this.props.api_connection} />
                            </div>
                        </div>
                    </td>
                )
            }
        }

        const search = document.location.search
        const searchMellaGames = new URLSearchParams(search).get('juegos-mella')
        const searchSportName = new URLSearchParams(search).get('deporte')
        const searchSportModality = new URLSearchParams(search).get('modalidad')

        if (searchMellaGames && this.state['filterMellaGames'] === '') {
            let state = {}
            state['filterMellaGames'] = searchMellaGames
            this.setState(state)
        }

        if (searchSportName && searchSportModality && this.state['filterSports'] === '') {
            let state = {}
            state['filterSports'] = searchSportName.concat(' ').concat(searchSportModality)
            this.setState(state)
        }

        let days = {
            Mon: 'Lun',
            Tue: 'Mar',
            Wed: 'Mie',
            Thu: 'Jue',
            Fri: 'Vie',
            Sat: 'Sab',
            Sun: 'Dom'
        }

        let months = {
            Jan: 'Ene',
            Feb: 'Feb',
            Mar: 'Mar',
            Apr: 'Abr',
            May: 'May',
            Jun: 'Jun',
            Jul: 'Jul',
            Aug: 'Ago',
            Sep: 'Sep',
            Oct: 'Oct',
            Nov: 'Nov',
            Dec: 'Dic'
        }

        const getDateTime = (date_time) => {
            let date = date_time.split(' ', 4)

            let day_n = date[0]
            let month = date[1]
            let day = date[2]
            let year = date[3]

            date[1] = day
            date[2] = month

            for (let daysKey in days) {
                if (daysKey === day_n) {
                    date[0] = days[daysKey]
                }
            }

            for (let monthsKey in months) {
                if (monthsKey === month) {
                    date[2] = months[monthsKey]
                }
            }

            let time = date_time.split(' ')[4]

            return <span>{date.join(' ')} {time}</span>
        }

        return (
            <main className="flex-shrink-0">
                <div className="container p-3">
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="col col-4 col-md-auto">
                            <h1>Eventos</h1>
                        </div>
                        <div className="col col-md-auto row px-md-0 mx-auto ms-md-auto me-md-0">
                            <div className="col-8 col-md row row-cols-md-2 ms-md-auto">
                                <select id='selectMellaGames' className="col-md-auto p-1 rounded ms-md-auto my-md-auto" onChange={(event) => {handleChanges(event.target.value, 'filterMellaGames')}}>
                                    <option value=''>Selecciona una edición</option>
                                    {
                                        this.props.data.MellaGame.map(
                                            (mella_game, index) => {
                                                if (mella_game.year.toString() === this.state['filterMellaGames']) {
                                                    return <option key={index} value={mella_game.year} selected>Juegos Mella {mella_game.year}</option>
                                                } else {
                                                    return <option key={index} value={mella_game.year}>Juegos Mella {mella_game.year}</option>
                                                }
                                            }
                                        )
                                    }
                                </select>
                                <select className="col-md p-1 rounded ms-md-1 mt-1 my-md-auto" onChange={(event) => {handleChanges(event.target.value, 'filterSports')}}>
                                    <option value=''>Selecciona un deporte</option>
                                    {
                                        this.props.data.Sport.map(
                                            (sport, index) => {
                                                let optionInnerText = sport.name.concat(' ').concat(sport.modality)

                                                if (this.state['filterMellaGames'] === '') {
                                                    optionInnerText = optionInnerText.concat(' ').concat(sport.mella_game.year.toString())
                                                }

                                                if (this.state['filterMellaGames'] === '') {
                                                    if (this.state['filterSports'] === sport.name.concat(' ').concat(sport.modality).concat(' ').concat(sport.mella_game.year.toString())) {
                                                        return <option key={index} value={optionInnerText} selected>{optionInnerText}</option>
                                                    } else {
                                                        if (this.state['filterSports'] === sport.name.concat(' ').concat(sport.modality)) {
                                                            return <option key={index} value={optionInnerText}>{optionInnerText}</option>
                                                        } else {
                                                            if (this.state['filterSports'] === '') {
                                                                return <option key={index} value={optionInnerText}>{optionInnerText}</option>
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (this.state['filterMellaGames'] === sport.mella_game.year.toString()) {
                                                        if (this.state['filterSports'] === sport.name.concat(' ').concat(sport.modality)) {
                                                            return <option key={index} value={optionInnerText} selected>{optionInnerText}</option>
                                                        } else {
                                                            return <option key={index} value={optionInnerText}>{optionInnerText}</option>
                                                        }
                                                    }
                                                }
                                            }
                                        )
                                    }
                                </select>
                            </div>
                            { addEventModal() }
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Deporte</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Lugar</th>
                                <th scope="col">Fecha y hora</th>
                                { adminTh() }
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                this.props.data.Event.map(
                                    (event, index) => {
                                        if (
                                            (this.state['filterMellaGames'] === '' && this.state['filterSports'] === '') ||
                                            (this.state['filterMellaGames'] === '' && this.state['filterSports'] === event.sport.name.concat(' ').concat(event.sport.modality).concat(' ').concat(event.sport.mella_game.year.toString())) ||
                                            (this.state['filterMellaGames'] === event.sport.mella_game.year.toString() && this.state['filterSports'] === '') ||
                                            (this.state['filterMellaGames'] === event.sport.mella_game.year.toString() && this.state['filterSports'] === event.sport.name.concat(' ').concat(event.sport.modality))
                                        ) {
                                            return (
                                                <tr key={index}>
                                                    <td>{event.sport.name} {event.sport.modality}</td>
                                                    <td>{event.name}</td>
                                                    <td>{event.place}</td>
                                                    <td>{getDateTime(event.date_time)}</td>
                                                    { adminTd(index, event) }
                                                </tr>
                                            )
                                        } else {
                                            return null
                                        }
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

export default ListEvents
