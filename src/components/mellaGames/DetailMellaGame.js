import React, {Component} from "react";
import axios from "axios";

class DetailMellaGame extends Component{
    constructor(props) {
        super(props);

        this.state = {
            obj: {results: []},
            wasInit: false
        }
    }

    render() {
        if (!this.state.wasInit) {
            let obj_id = document.location.pathname.split('/')[2]

            let state = {}
            let response = {}
            let data = {}

            const getObj = async () => {
                // TODO axios get http://127.0.0.1:8080/mella-games/ obj.id
                if (this.props.api_connection) {
                    response = await axios.get("http://127.0.0.1:8080/mella-games/".concat(obj_id))
                    data = await response.data
                } else {
                    response = await axios.get('http://127.0.0.1:3000/data.json')
                    data = await response.data

                    data.MellaGame.forEach(
                        mella_game => {
                            if (mella_game.id.toString() === obj_id) {
                                state['obj'] = mella_game
                            }
                        }
                    )
                }

                state['wasInit'] = true
                this.setState(state)
            }

            getObj()
        }

        return (
            <main className="flex-shrink-0">
                <div className="container">
                    <div className="mt-3">
                        <div className="row">
                            <div className="col-auto">
                                <h1>Medallero</h1>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Lugar</th>
                                        <th scope="col">Facultad</th>
                                        <th scope="col">Oro</th>
                                        <th scope="col">Plata</th>
                                        <th scope="col">Bronce</th>
                                        <th scope="col">Puntos</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {
                                    this.state.obj.results.map(
                                        (result, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{result.position}</td>
                                                    <td>{result.faculty.name}</td>
                                                    <td>{result.gold_medals}</td>
                                                    <td>{result.silver_medals}</td>
                                                    <td>{result.bronze_medals}</td>
                                                    <td>{result.points}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default DetailMellaGame
