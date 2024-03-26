import * as actionTypes from './actionTypes';
import backend from '../../backend';

const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signUpCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback);

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
            }
        },
        reauthenticationCallback
    );


export const logout = () => {

    backend.userService.logout();

    return { type: actionTypes.LOGOUT };

};

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user,
        user => {
            dispatch(updateProfileCompleted(user));
            onSuccess();
        },
        onErrors);

export const changeImageCompleted = user => ({
    type: actionTypes.CHANGE_IMAGE_COMPLETED,
    user
})

export const changeImage = (user, file, onSuccess, onErrors) => dispatch =>
    backend.userService.changeUserImage(user, file,
        (user) => {
            dispatch(changeImageCompleted(user));
            onSuccess();
        },
        onErrors);

export const changeRoleCompleted = user => ({
    type: actionTypes.CHANGE_ROLE_COMPLETED,
    user
})

export const changeRole = (user, role, onSuccess, onErrors) => dispatch =>
    backend.userService.changeRole(user.id, role,
        (user) => {
            dispatch(changeRoleCompleted(user));
            onSuccess();
        }, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => dispatch =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);