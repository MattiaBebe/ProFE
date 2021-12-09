import React from "react";
import Navbar from "./navbar";
import PulsantiSelezione from "./PulsantiSelezione";
import '../CssFile/tabellaOrdini.css';
import DiameterButton from "./utility/diameterButton";

const SERVER = 'localhost:3001';

//PAGINA FANTINE AS1
class PaginaFantine extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.apriOrdine = this.apriOrdine.bind(this);
        this.handleDiametro = this.handleDiametro.bind(this);
        this.selectionFunction = this.selectionFunction.bind(this);
        this.generateRadioButtonList = this.generateRadioButtonList.bind(this);

        this.state = {
            rows : [],
            selectedRows: [],
            selectionController: false,
            diametersList: [],
            statoClicked: [
                {
                    name: 'data',
                    clicked: false
                },
                {
                    name: 'codice',
                    clicked: false
                }
            ],
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
            baseEndpoint : `http://${SERVER}/fantine?user=${props.user}`
          }
    }



    componentDidMount(){
        this.fetchData()
    }

    handleClick = (event) => {
        let rows = this.state.rows;
        switch(event.target.value){
            case 'data':
                this.state.statoClicked[0].clicked = true;
                this.state.statoClicked[1].clicked = false;
                rows.sort((a,b) => {
                    let index = a.props.children.findIndex(x => x.key == 'scadenza');
                    let x = new Date(a.props.children[index].props.children)
                    let y = new Date(b.props.children[index].props.children)
                    let result = x - y
                    return result
                });
                break
            case 'codice':
                this.state.statoClicked[1].clicked = true;
                this.state.statoClicked[0].clicked = false;
                rows.sort((a,b) => {
                    let index = a.props.children.findIndex(x => x.key == 'codiceMateriale');
                    let x = a.props.children[index].props.children
                    let y = b.props.children[index].props.children
                    let result = x > y ? 1 : -1 
                    return result
                });
                break
            default:
                break
        }
        this.setState({
            rows: rows
        });
    }

    apriOrdine = (params) => {
        const {stlbez} = params;
        console.log(stlbez);
        console.log(this.state.diameters);
    }
    

    fetchData(){
        var data_rows = [];
        let diameters = [];
        let diametersList = [];
        fetch(this.state.baseEndpoint)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var tasks = data
          tasks.forEach( (task) => {
            var row = [];

        const {pwer, kdauf, stlbez, kdpos, kunnr, name1, matnr,maktx, dgltp, psmng, wemng, resi, stato, bismt, atwrt1, atwrt, spedi, kdmat, ntgew} = task;
        let ordineCliente = {kdauf};

          row.push(
              <td key={'dettagliOrdine'}><button onClick={() => this.apriOrdine(stlbez)}> APRI ORDINE </button></td>
           )

          row.push(<td key={'posizione'}>{kdpos}</td>);
          row.push(<td key={'codiceCliente'}>{kunnr}</td>);
          row.push(<td key={'descrizioneCliente'}>{name1}</td>);
          row.push(<td key={'ordineCliente'}>{kdauf}</td>);
          row.push(<td key={'codiceMateriale'}>{matnr}</td>);
          row.push(<td key={'descrizioneMateriale'}>{maktx}</td>);
          //funzione per l'aggiunta di un diametro
          let diameterString = maktx.split('ø');
          let diameter = diameterString[1].split(' ',1)
          diameters.forEach(el => {
                let controllo = true;
                diametersList.forEach(diametri => {
                    if(el == diametri){
                        controllo = false;
                    }
                });
                if(controllo == true){
                    diametersList.push(el);
                }
          });
          diameters.push(diameter[0]);
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
        diametersList.sort(function(a,b){return a-b});
        this.setState({rows: data_rows, diametersList: diametersList});
        console.log(diametersList);
        //console.log(this.state.rows);
        })
        .catch(error => console.log('error', error))
      }

      //funzione per la selezione del diametro

      handleDiametro = (e) => {
          let diameterList = [];
          let diameterString;
          let diameterValue;
            this.setState({
                selectionController: true
            });
            console.log(this.state.rows);
            this.state.rows.forEach(row => {
                console.log()
                let percorso = row.props.children[6].props.children;
                diameterString = percorso.split('ø');
                diameterValue = diameterString[1].split(' ',1);
                if(diameterValue == e.target.value){
                    diameterList.push(row);
                    this.setState({
                        selectedRows: diameterList
                    });
                }
            });
            console.log(this.state.selectedRows);
      }

      //funzione per il controllo della selezione diametri

      selectionFunction(){
          if(this.state.selectionController == false){
                return <> {this.state.rows} </>
          }
          else{
                return <> {this.state.selectedRows} </>
          }
      }

      generateRadioButtonList(){
        let radioButtonList = [];
        this.state.diametersList.forEach(diametro => {
            radioButtonList.push(
             <>
             <ul>
                <DiameterButton diametro={diametro} buttonClick={this.handleDiametro}/>
            </ul>
             </>)
        })
        return radioButtonList;
      }

      render() {
        return(
          <>
          <Navbar />
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div class="alert alert-success" role="alert">
                                BENVEUTO {this.props.user}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col border border-primary rounded-pill">
                            <div>
                            SELEZIONE DIAMETRO
                            </div>
                            {this.generateRadioButtonList()}
                        </div>
                        <div className="col border border-primary rounded-pill">
                            <PulsantiSelezione onclick={this.handleClick} stato={this.state.statoClicked}/>
                        </div>
                    </div>
                </div>
                <div className="tableDiv">
                <table className="table">
                    <thead width="100%">
                    {this.state.header}
                    </thead>
                    <tbody>
                        {this.selectionFunction()}
                    </tbody>
                </table>
                </div>
            </div>
          </>
        )
      }
}


export default PaginaFantine;


