import React from "react";
import Navbar from "./navbar";
import '../CssFile/visualizzazioneOrdine.css';

const SERVER = 'localhost:3001';

class PaginaVisualizzazioneOrdine extends React.Component{
    constructor(props){
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.generaCorse = this.generaCorse.bind(this);
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

    generaCorse(){
        if(this.props.corsaAsta != '                              '){
            return(
                <>
                <div className="row">
                        <div className="col-3 indice">
                            Corsa Asta:    
                        </div>
                        <div className="col-6">
                            {this.props.corsaAsta}  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 indice">
                            Corsa Cilindro:    
                        </div>
                        <div className="col-6">
                            {this.props.CorsaCilindro}  
                        </div>
                    </div>
                </>
            )
        }
    }

    apriDisegno(disegno){
        window.open(disegno, '_blank', 'noreferrer');
        console.log(disegno)
    }

    render(){
        return(
            <>
                <Navbar />
                <div className="row paddingTop">
                    <div className="col-3">

                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="col-3 indice">
                                Ordine numero:    
                            </div>
                            <div className="col-2">
                                {this.props.ordine}   
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 indice">
                                Cliente:    
                            </div>
                            <div className="col-6">
                                {this.props.cliente}  
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 indice">
                                Codice:    
                            </div>
                            <div className="col-6">
                                {this.props.code}  
                            </div>
                        </div>
                        {this.generaCorse()}
                        <div className="row">
                            <div className="col-3 indice">
                                Quantità:    
                            </div>
                            <div className="col-6">
                                {this.props.qta}  
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16" onClick={this.props.funzioneRitorno}>
                        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                        </svg>
                        <br></br> <br></br>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-file-earmark-pdf" viewBox="0 0 16 16" onClick={() => this.apriDisegno(this.props.disegno)}>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                        <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                        </svg>
                    </div>
                </div>
                <div className="tableDiv paddingBottom">
                  <table className="table">
                      <thead width="100%">
                          {this.state.header}
                      </thead>
                      <tbody>
                          {this.state.rows}
                      </tbody>
                  </table>
                </div>
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
            </>
        )
    }

}

export default PaginaVisualizzazioneOrdine;