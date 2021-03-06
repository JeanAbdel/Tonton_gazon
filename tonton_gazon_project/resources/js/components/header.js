import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios';

export default function Nav() {
    //We store the current loggin state into a var
    const [isLogged, setIsLogged] = useState('');
    let history = useHistory();

    if (isLogged !== sessionStorage.getItem('is_logged')) {
        setIsLogged(sessionStorage.getItem('is_logged'));
    }

    //Handle the action of logging out
    let handleLogout = (e) => {
        e.preventDefault();

        axios.get('/api/logout')
            .then(() => {
                //Once the user is disconnected, we can update the sessionStorage and re-render the component via State
                sessionStorage.setItem('access_token', '');
                sessionStorage.setItem('is_logged', 'false');
                sessionStorage.setItem('user', '');
                setIsLogged('false');
                history.push('/');
            })
    };

    //This JSX display the different authentication buttons, depending on the current logging state of the user
    let jsxAuth = () => {
        if (isLogged === "true") {
            return (
                <>
                    <Link to="/mon-profil" className="navbar_element btn btn_primary">Mon profil</Link>
                    <a className="navbar_element btn btn_secondary" onClick={(e) => handleLogout(e)}>Logout</a>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/login" className="navbar_element btn btn_secondary">Connexion</Link>
                    <Link to="/register" className="navbar_element btn btn_primary"> Inscription </Link>
                </>
            );
        }
    };

    let jsxAdvert = () => {
        if (isLogged === "true") {
            return(
                <>
                    <Link to="/create_advert" className="navbar_element">Créer une annonce</Link>
                </>
            )
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar_group navbar_brand">
                    <a className="navbar_element navbar_brand_group" href="/">
                        <img src="/img/logo_noir.png" alt="Logo Tonton Gazon" className="navbar_brand_logo"></img>
                        <p className="navbar_brand_name">Tonton Gazon</p>
                    </a>
                </div>
                <div className="navbar_group navbar_links">
                    <a href="/" className="navbar_element">Accueil</a>
                    <a href="/adverts?page=1&equipment=false&type=0" className="navbar_element">Voir les annonces</a>
                    {jsxAdvert()}
                    <a href="/contact" className="navbar_element">Contact</a>
                </div>
                <div className="navbar_group navbar_authentication">
                    {jsxAuth()}
                </div>
            </nav>

            <nav className="navbar_mobile inactive">
                <input id="toggle" type="checkbox"></input>
                <label htmlFor="toggle" className="navbar_hamburger">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </label>

                <div className="nav">
                    <div className="navbar_wrapper">
                        <div className="navbar_common">
                            <input type="text" className="navbar_search"></input>
                        </div>
                        <div className="navbar_links">
                            <a href="/">Accueil</a><br/>
                            <a href="/adverts?page=1&equipment=false&type=0">Les annonces</a><br/>
                            <a href="/contact">Contact</a><br/>
                        </div>
                        <div className="navbar_auth">
                            <Link to="/login" className="navbar_element btn btn_secondary_white">Connexion</Link>
                            <Link to="/register" className="navbar_element btn btn_primary_white"> Inscription </Link>
                        </div>
                    </div>
                </div>
                <div className="blackFilter"></div>
            </nav>
        </>
    );
}
