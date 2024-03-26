import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import users from '../../users';
import logo from './Resources/Logo_mini.png'

const Header = () => {

    const userName = useSelector(users.selectors.getUserName);
    const user = useSelector(users.selectors.getUser);
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const navbarClass = loggedIn ? 'navbar-in' : 'jiji shadow-lg';

    return (

        <nav className={`navbar navbar-expand-lg navbar-light bg-* ${navbarClass}`} >
            <Link className="navbar-brand text-white" to="/">
                <div>
                    <img id="logo" src={logo} height={30} class='pr-3' alt=''></img>
                    SCRUM Mastery
                </div>
            </Link>
            <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto">
                </ul>

                {userName ?

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">

                            <a className="dropdown-toggle nav-link text-white" href="/"
                                data-toggle="dropdown">
                                {user.img ?
                                <span className="fa-solid fa-user"></span>
                                :
                                <img src={"data:image/jpg;base64," + user.image} alt="" class="rounded-circle miniimage shadow-4-strong" ></img>
                                }
                                &nbsp;
                                {userName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <Link className="dropdown-item d-flex" to="/users/user-profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    <FormattedMessage id="project.users.MyProfile.title" />
                                </Link>
                                <Link className="dropdown-item d-flex" to="/users/update-profile">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    <FormattedMessage id="project.users.UpdateProfile.title" />
                                </Link>
                                <Link className="dropdown-item d-flex" to="/users/change-password">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-fill-lock" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    <FormattedMessage id="project.users.ChangePassword.title" />
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/users/logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                    &nbsp;&nbsp;
                                    <FormattedMessage id="project.app.Header.logout" />
                                </Link>
                            </div>

                        </li>

                    </ul>

                    :

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/users/login">
                                <FormattedMessage className="text-light" id="project.users.Login.title" />
                            </Link>
                        </li>
                    </ul>

                }

            </div>
        </nav>

    );

};

export default Header;
