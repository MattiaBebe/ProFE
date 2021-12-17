import React from "react";
import Navbar from "./navbar";
import '../CssFile/visualizzazioneOrdine.css';

const SERVER = 'localhost:3001';

class PaginaVisualizzazioneOrdine extends React.Component{
    constructor(props){
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            header: [
                <>
                    <tr>
                        <th> Codice </th>
                        <th> Descrizione </th>
                        <th> Qta </th>
                        <th> U.m. </th>
                        <th> Ubicaz. </th>
                    </tr>
                </>
            ],
            rows: [],
            baseEndpoint : `http://${SERVER}/vistaOrdine?ordine=${props.ordine}`
        };
    }

    componentDidMount(){
        this.fetchData(this.props.ordine)
    }

    fetchData(props){
        let data_rows = [];
        const {ordine} = props;
        fetch(this.state.baseEndpoint)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var datoOrdine = data
          datoOrdine.forEach( ordine => {
            var row = [];

        const {AUFNR, MATNR, MAKTX, ENMG, BDMNG, MEINS, UBI2} = ordine;

          row.push(
              <td key={'Codice'}> {MATNR} </td>
           )

          row.push(<td key={'Descrizione'}>{MAKTX}</td>);
          row.push(<td key={'Qta'}>{BDMNG}</td>);
          row.push(<td key={'U.m'}>{MEINS}</td>);
          row.push(<td key={'Ubicaz.'}>{UBI2}</td>);

          data_rows.push(<tr key={'row_' + data_rows.length}>{row}</tr>)
        })
        this.setState({rows: data_rows});
        })
        .catch(error => console.log('error', error))
    }

    render(){
        return(
            <>
                <Navbar />
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-7">
                        <div className="row">
                            ordine numero: {this.props.ordine}
                        </div>
                        <div className="row">
                            Cliente: {this.props.cliente}
                        </div>
                        <div className="row">
                            Codice: {this.props.code}
                        </div>
                    </div>
                    <div className="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16" onClick={this.props.funzioneRitorno}>
                        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                        </svg>
                    </div>
                </div>
                <div className="tableDiv">
                  <table className="table">
                      <thead width="100%">
                          {this.state.header}
                      </thead>
                      <tbody>
                          {this.state.rows}
                      </tbody>
                  </table>
                  <div className="row">
                      <div className="col-5"></div>
                      <div className="col-7">
                          <a href="mailto:technical@cypag.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-envelope-exclamation-fill" viewBox="0 0 16 16" className="mailto">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"/>
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                            </svg>
                          </a>
                      </div>
                  </div>
                  </div>
            </>
        )
    }

}

export default PaginaVisualizzazioneOrdine;