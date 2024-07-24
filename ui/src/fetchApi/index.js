const url = process.env.REACT_APP_API_SERVER_URL || "http://localhost:8081";

const client = {
  signup: (form) => {
    return fetch(`${url}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  },

  login: (form) => {
    return fetch(`${url}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  },

  authenticate: (jwt) => {
    return fetch(`${url}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      mode: "cors",
    });
  },

  createChannel: (channelName, jwt) => {
    return fetch(`${url}/api/v1/channels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name: channelName }),
      mode: "cors",
    });
  },

  getAllChannelsOfUser: (jwt) => {
    return fetch(`${url}/api/v1/channels`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      mode: "cors",
    });
  },

  getAllMembersOfChannel: (channelId, jwt) => {
    return fetch(`${url}/api/v1/channels/${channelId}/members`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
      mode: "cors",
    });
  },

  findUsersByEmail: (email, jwt) => {
    return fetch(`${url}/api/v1/users?q=${email}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
      },
      mode: "cors",
    });
  },

  addMembersToChannel: (jwt, channelId, userIdList) => {
    return fetch(`${url}/api/v1/channels/${channelId}/members`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      mode: 'cors',
      body: JSON.stringify({userIds: userIdList}),
    })
  }
};

export default client;
