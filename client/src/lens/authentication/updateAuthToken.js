const updateAuthToken = async () => {
    const authTx = await (localStorage.getItem("refresh_token"));
    localStorage.setItem("auth_token", authTx.data.authenticate.accessToken);
    localStorage.setItem("refresh_token", authTx.data.authenticate.refreshToken);
};
