import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import React, { useRef } from 'react';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import image from "./Resources/default.jpg";
import imagees from "./Resources/españa.png";
import imagegl from "./Resources/galicia.png";
import imageen from "./Resources/english.png";
import image2 from "./Resources/edit.png";
import { initReactIntl } from '../../../i18n';


const UserProfile = () => {
    const { locale, messages } = initReactIntl();
    const inputRef = useRef(null);
    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    let form;
    let formrole;
    let formlanguage;

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleSubmit = event => {

        event.preventDefault();
        if (form.checkValidity()) {
            const file = inputRef.current.files[0]; // Get the file from the input
            const formData = new FormData(form);
            formData.append('file', file);
            dispatch(actions.changeImage(user, formData,
                () => { },
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const handleSubmitRole = (role) => {

        if (formrole.checkValidity()) {
            dispatch(actions.changeRole(user, role,
                () => { },
                errors => setBackendErrors(errors)));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    const handleSubmitLanguage = (language) => {

        if (formlanguage.checkValidity()) {
            dispatch(actions.changeLanguage(user, language,
                () => { },
                errors => setBackendErrors(errors)));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div className="card mx-auto m-5 userprofile-card">
                <div className="card-body d-flex">
                    <form ref={node => form = node} className="needs-validation" noValidate>
                        <input
                            style={{
                                display: 'none',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                transition: 'none',
                                animation: 'none'
                            }}
                            ref={inputRef}
                            type="file"
                            onChange={handleSubmit}
                        />
                    </form>
                    <button className='image-container btn m-5' onClick={handleClick} >

                        {user.image ?
                            <img src={"data:image/jpg;base64," + user.image} alt="" class="rounded-circle shadow-4-strong" ></img>
                            :
                            <img src={image} alt="Cambiar imagen" class="imagen-cambiante rounded-circle shadow-4-strong" />
                        }
                        <img src={image2} alt="" title='Cambiar imagen' class="overlay" />
                    </button>
                    <div className='ml-5'></div>
                    <div className='ml-5'>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.firstName" />:
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label">
                            {user.firstName}
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.lastName" />:
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label">
                            {user.lastName}
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.userName" />:
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label">
                            {user.userName}
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.email" />:
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label">
                            {user.email}
                        </label>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.role" />:
                        </label>
                        <form ref={node => formrole = node} className="needs-validation" noValidate>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.role}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <label class="dropdown-item" onClick={() => handleSubmitRole("d")}>Development team</label>
                                    <label class="dropdown-item" onClick={() => handleSubmitRole("s")}>SCRUM master</label>
                                    <label class="dropdown-item" onClick={() => handleSubmitRole("p")}>Product owner</label>
                                </div>
                            </div>
                        </form>
                        <label htmlFor="firstName" className="col-md-12 col-form-label font-weight-bold">
                            <FormattedMessage id="project.global.fields.language" />:
                        </label>
                        <form ref={node => formlanguage = node} className="needs-validation" noValidate>
                            <div class="dropdown">
                                {user.language ?
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.language}
                                    </button>
                                    :
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {locale}
                                    </button>
                                }
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <label class="dropdown-item d-flex" onClick={() => handleSubmitLanguage("gl")}>
                                        <img src={imagegl} alt="" height={15} width={20} className='mr-2 mt-1' />
                                        Galego
                                    </label>
                                    <label class="dropdown-item" onClick={() => handleSubmitLanguage("es")}>
                                        <img src={imagees} alt="" height={20} width={20} className='mr-2' />
                                        Español
                                    </label>
                                    <label class="dropdown-item" onClick={() => handleSubmitLanguage("en")}>
                                        <img src={imageen} alt="" height={20} width={20} className='mr-2' />
                                        English
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default UserProfile;
