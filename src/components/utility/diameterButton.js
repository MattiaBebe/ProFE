import React from "react";

 const DiameterButton = (params) => {
    const {diametro, buttonClick} = params;
    return (

        <>
            <li key={diametro}>
                <input type="button" value={diametro} onClick={buttonClick}/>      
            </li>
        </>
    )
}

export default DiameterButton;