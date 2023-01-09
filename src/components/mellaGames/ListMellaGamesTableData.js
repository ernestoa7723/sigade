import React, {Component} from "react";

class ListMellaGamesTableData extends Component{
    render() {
        let faculty_name = ''

        this.props.mella_game.results.forEach(
            tuple => {
                if (tuple.position === this.props.position) {
                    faculty_name = tuple.faculty.name
                }
            }
        )

        return <td>{faculty_name}</td>
    }
}

export default ListMellaGamesTableData
