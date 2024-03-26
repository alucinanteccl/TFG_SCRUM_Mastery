import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const ChangePassword = () => {

    const user = useSelector(selectors.getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    let form;
    let confirmNewPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmNewPassword()) {

            dispatch(actions.changePassword(user.id, oldPassword, newPassword,
                () => navigate('/'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');
            
        }

    }

    const checkConfirmNewPassword = () => {

        if (newPassword !== confirmNewPassword) {

            confirmNewPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmNewPasswordChange = event => {

        confirmNewPasswordInput.setCustomValidity('');
        setConfirmNewPassword(event.target.value);
        setPasswordsDoNotMatch(false);

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card updateprofile-card mx-auto m-5 ">
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <label htmlFor="oldPassword" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.users.ChangePassword.fields.oldPassword"/>
                            </label>
                            <div className="col-md-12">
                                <input type="password" id="oldPassword" className="form-control input-user"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                            <label htmlFor="newPassword" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.users.ChangePassword.fields.newPassword"/>
                            </label>
                            <div className="col-md-12">
                                <input type="password" id="newPassword" className="form-control input-user"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                            <label htmlFor="confirmNewPassword" className="col-md-12 col-form-label">
                                <FormattedMessage id="project.users.ChangePassword.fields.confirmNewPassword"/>
                            </label>
                            <div className="col-md-12">
                                <input ref={node => confirmNewPasswordInput = node}
                                    type="password" id="confirmNewPassword" className="form-control input-user"
                                    value={confirmNewPassword}
                                    onChange={e => handleConfirmNewPasswordChange(e)}
                                    required/>
                                <div className="invalid-feedback">
                                    {passwordsDoNotMatch ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-color">
                                    <FormattedMessage id="project.global.buttons.save"/>
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default ChangePassword;
