import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const LoginButton = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <div>
      <h1>Moralis Hello World!</h1>
      {!isAuthenticated && (
        <button onClick={login}>Moralis Metamask Login</button>
      )}
      {isAuthenticated && (
        <button onClick={logOut} disabled={isAuthenticating}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginButton;
