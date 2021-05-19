export const tokenConfig = (getState) => {
  // get token from localstorage
  const { token } = getState().authState;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
};
