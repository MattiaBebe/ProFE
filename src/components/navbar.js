import React from 'react';
import logoCypag from '../images/logo-cypag.svg';

class Navbar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logoCypag} alt="" width="90" height="44" className="d-inline-block align-text-top" />
                        {/* HERE YOU CAN PUT YOUR DIRECTORY */}
                    </a>
                </div>
            </nav>
        );
    }

}

export default Navbar;