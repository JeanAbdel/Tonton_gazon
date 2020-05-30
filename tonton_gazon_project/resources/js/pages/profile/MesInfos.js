import React, {useEffect, useState} from 'react'
import axios from "axios";
import FormData from "form-data";


export default function MesInfos() {
    const [data, setData] = useState({});

    //Fetch the data regarding the current user's profile
    useEffect(() => {
        axios.get('/api/userInformations', {
                params: {
                    id: sessionStorage.getItem('user')
                }
            }
        ).then(res => {
            setData(res.data);
            console.log(res.data);
        });
    }, []);

    let handleChange = () => {
        let data = new FormData();
        let img = document.getElementById('profile_pic').files[0];
        if (img !== undefined) {
            data.append('image', img, img.name);
        }

        axios({
            method: 'post',
            url: '/api/updateInformations',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            window.location.reload();
        })
    };

    if( data.hasOwnProperty("User") ) {
        return (
            <div class="mes-infos">
            <div class="formulaire">
                <form className="bloc bloc_form">
                    <div className="form_group">
                        <label className="form_label">Nom</label>
                        <input className="form_input" type="text" defaultValue={data.User.name ? data.User.name : ''} placeholder="Votre nom"></input>
                    </div>

                    <div className="form_group">
                        <label className="form_label">Prénom</label>
                        <input className="form_input" type="text" defaultValue={data.User.surname ? data.User.surname : ''} placeholder="Votre prénom"></input>
                    </div>

                    <div className="form_group">
                        <label className="form_label">Adresse e-mail</label>
                        <input className="form_input" type="text" defaultValue={data.User.email ? data.User.email : ''} placeholder="Votre adresse e-mail"></input>
                    </div>

                    <div className="form_group">
                        <label className="form_label">Numéro de téléphone</label>
                        <input className="form_input" type="text" defaultValue={data.User.phone_number ? data.User.phone_number : ''} placeholder="Votre numéro de téléphone"></input>
                    </div>

                    <div className="form_group">
                        <label className="form_label">À propos de moi</label>
                        <textarea className="form_input"cols="30" rows="5" defaultValue={data.User.about_me ? data.User.about_me : ''} placeholder="Présentez vous en quelques lignes..."></textarea>
                    </div>

                    <div className="button_group">
                        <a href="" className="btn btn_primary">Sauvegarder</a>
                        <a href="" className="btn btn_secondary">Annuler les modifications</a>
                    </div>
                </form>
            </div>
            <div class="sidebar">
                <h3>Votre porte monnaie</h3>
                <div class="card">
                    <div class="stat">
                        <span class="text">Solde actuel</span>
                        <span class="num">13,00 €</span>
                        <a class="btn btn_primary" href="">Ajouter des fonds</a>
                    </div>
                </div>
                <h3>Vos notifications</h3>
                <div class="card">
                    <div class="stat notif">
                        <span class="text">Vous avez un nouveau message</span>
                        <a class="btn btn_primary" href="">Voir les notifications</a>
                    </div>
                </div>
            </div>
        </div>
        )
    } else {
        return ( <></> )
    }
};
