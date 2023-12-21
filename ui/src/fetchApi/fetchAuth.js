const url = process.env.REACT_APP_API_SERVER_URL;

const signup = (form) => {
  return fetch(`${url}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

const login = (form) => {
  return fetch(`${url}/api/v1/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

export {signup, login};