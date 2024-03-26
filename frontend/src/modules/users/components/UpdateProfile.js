import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';


const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.updateProfile(
                {
                    id: user.id,
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim()
                },
                () => navigate('/'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div className="card mx-auto m-5 updateprofile-card">
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <label htmlFor="firstName" className="col-md-12 col-form-label">
                            <FormattedMessage id="project.global.fields.firstName" />
                        </label>
                        <div className="col-md-12">
                            <input type="text" id="firstName" className="form-control input-user"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                autoFocus
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                        <label htmlFor="lastName" className="col-md-12 col-form-label">
                            <FormattedMessage id="project.global.fields.lastName" />
                        </label>
                        <div className="col-md-12">
                            <input type="text" id="lastName" className="form-control input-user"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                        <label htmlFor="email" className="col-md-12 col-form-label">
                            <FormattedMessage id="project.global.fields.email" />
                        </label>
                        <div className="col-md-12">
                            <input type="email" id="email" className="form-control input-user"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.email' />
                            </div>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-color">
                                <FormattedMessage id="project.global.buttons.save" />
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default UpdateProfile;
