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
                // TODO get http://127.0.0.1:8080/sports/ obj.id
                if (this.props.api_connection) {
                    response = await axios.get("http://127.0.0.1:8080/sports/".concat(obj_id))
                    data = await response.data
                } else {
                    response = await axios.get('http://127.0.0.1:3000/data.json')
                    data = await response.data

                    data.Sport.forEach(
                        sport => {
                            if (sport.id.toString() === obj_id) {
                                state['obj'] = sport
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
                                <h1>Resultados</h1>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Lugar</th>
                                    <th scope="col">Facultad</th>
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
