const url = process.env.REACT_APP_API_SERVER_URL;

const ngrokHeader = {
  "ngrok-skip-browser-warning": "true",
}

const client = {
  signup: (form) => {
    return fetch(`${url}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        ...ngrokHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  },

  login: (form) => {
    return fetch(`${url}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        ...ngrokHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  },

  authenticate: (jwt) => {
    return fetch(`${url}/api/v1/auth/authenticate`, {
      headers: {
        ...ngrokHeader,
        Authorization: `Bearer ${jwt}`,
      },
      mode: "cors",
    });
  },

  createChannel: (channelName, jwt) => {
    return fetch(`${url}/api/v1/channel/create`, {
      method: "POST",
      headers: {
        ...ngrokHeader,
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name: channelName }),
      mode: "cors",
    });
  },

  getAllChannelsOfUser: (jwt) => {
    return fetch(`${url}/api/v1/channel/allOfUser`, {
      method: "GET",
      headers: {
        ...ngrokHeader,
        Authorization: `Bearer ${jwt}`,
      },
      mode: "cors",
    });
  },

  getAllMembersOfChannel: (channelId, jwt) => {
    return fetch(`${url}/api/v1/channel/${channelId}/members`, {
      method: "GET",
      headers: {
        ...ngrokHeader,
        Authorization: "Bearer " + jwt,
      },
      mode: "cors",
    });
  },

  findUsersByEmail: (email, jwt) => {
    return fetch(`${url}/api/v1/users/q=${email}`, {
      method: "GET",
      headers: {
        ...ngrokHeader,
        Authorization: "Bearer " + jwt,
      },
      mode: "cors",
    });
  },

  addMembersToChannel: (jwt, channelId, userIdList) => {
    return fetch(`${url}/api/v1/channel/${channelId}/add`, {
      method: 'POST',
      headers: {
        ...ngrokHeader,
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      mode: 'cors',
      body: JSON.stringify({userIds: userIdList}),
    })
  }
};

export default client;
