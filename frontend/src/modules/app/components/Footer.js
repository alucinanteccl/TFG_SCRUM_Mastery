import {FormattedMessage} from 'react-intl';

const Footer = () => (

    <div className='bg-*'>
        <footer className='fixed-bottom p-2'>
            <p className="text-center text-white">
                <FormattedMessage id="project.app.Footer.text"/>
            </p>
        </footer>
    </div>

);

export default Footer;
