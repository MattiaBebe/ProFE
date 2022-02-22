import React from "react";
import Navbar from "./navbar";
import PulsantiSelezione from "./PulsantiSelezione";
import DiameterButton from "./utility/diameterButton";
import '../CssFile/pulsantiSelezione.css';
import PaginaVisualizzazioneOrdine from "./paginaVisualizzazioneOrdine";
import OperazioniVarie from "./operazioniVarie";
import GraficiProduzione from "./GraficiProduzione";
import '../CssFile/tabellaOrdini.css';

const SERVER = 'localhost:3001';
const SERVER_DISEGNI = 'http://192.168.1.3';
const FILEPATH_DISEGNI = '/SHARE/UT/PARTI/';
const URL_DISEGNI = new URL(SERVER_DISEGNI+FILEPATH_DISEGNI)
let totalePz = 0;
class PaginaFantine extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.apriOrdine = this.apriOrdine.bind(this);
        this.handleDiametro = this.handleDiametro.bind(this);
        this.selectionFunction = this.selectionFunction.bind(this);
        this.generateStandardPage = this.generateStandardPage.bind(this);
        this.generateRadioButtonList = this.generateRadioButtonList.bind(this);
        this.generateOrderVisualization = this.generateOrderVisualization.bind(this);
        this.returnPre = this.returnPre.bind(this);
        this.settaggioData = this.settaggioData.bind(this);
        this.controlloScadenza = this.controlloScadenza.bind(this);
        this.contaPezzi = this.contaPezzi.bind(this);
        this.generateOperazioniVarie = this.generateOperazioniVarie.bind(this);
        this.generateChartVisualization = this.generateChartVisualization.bind(this);
        this.statoGrafici = this.statoGrafici.bind(this);

        this.state = {
            orderVisualization: false,
            operazioniVarie: false,
            rows : [],
            totalePezzi: 0,
            diametroScelto: 0,
            visualizzazioneGrafico: false,
            totalePezziCompleto: 0,
            order: 0,
            cliente: '',
            code: '',
            disegno: '',
            residuo: 0,
            corsaAsta: 0,
            corsaCilindro: 0,
            selectedRows: [],
            selectionController: false,
            selectionValue: 0,
            preValue: 0,
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
        const {aufnr, name1, maktx, atwrt, atwrt1, resi, bismt, VORNR} = params;
        console.log(bismt);
        this.setState({
            orderVisualization: true,
            vornr: VORNR,
            order: aufnr,
            cliente: name1,
            code: maktx,
            corsaAsta: atwrt,
            corsaCilindro: atwrt1,
            resi: resi,
            disegno: URL_DISEGNI+bismt.trim()+".pdf"
        });
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
          tasks.forEach( task => {
            var row = [];

        const {aufnr, pwer, kdauf, stlbez, kdpos, kunnr, name1, matnr,maktx, dgltp, psmng, wemng, resi, stato, bismt, atwrt1, atwrt, spedi, kdmat, ntgew, VORNR} = task;
        let ordineCliente = {kdauf};
          row.push(
              <td key={'dettagliOrdine'}><button onClick={() => this.apriOrdine({aufnr, name1, maktx, atwrt, atwrt1, resi, bismt, VORNR})}> {aufnr} </button></td>
           )

          row.push(<td key={'posizione'}>{kdpos}</td>);
          row.push(<td key={'codiceCliente'}>{kunnr}</td>);
          row.push(<td key={'descrizioneCliente'}>{name1}</td>);
          row.push(<td key={'ordineCliente'}>{kdauf}</td>);
          row.push(<td key={'codiceMateriale'}>{matnr}</td>);
          row.push(<td key={'descrizioneMateriale'}>{maktx}</td>);
          //funzione per l'aggiunta di un diametro
          let diameterString = maktx.split('ø');
          let diameter; 
          try{
            diameter = diameterString[1].split(' ',1)
          }
          catch(e){
              console.log(e);
              diameter = null;
          }
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
          if(diameter != null){
            diameters.push(diameter[0]);
          }
          let scadenza = this.settaggioData(dgltp)
          let controlloScadenza = this.controlloScadenza(dgltp)
          if(controlloScadenza = "scaduto"){
                row.push(<td key={'scadenza'} className={"scaduto"}>{scadenza}</td>);
          }
          else if(controlloScadenza = "oggi"){
                row.push(<td key={'scadenza'} className={"daFareOggi"}>{scadenza}</td>);
          }
          else if(controlloScadenza = "prossimi"){
                row.push(<td key={'scadenza'} className={"daFare"}>{scadenza}</td>);
          } 
          row.push(<td key={'totale'}>{psmng}</td>);
          row.push(<td key={'residuo'}>{resi}</td>);
          totalePz = totalePz + resi;
          row.push(<td key={'lanciato'}>{stato}</td>);
          row.push(<td key={'finito'}>{stlbez}</td>);
          row.push(<td key={'corsaAsta'}>{atwrt}</td>);
          row.push(<td key={'corsaCilindro'}>{atwrt1}</td>);
          row.push(<td key={'grezzo'}>{bismt}</td>);
          
    
          data_rows.push(<tr key={'row_' + data_rows.length}>{row}</tr>)
        })
        diametersList.sort(function(a,b){return a-b});
        this.setState({rows: data_rows, diametersList: diametersList, totalePezziCompleto: totalePz});
        })
        .catch(error => console.log('error', error))
      }

      controlloScadenza(dgltp){
        let dataOdierna = new Date();
        let scadenza = new Date(dgltp);
        if(scadenza.getDate() > dataOdierna.getDate()){
            return "scaduto"
        }
        else if(scadenza.getDate() == dataOdierna.getDate()){
            console.log("da fare oggi")
            return "oggi"
        }
        else if(scadenza.getDate() < dataOdierna.getDate){
            console.log("da fare nei prossimi giorni")
            return "prossimi"
        }
      }

      settaggioData(dgltp){
        let scadenza = dgltp;
        let dataCompleta = scadenza.split("T",1);
        return dataCompleta
    }

      //funzione per la selezione del diametro

      handleDiametro = (e) => {
          let {preValue} = this.state;
          let diameterList = [];
          let diameterString;
          let diameterValue;
          let pezziRestanti = 0;
          if(preValue != 0){
                preValue.className = "selezioneDiametro";
          }
          if(this.state.selectionValue == e.target.value){
             e.target.className = "selezioneDiametro";
             this.setState({
                 selectionController: false,
                 selectionValue: 0
             });
          }
          else{
            e.target.className = "selezionato";
            this.setState({
                selectionController: true,
                selectionValue: e.target.value
            });
            this.state.rows.forEach(row => {
                let percorso = row.props.children[6].props.children;
                let pezzi = row.props.children[9].props.children;
                try{
                    diameterString = percorso.split('ø');
                    diameterValue = diameterString[1].split(' ',1);
                }
                catch(e){
                    console.log(e);
                    diameterValue = null;
                }
                if(diameterValue == e.target.value && diameterValue != null){
                    pezziRestanti = pezziRestanti + pezzi;
                    diameterList.push(row);
                    this.setState({
                        selectedRows: diameterList
                    });
                }
            });
            this.setState({
                preValue: e.target,
                totalePezzi: pezziRestanti
            });
          }
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
                        <DiameterButton diametro={diametro} buttonClick={this.handleDiametro}/>
                     </>)
                })
            return radioButtonList;
            }
      

    //fuznione per il controllo del ritorno del numero dei pezzi

    contaPezzi(){
        if(this.state.selectionController == false){
            return <> il numero di pezzi restanti è: {this.state.totalePezziCompleto}</>
        }
        else{
            return <> il numero di pezzi restanti per il diametro {this.state.selectionValue} è : {this.state.totalePezzi}</>
        }
    }

    //pagina standard della visualizzazione ordine

      generateStandardPage() {
          return(
            <>
            <Navbar pagina="paginaFantine" aPaginaOperazioni={this.generateOperazioniVarie} grafici={this.statoGrafici}/>
              <div className="container-fluid">
                  <div className="alert alert-success" role="alert">
                      {this.contaPezzi()}
                  </div>
                  <div className="container">
                      <div className="row">
                          <div className="col border border-2 border-primary rounded-pill">
                              <div className="titoloSelezioneDiametro">
                              SELEZIONE DIAMETRO
                              </div>
                              <div className="divSelezioneDiametro">
                              {this.generateRadioButtonList()}
                              </div>
                          </div>
                          <div className="col border border-2 border-primary rounded-pill">
                              <PulsantiSelezione onclick={this.handleClick} stato={this.state.statoClicked}/>
                          </div>
                      </div>
                  </div>
                  <br></br>
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


      //funzione per il settaggio dello stato dedito alla visualizzazione della pagina dei grafic

      statoGrafici(){
          this.setState({
                visualizzazioneGrafico: true
          });
      }

      //test

      returnPre(){
          this.setState({
              orderVisualization: false
          });
      }

      //funzione per il passaggio alla visualizzazione della pagina operazioniVarie

      generateOperazioniVarie(){
        this.setState({
            operazioniVarie: true
        });
      }
      
      //fuznione per il ritorno della visualizzazione dell'ordine  

      generateOrderVisualization(){
        const {order, code, cliente, corsaAsta, corsaCilindro, resi} = this.state
        return(
                <PaginaVisualizzazioneOrdine funzioneRitorno={this.returnPre} ordine={order} cliente={cliente} code={code} corsaAsta={corsaAsta} corsaCilindro={corsaCilindro} qta={resi} disegno={this.state.disegno} vornr={this.state.vornr} visualizzaDettagli={this.state.orderVisualization} workcenter={'10000013'}/>
                )
      }

      generateChartVisualization(){
            return(
                <>
                    <GraficiProduzione />
                </>
            )
      }

      render() {
          if(this.state.orderVisualization == false && this.state.operazioniVarie == false && this.state.visualizzazioneGrafico == false){
             return(
                this.generateStandardPage()
            )
          }
          else if(this.state.operazioniVarie == true){
            return(
                <>
                 <OperazioniVarie user={this.props.user}/>
                </>
            )
          }
          else if(this.state.visualizzazioneGrafico == true){
            return(
                this.generateChartVisualization()
            )
          }
          else{
              return(
                  this.generateOrderVisualization()
              )
            }
      }
}


export default PaginaFantine;


