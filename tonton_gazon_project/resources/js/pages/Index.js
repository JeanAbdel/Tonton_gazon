import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { sliderHome } from '../helpers';

export default function Index() {

    const [adverts,setAdverts] = useState([]);
    const [top, setTop] = useState([]);
    const [cpt, setCpt] = useState([]);

    useEffect(() => {
        Axios.get("/api/lastAdverts")
            .then(res => {
                setAdverts(res.data);
            });
    }, [cpt]);


    let AdvertsJSX = adverts.map((advert, index) => {
        return (
            <div className="recent_element" id={index}>
                <img src={JSON.parse(advert.image).image_0}></img>
                <div className="garden_user">
                    <a href="" className="garden_username"> {advert.title}</a>
                    <p className="garden_userstats"><b>4.7</b> 340 avis</p>
                </div>
                <div className="garden_stats">
                    <a href="" className="garden_stats_price btn btn_primary">{Math.round(advert.payout)} €</a>
                    <p className="garden_stats_surface">Superficie : <b>120m²</b></p>
                </div>
            </div>
        );
    });

    useEffect(() => {
        Axios.get("/api/topUsers")
            .then(res => {
                setTop(res.data);
            });
    }, [cpt]);

    let topUserJSX = top.map((user, index) => {
        return (
            <div className="tondeur">
                <img src="/img/tondeur.jpg" alt=""></img>
                <div className="tondeur_info">
                    <a href="" className="tondeur_username">{user.name} {user.surname}</a>
                    <p className="tondeur_userstats"><b>{user.eval}</b> 340 avis</p>
                    <a href={"/profil/" + user.id} className="tondeur_profil btn btn_primary">Voir le profil</a>
                </div>
            </div>
        );
    });

    sliderHome();

    return (
        <>
            <div className="bloc home_presentation">
                <h2>Votre service de tonte de pelouse de particulier à particulier</h2>
                <p>Avec Tonton Gazon, la tonte de votre pelouse n’aura jamais été aussi simple !</p>
                <a href="">Commencez maintenant <img src=""></img></a>
                <img src="/img/home_tonton_gazon.png" alt=""></img>
            </div>

            <div className="bloc home_recent">
                <div className="bloc_title">
                    <img src="/img/waving-hand-sign.png" alt=""></img>
                    <h3>Annonces récentes</h3>
                    <p><a href="">Voir toutes les annonces</a></p>
                </div>

                <div className="recent_list">
                    {AdvertsJSX}
                </div>
            </div>

            <div className="bloc home_explaination">
                <div className="bloc_title">
                    <img src="/img/waving-hand-sign.png" alt=""></img>
                    <h3>Comment ça marche ?</h3>
                </div>
                <div className="explaination_steps">
                    <div className="explaination_step explaination_step_one">
                        <p className="step step_one">01</p>
                        <p className="step_description step_descriptionone"> Inscrivez vous sur Tonton Gazon et complétez votre compte avec vos adresses et votre matériel de jardinage. </p>
                    </div>
                    <div className="explaination_step explaination_step_two">
                        <p className="step step_two">02</p>
                        <p className="step_description step_description_two">Créez ou cherchez une annonce de tonte de pelouse ou d’entretien de jardins</p> <br />
                    </div>
                    <div className="explaination_step explaination_step_three">
                        <p className="step step_three">03</p>
                        <p className="step_description step_description_three">Vous serez mis en relation avec des particuliers de votre région afin de prendre soin de votre jardin</p>
                    </div>
                </div>
            </div>

            <div className="bloc home_tondeurs">
                <div className="bloc_title">
                    <img src="/img/waving-hand-sign.png" alt=""></img>
                    <h3>Les tondeurs à la une</h3>
                    <p><a href="">Voir tous les tondeurs</a></p>
                </div>
                <div className="tondeurs_list">
                    {topUserJSX}
                </div>
            </div>
        </>
    );
}
