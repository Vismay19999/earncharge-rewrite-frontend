import Cookies from 'js-cookie';

export const setTokens = (accessToken: string, refreshToken: string) => {
    Cookies.set('accessToken', accessToken, { expires: 7 }); 
    Cookies.set('refreshToken', refreshToken, { expires: 30 }); 
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');
