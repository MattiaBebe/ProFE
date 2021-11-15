import React from "react";
import Navbar from "./navbar";
import '../CssFile/tabellaOrdini.css';
import PulsantiSelezione from "./PulsantiSelezione";

const SERVER = 'localhost:3001';

class PaginaFantine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rows : [],
            header:
                <>
                    <tr>
                        <th>ORDINE</th>
                        <th>POSIZIONE</th>
                        <th>CODICE</th>
                        <th>DESCRIZIONE CLIENTE</th>
                        <th>ORD. CLIENTE</th>
                        <th>COD. MATERIALE</th>
                        <th>DESCRIZIONE MATERIALE</th>
                        <th>SCADENZA</th>
                        <th>TOTALE</th>
                        <th>RESIDUO</th>
                        <th>LANCIATO</th>
                        <th>FINITO</th>
                        <th>C.ASTA</th>
                        <th>C.CILINDRO</th>
                        <th>BISMT</th>
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

           const {pwer, kdauf, stlbez, kdpos, kunnr, name1, matnr,maktx, dgltp, psmng, wemng, resi, stato, bismt, atwrt1, atwrt, spedi, kdmat, ntgew} = task;

          row.push(<td key={'posizione'}>{kdpos}</td>);
          row.push(<td key={'codiceCliente'}>{kunnr}</td>);
          row.push(<td key={'descrizioneCliente'}>{name1}</td>);
          row.push(<td key={'ordineCliente'}>{kdauf}</td>);
          row.push(<td key={'codiceMateriale'}>{matnr}</td>);
          row.push(<td key={'descrizioneMateriale'}>{maktx}</td>);
          row.push(<td key={'scadenza'}>{dgltp}</td>);
          row.push(<td key={'totale'}>{psmng}</td>);
          row.push(<td key={'residuo'}>{resi}</td>);
          row.push(<td key={'lanciato'}>{stato}</td>);
          row.push(<td key={'finito'}>{stlbez}</td>);
          row.push(<td key={'corsaAsta'}>{atwrt}</td>);
          row.push(<td key={'corsaCilindro'}>{atwrt1}</td>);
          row.push(<td key={'grezzo'}>{bismt}</td>);
    
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
          <div width="100%">
            <div style={{float:'left', display: 'flex'}}>
                <PulsantiSelezione />
            </div>
            <table className="table">
                <thead width="100%">
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

export default PaginaFantine;


