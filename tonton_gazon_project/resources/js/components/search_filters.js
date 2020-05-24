import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { urlFromFilter } from "../helpers";

export default function SearchFilters(props) {
    let history = useHistory();
    let handleSearch = (e) => {
        e.preventDefault();
        if (document.getElementById('distances').options[document.getElementById('distances').selectedIndex].value !== "") {
            navigator.geolocation.getCurrentPosition(function (pos) {
                history.push(urlFromFilter(1, pos));
            }, function () {
                history.push(urlFromFilter());
                props.updateState();
            });
        } else {
            history.push(urlFromFilter());
            props.updateState();
        }
    };
    let jsxSearch = () => {
        return (
            <>
                <div className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h3>Annonces</h3>
                </div>

                <div id="advert_filter_display" className="bloc_title">
                    <img src="./img/waving-hand-sign.png"></img>
                    <h4>Afficher les filtres</h4>
                    <img src="./img/waving-hand-sign.png"></img>
                </div>

                {/*Search bar*/}
                <div className="advert_filter advert_fitler_search">
                    <input className="advert_search_input" placeholder="Rechercher" type="text" name="search" id="search" />
                    <button className="advert_search_submit" onClick={(e) => handleSearch(e)}>search</button>
                </div>

                {/* Display type */}
                <div className="advert_filter advert_filter_display">
                    <p>Affichage : </p>
                    <a className="option display_option display_grid active" data-display="advert_list_container_grid"
                        alt="Affichage en colonne"></a>
                    <a className="option display_option display_row" data-display="advert_list_container_row"
                        alt="Affichage en ligne"></a>
                </div>

                {/* Advert type */}
                <div className="advert_filter advert_filter_role_display">
                    <p>Annonce de : </p>
                    <a className="option role_option tondeur active" alt="Affichage des annonces de tondeur"></a>
                    <a className="option role_option tondu" alt="Affichage des annonces de tondu"></a>
                </div>

                {/*Min payout for a job*/}
                <div className="advert_filter advert_filter_payout">
                    <label htmlFor="payout">Tarif min</label>
                    <input type="number" name="payout" id="payout" placeholder="0" />
                </div>


                {/*user's eval */}
                <div className="advert_filter advert_filter_rate">
                    <p>Évaluation minimum de l'utilisateur : </p>
                    <fieldset className="rating">
                        <input type="radio" id="star5" name="rating" value="5" /><label class = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label class = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label class = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label class = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label class = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                </div>

                {/*Dates des annonces*/}
                <div className="advert_filter advert_filter_date">
                    <label htmlFor="start_date">Date début (ou simple date si non range)</label>
                    <input type="date" name="start_date" id="start_date" />
                    <br />
                    <label htmlFor="end_date">Date fin (si range)</label>
                    <input type="date" name="end_date" id="end_date" />
                </div>

                <div className="advert_filter advert_filter_range">
                    <p>Distance entre l'annonce et votre domicile : </p>
                    <select name="distances" id="distances">
                        <option value="" defaultValue>-- Choisissez une distance --</option>
                        <option value="5">5 Km</option>
                        <option value="15">15 Km</option>
                        <option value="20">20 Km</option>
                        <option value="25">25 Km</option>
                        <option value="30">30 Km</option>
                        <option value="35">35 Km</option>
                    </select>
                </div>

                <div className="advert_filter advert_filter_equipment">
                    <p>Matériel de tonte à disposition ?</p>
                    <input type="checkbox" name="equipment" id="equipment"/>
                </div>
            </>
        )
    };
    return (
        <>
            {jsxSearch()}
        </>
    )
}
