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
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logoCypag} alt="" width="90" height="44" className="d-inline-block align-text-top" />
                    </a>
                    <a>
                        {this.controlloPagina()}
                    </a>
                </div>
            </nav>
        );
    }

}

export default Navbar;