import React from "react";
import Navbar from "./navbar";
import '../CssFile/tabellaOrdini.css';
import '../CssFile/paginaGrafici.css';
import { Doughnut } from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto'
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';


const SERVER = 'localhost:3001';
let dati = [];
  
class GraficiProduzione extends React.Component{
    constructor(props){
        super(props)
        this.gestioneDati = this.gestioneDati.bind(this);
        this.passaData = this.passaData.bind(this);
        this.gestioneDatiOrdinati = this.gestioneDatiOrdinati.bind(this);
        this.apriCalendario = this.apriCalendario.bind(this);
        this.chiudiCalendario = this.chiudiCalendario.bind(this);
        this.state = {
            todayDate: new Date(),
            arrayDatiOrdinati: [],
            arrayDati: [],
            labels: [],
            datasets: [
                {
                label: 'Quantità di pezzi prodotti per tipologia',
                backgroundColor: 'rgba(236, 171, 39, 1)',
                borderColor: 'rgba(0,0,0,1)',
                Color: 'red',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
                }
            ],
            codici: []
        };
        this.endpoint = `http://${SERVER}/grafici`;
    }

    passaData(e){
        this.setState({
            todayDate: e.value
        });
        console.log(this.state.todayDate);
        console.log(this.endpoint);
        this.fetchData()
        this.gestioneDati();
    }


    apriCalendario(){
        let modal = document.getElementById("myModal");
        console.log(modal)
        modal.style.display = 'block';
    }

    chiudiCalendario(){
        let modal = document.getElementById("myModal");
        modal.style.display = 'none';
    }

    render(){
        return (
            <>
            <div className="col-12 container-fluid">
                <Navbar /> 
                <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close" onClick={() => this.chiudiCalendario()}>&times;</span>
                    <p>
                        <CalendarComponent change={this.passaData}/>
                    </p>
                </div>

                </div>

                <div className="row">
                    <div className="col-3">
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <div className="calendario">
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16" id="myBtn" onClick={() => this.apriCalendario()}>
                                <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="grafico">
                            <Bar
                            data={this.state}
                            options={{
                                title:{
                                display:true,
                                text:'Average Rainfall per month',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                }
                            }}
                            />
                        </div>
                    </div>
                    <div className="col-3 barraLaterale">
                        <center>
                            <br></br>
                            <input type="button" value={'grafico Base'}></input> <br /><br />
                            <input type="button" value={'grafico Base'}></input> <br /><br />
                            <input type="button" value={'grafico Base'}></input> <br /><br />
                            <input type="button" value={'grafico Base'}></input> <br /><br />
                        </center>
                    </div>
                </div>
            </div>
            </>
        )
    }


    componentDidMount(){
        let todayDate = this.state.todayDate.toLocaleDateString();
        this.setState({
            todayDate: todayDate
        });
        this.fetchData();
    }

    fetchData(url = this.endpoint){
        fetch(url+`?data=${this.state.todayDate}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var tasks = data
          this.setState({ arrayDati: [] });
          dati = data;
          let valori = {}
          tasks.forEach( task => {
                valori = {
                    ordine: task.AUFPL,
                    qta: task.qta,
                    codice: task.codice,
                    data: task.data,
                    cate: task.cate
                }
                this.state.arrayDati.push(valori);
            })
        this.gestioneDati();
        })
        .catch(error => console.log('error', error))
      }

      //funzione per la gestione dei dati per la creazione dei grafici

      gestioneDati(){
        this.setState({ labels: []})
        let arrayCate = [];
        this.state.arrayDati.forEach(element => {
            let controlloCategoria = false;
            arrayCate.forEach(categoria => {
                if(categoria == element.cate){

                    controlloCategoria = true;
                }
            });
            if(controlloCategoria == false){
                console.log('sono dentro l assegnazione della categoria')
                arrayCate.push(element.cate);
                controlloCategoria = false;
            }        
        });
        this.setState({
            labels: arrayCate
        });
        this.gestioneDatiOrdinati()
        console.log(this.state.labels);
    }

    gestioneDatiOrdinati(){
        let datiOrdinati = [];
        this.state.labels.forEach( categoria => {
            let totalePezziCategoria = 0;
            this.state.arrayDati.forEach( dato => {
                if(dato.cate == categoria){
                    totalePezziCategoria = totalePezziCategoria + dato.qta;
                }
                else{
                    console.log('diversi');
                }
            })
        datiOrdinati.push(totalePezziCategoria);
        })
        this.setState({
            arrayDatiOrdinati: datiOrdinati,
            datasets: [
                {
                label: 'Quantità di pezzi prodotti per tipologia',
                backgroundColor: 'rgba(236, 171, 39, 1)',
                borderColor: 'rgba(0,0,0,1)',
                Color: 'red',
                borderWidth: 2,
                data: datiOrdinati
                }
            ]
        });
    }

}



export default GraficiProduzione;