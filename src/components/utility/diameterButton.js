import React from "react";

 const DiameterButton = (params) => {
    const {diametro, buttonClick} = params;
    return (

        <>
        <ul>
            <li key={diametro}>
                <input type="button" value={diametro} onClick={buttonClick}/>      
            </li>
        </ul>
        </>
    )
}

export default DiameterButton;