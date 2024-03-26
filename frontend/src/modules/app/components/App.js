import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import users from '../../users';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
    
    });
    
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const bgClass = loggedIn ? 'container_init_in' : 'container_init';

    return (
        <div className={`fixed-bottom ${bgClass}`}>
            <Header/>
            <Body/>
            <br/>
            <br/>
            <Footer/>
        </div>
    );

}
    
export default App;
