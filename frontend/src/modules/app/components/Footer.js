import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import users from '../../users';

const Footer = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const textClass = loggedIn ? 'jiji' : 'text-white';

    return (
        <div className='bg-light'>
            <footer className='fixed-bottom p-2'>
                <p className= {`text-center ${textClass}`}>
                    <FormattedMessage id="project.app.Footer.text" />
                </p>
            </footer>
        </div>
    );
};

export default Footer;
