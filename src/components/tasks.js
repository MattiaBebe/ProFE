import React from "react";

const SERVER = 'localhost:3001';

class Tasks extends React.Component{
    constructor(props){
        super(props);
        rows : []
    }
    render(){
            var data_rows = []
            fetch(this.state.baseEndpoint)
            .then(response => {
            return response.json();
            })
            .then(data => {
            var tasks = data.recordset
            tasks.forEach( (task) => {
                var row = [];
                
            row.push(
                <td key={'expandButton'}>
                <button onClick={() => this.expand()} >+</button>
                </td>
            )
            row.push(<td key={'pwer'}>{task.pwer}</td>);
            row.push(<td key={'kdauf'}>{task.kdauf}</td>);
            row.push(<td key={'kunnr'}>{task.kunnr}</td>);
            row.push(<td key={'name1'}>{task.name1}</td>);
            row.push(<td key={'tasks'}>{task.tasks}</td>);
            row.push(<td key={'deadline'}>{task.deadline}</td>);
            row.push(<td key={'maktx'}>{task.maktx}</td>);
            row.push(<td key={'qty'}>{task.qty}</td>);
            row.push(<td key={'todoparts'}>{task['todo parts']}</td>);

            data_rows.push(<tr key={'row_' + data_rows.length}>{row}</tr>)
            })
            this.setState({rows: data_rows});
            //console.log(this.state.rows);
            })
            .catch(error => console.log('error', error))
    }
}

export default Tasks;