import React, { useState } from "react";
import {data} from './dati';

const ArrayState = () => {
    const [people, setPeople] = useState(data);
    console.log(data);


    const removeItem = (id) => {
        let newPeople = people.filter( (el) => el.id !== id);
        setPeople(newPeople);
    }

    return (
        <>
            {
                people.map( el => {
                    const {id, name} = el;
                    return (
                        <div key={id} className="item shadow">
                            <h5> {name} </h5>
                            <button onClick={() => removeItem(id)} type="button" className="button delete-button"> X </button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ArrayState;
