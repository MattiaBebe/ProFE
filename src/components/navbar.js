import React from 'react';
import logoCypag from '../images/logo-cypag.svg';
import OperazioniVarie from './operazioniVarie';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.controlloPagina = this.controlloPagina.bind(this);
    }

    controlloPagina(){
        console.log("test")
        if(this.props.pagina == "paginaFantine"){
            return <>
                    <button onClick={this.props.aPaginaOperazioni}>
                        OPERAZIONI VARIE 
                    </button>
                   </>
        } 
        else if(this.props.pagina == "paginaOperazioniVarie"){
                return <>
                    <button onClick={this.props.aPaginaBase}>
                        PAGINA BASE
                    </button>
                    </>
        }
    }

    render(){
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div className="row container-fluid">
                    <div className='col-3'> 
                        <a className="navbar-brand" href="#">
                            <img src={logoCypag} alt="" width="90" height="54" className="d-inline-block align-text-top" />
                        </a>
                    </div>
                    <div className='col-6'>
                    </div>
                    <div className='col-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="currentColor" class="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
                            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
                        </svg>
                    </div>
                    <div className='col-2'>
                        <a>
                            {this.controlloPagina()}
                        </a>
                    </div>
                </div>
            </nav>
        );
    }

}

export default Navbar;