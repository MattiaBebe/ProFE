import React from "react";
import Navbar from "./navbar";

const SERVER = 'localhost:3001';

class TaskTable extends React.Component{
    constructor(props) {
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
        baseEndpoint : `http://${SERVER}/tasks`
      }
    }
  
    componentDidMount(){
      this.fetchData()
    }
  
    fetchDataDetails(){
        var data_rows = [];
        var detailsEndpoint = '/details';
        fetch(this.state.baseEndpoint+detailsEndpoint)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var tasks = [];
            Array.prototype.push.apply(tasks, data.recordset);
            tasks.forEach((task) => {
                var row = [];
                row.push(
                    <td key={'expandButton'}>
                      <button onClick={() => this.expand()} >-</button>
                    </td>
                  )
                row.push(<td key={'pwer'}> {task.pwer} </td>)
                row.push(<td key={'kdauf'}> {task.kdauf} </td>)
                row.push(<td key={'kdpos'}> {task.kdpos} </td>)
                row.push(<td key={'kunnr'}> {task.kunnr} </td>)
                row.push(<td key={'name1'}> {task.name1} </td>)
                row.push(<td key={'aufnr'}> {task.aufnr} </td>)
                row.push(<td key={'matnr'}> {task.matnr} </td>)
                row.push(<td key={'maktx'}> {task.maktx} </td>)
                row.push(<td key={'dglpt'}> {task.dglpt} </td>)
                row.push(<td key={'psmng'}> {task.psmng} </td>)
                row.push(<td key={'wemng'}> {task.wemng} </td>)
                row.push(<td key={'resi'}> {task.resi} </td>)
                row.push(<td key={'stato'}> {task.stato} </td>)
                row.push(<td key={'fevor'}> {task.fevor} </td>)
                row.push(<td key={'atwrt1'}> {task.atwrt1} </td>)
                row.push(<td key={'spedi'}> {task.spedi} </td>)
                row.push(<td key={'kdmat'}> {task.kdmat} </td>)
                row.push(<td key={'ntgew'}> {task.ntgew} </td>)
                row.push(<td key={'bismt'}> {task.bismt} </td>)
                row.push(<td key={'livello'}> {task.livello} </td>)

                data_rows.push(<tr key={'row_'+data_rows.length}>{row}</tr>)
            })
            this.setState({rows: data_rows})
            console.log(data);
        })
    }

    fetchData(){
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
  
    expand(){
      this.setState({expanded: !this.state.expanded});
      if(this.state.expanded){
        this.fetchDataDetails();    
      }
      else{
          this.fetchData();
      }
    }
  
    render() {
      return(
        <>
        <Navbar />
        <div>
          <div style={{float:'left', display: 'flex'}}>
          </div>
          <table className="table">
              <thead>
                {this.state.header}
              </thead>
              <tbody>
                {this.state.rows}
              </tbody>
            </table>
          </div>
        </>
      )
    }
  }


export default TaskTable;