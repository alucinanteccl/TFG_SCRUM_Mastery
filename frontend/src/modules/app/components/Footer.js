import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import range from 'lodash.range';

import users from '../../users';

const Footer = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const textClass = loggedIn ? 'jiji' : 'text-white';
    const numOfColumns = 5;
    const staggeredDelay = 60;

    return (
        <div className='bg-light mx-auto'>
            <footer className='fixed-bottom p-2 d-flex justify-content-center'>
                <p className={`text-center ${textClass}`}>
                    <FormattedMessage id="project.app.Footer.text" />
                </p>
                <div className="flag pl-3">
                    {range(numOfColumns).map((columnIndex) => (
                        <div
                            key={columnIndex}
                            className="column"
                            style={{
                                animationDelay: columnIndex * staggeredDelay + 'ms',
                            }}
                        />
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default Footer;
