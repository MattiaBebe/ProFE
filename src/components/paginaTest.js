import React, { useState } from "react";
import {data} from './dati';

const ArrayState = () => {
    const [people, setPeople] = useState(data);
    console.log(data);


    const removeItem = (id) => {
        let newPeople = people.filter( (el) => el.id !== id);
        setPeople(newPeople);
    }

    const cliccami = () => {
        console.log("cliccato");
    }

    return (
        <>
            {
                people.map( el => {
                    const {id, name} = el;
                    return (
                        <>
                        <input type="button" onClick={() => cliccami()}>click me </input>
                        <div key={id} className="item shadow">
                            <h5> {name} </h5>
                            <button onClick={() => removeItem(id)} type="button" className="button delete-button"> X </button>
                        </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default ArrayState;
