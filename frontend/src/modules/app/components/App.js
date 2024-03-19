import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

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

    return (
        <div className='container_init fixed-bottom'>
            <Header/>
            <Body/>
            <br/>
            <br/>
            <Footer/>
        </div>
        


    );

}
    
export default App;
