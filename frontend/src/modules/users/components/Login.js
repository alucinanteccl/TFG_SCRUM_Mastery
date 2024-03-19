import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Errors } from '../../common';
import * as actions from '../actions';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.login(
                userName.trim(),
                password,
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

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />
            <div className="card mx-auto m-5 border-dark login-card">
                <h5 className="card-header">
                    <FormattedMessage id="project.users.Login.title" />
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate
                        onSubmit={e => handleSubmit(e)}>

                        <label htmlFor="userName" className="col-md-4 col-form-label">
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
                        <br></br>
                        <div className="text-center">
                            <div className="">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.users.Login.title" />
                                </button>
                            </div>
                        </div>
                        <br></br>
                        <p className="text-center">
                            <Link to="/users/signup">
                                <FormattedMessage id="project.users.SignUp.title" />
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Login;
