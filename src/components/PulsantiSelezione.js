import React from "react";
import '../CssFile/tabellaOrdini.css';

const PulsantiSelezione = (props) => {
    
    const {onclick, stato} = props;

    if(stato[0].clicked == true){
        document.getElementById("codice").checked = false;
    }
    else if(stato[1].clicked == true){
        document.getElementById("data").checked = false;
    }

    return(
        <>
            <div className="selectionContainer">
                <div>
                    TIPOLOGIA DI ORDINAMENTO 
                </div>
                <div className="radioButton">
                    <input id="data" key="data" value="data" type="radio" onClick={onclick}/> Data
                    <input id="codice" key={'codice'} value="codice" type="radio" onClick={onclick}/> Codice  
                </div>
            </div>
        </>
    );

}

export default PulsantiSelezione;