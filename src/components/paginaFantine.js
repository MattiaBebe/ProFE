import React from "react";
import Navbar from "./navbar";

const SERVER = 'localhost:3001';

class PaginaFantine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rows : [],
            header:
                <>
                    <tr>
                        <th></th>
                        <th>Divisione</th>
                        <th>Ordine</th>
                        <th>Codice Cliente</th>
                        <th>Cliente</th>
                        <th>Semilavorati</th>
                        <th>Scadenza</th>
                        <th>Prodotto</th>
                        <th>Pezzi</th>
                        <th>Componenti</th>
                    </tr>
                </>,
            expanded : false,
            baseEndpoint : `http://${SERVER}/fantine`
          }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        var data_rows = []
        fetch(this.state.baseEndpoint)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var tasks = data
          tasks.forEach( (task) => {
            var row = [];
            
          row.push(
              <button> APRI ORDINE </button>
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
      render() {
        return(
          <>
          <Navbar />
          <div>
            <div style={{float:'left', display: 'flex'}}>
            </div>
            <table className="table">
                {/* <thead>
                  {this.state.header}
                </thead> */}
                <tbody>
                  {this.state.rows}
                </tbody>
              </table>
            </div>
          </>
        )
      }
}

export default PaginaFantine;


