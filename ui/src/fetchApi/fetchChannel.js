const url = process.env.REACT_APP_API_SERVER_URL;

const createChannel = (channelName, jwt) => {
  return fetch(`${url}/api/v1/channel/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify({ name: channelName }),
    mode: "cors",
  });
};

const getAllMembersOfChannel = (channelId, jwt) => {
  return fetch(`${url}/api/v1/channel/${channelId}/members`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwt,
    },
    mode: "cors",
  });
};

export {createChannel, getAllMembersOfChannel};