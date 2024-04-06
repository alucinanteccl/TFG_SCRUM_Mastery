import { config, appFetch, fetchConfig, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback } from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', { userName, password }),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

}

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/users/signUp', config('POST', user),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) =>
    appFetch(`/users/${id}/changePassword`,
        config('POST', { oldPassword, newPassword }),
        onSuccess, onErrors);

export const changeRole = (id, role, onSuccess, onErrors) => {
    const path = `/users/${id}/changeRole`;
    const body = { role }; 
    const options = config('POST', body);

    appFetch(path, options, onSuccess, onErrors);
};

export const changeLanguage = (id, language, onSuccess, onErrors) => {
    const path = `/users/${id}/changeLanguage`;
    const body = { language }; 
    const options = config('POST', body);

    appFetch(path, options, onSuccess, onErrors);
};

export const changeUserImage = (user, file, onSuccess) => {
    const formData = new FormData();
    formData.append('file', file);
    appFetch(`/users/${user.id}/changeImage`, fetchConfig("PUT", file),
        onSuccess);
}



