import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout, UserProfile} from '../../users';
import {Summary} from '../../projects';
import users from '../../users';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (
        <div>
            <AppGlobalComponents/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/projects/summary" element={<Summary/>}/>}
                {loggedIn && <Route path="/users/user-profile" element={<UserProfile/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
            </Routes>
        </div>

    );

};

export default Body;
