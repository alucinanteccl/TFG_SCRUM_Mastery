import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';
import '../../../styles.css'


const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    let form;
    let confirmPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmPassword()) {

            dispatch(actions.signUp(
                {
                    userName: userName.trim(),
                    password: password,
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim()
                },
                () => navigate('/'),
                errors => setBackendErrors(errors),
                () => {
                    navigate('/users/login');
                    dispatch(actions.logout());
                }
            ));


        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {

            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div className="card border-dark mx-auto m-5 signup-card">
                <h5 className="card-header">
                    <FormattedMessage id="project.users.SignUp.title" />
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate
                        onSubmit={e => handleSubmit(e)}>
                        <label htmlFor="userName" className="col-md-3 col-form-label">
                            <FormattedMessage id="project.global.fields.userName" />
                        </label>
                        <div className="col-md-12">
                            <input type="text" id="userName" className="form-control input-user"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                autoFocus
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                        <label htmlFor="password" className="col-md-4 col-form-label">
                            <FormattedMessage id="project.global.fields.password" />
                        </label>
                        <div className="col-md-12">
                            <input type="password" id="password" className="form-control input-user"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                        <label htmlFor="confirmPassword" className="col-md-8 col-form-label">
                            <FormattedMessage id="project.users.SignUp.fields.confirmPassword" />
                        </label>
                        <div className="col-md-12">
                            <input ref={node => confirmPasswordInput = node}
                                type="password" id="confirmPassword" className="form-control input-user"
                                value={confirmPassword}
                                onChange={e => handleConfirmPasswordChange(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                {passwordsDoNotMatch ?
                                    <FormattedMessage id='project.global.validator.passwordsDoNotMatch' /> :
                                    <FormattedMessage id='project.global.validator.required' />}
                            </div>
                        </div>
                        <label htmlFor="firstName" className="col-md-6 col-form-label">
                            <FormattedMessage id="project.global.fields.firstName" />
                        </label>
                        <div className="col-md-12">
                            <input type="text" id="firstName" className="form-control input-user"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.required' />
                            </div>
                        </div>
                        <label htmlFor="lastName" className="col-md-6 col-form-label">
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
                        <label htmlFor="email" className="col-md-6 col-form-label">
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
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="project.users.SignUp.title" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default SignUp;
