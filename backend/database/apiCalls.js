const url = 'https://fluxroom-backend-beta.herokuapp.com';

export const createUser = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return fetch(`${url}/user/create`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const loginUser = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  return fetch(`${url}/login`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const logOutUser = (token) => {
  const requestOptions = {
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/user/logout`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getUsers = () => {
  return fetch(`${url}/allUsers`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getUserMe = (token) => {
  const requestOptions = {
    method: 'GET',
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/me`, requestOptions).then((data) => {
    console.log('ME', data);
    return data;
  });
};

export const getUserInfo = (id) => {
  return fetch(`${url}/user/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getUserChatRooms = (id) => {
  return getUserInfo(id).then((response) => {
    return response.joinedRooms;
  });
};

export const getUserByEmail = (email) => {
  return fetch(`${url}/getbyemail?email=${email}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });
};

export const getUserByPhone = (phoneNumber) => {
  return fetch(`${url}/getbyphone?phone=${phoneNumber}`).then((response) => {
    return response;
  });
};

export const follow = (username, token) => {
  const requestOptions = {
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${url}/follow?username=${username}`, requestOptions).then(
    (response) => {
      return response;
    },
  );
};

export const unfollow = (username, token) => {
  const requestOptions = {
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${url}/unfollow?username=${username}`, requestOptions).then(
    (response) => {
      return response;
    },
  );
};

export const createRoom = (token, room) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(room),
  };

  return fetch(`${url}/room/create`, requestOptions).then((response) => {
    return response;
  });
};

export const joinRoom = ({id, token}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/room/join/${id}`, requestOptions).then((response) => {
    return response;
  });
};

export const getChatroomInfo = (id) => {
  return fetch(`${url}/room/${id}`).then((response) => {
    return response;
  });
};
