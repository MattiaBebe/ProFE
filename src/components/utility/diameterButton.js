import React from "react";
import '../../CssFile/pulsantiSelezione.css';

 const DiameterButton = (params) => {
    const {diametro, buttonClick} = params;
    return (

        <>
                <input type="button" value={diametro} onClick={buttonClick} className="selezioneDiametro"/>      
        </>
    )
}

export default DiameterButton;