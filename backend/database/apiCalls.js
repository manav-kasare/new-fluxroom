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
    .then((response) => {
      console.log(response);
      return response.json();
    })
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
    headers: {
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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/me`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
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
  return fetch(`${url}/getbyphone?phone=${phoneNumber}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const updateProfilePhoto = (token) => {
  const requestOptions = {
    method: 'GET',
    header: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(`${url}/uploadimage`, requestOptions)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

export const getAllRooms = () => {
  return fetch(`${url}/rooms`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
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

  return fetch(`${url}/createroom`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const joinRoom = (id, token) => {
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

export const acceptInvitation = () => {};

export const getChatroomInfo = (id) => {
  return fetch(`${url}/room/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
