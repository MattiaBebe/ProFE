import React from "react";
import Navbar from "./navbar";
import '../CssFile/paginaGrafici.css';
import { Doughnut } from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto'

const SERVER = 'localhost:3001';
let dati = [];
  
class GraficiProduzione extends React.Component{
    constructor(props){
        super(props)
        this.gestioneDati = this.gestioneDati.bind(this);
        this.state = {
            todayDate: new Date(),
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
    this.endpoint = `http://${SERVER}/grafici?data=${this.state.todayDate}`;
    }

    render(){
        return (
            <>
            <div className="col-12 container-fluid">
                <Navbar />
                <div className="row">
                    <div className="col-9">
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

    fetchData(){
        fetch(this.endpoint)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var tasks = data
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
        console.log(this.state.labels);
    }
}



export default GraficiProduzione;