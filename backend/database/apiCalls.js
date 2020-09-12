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

export const addRoomToUser = (token, roomId) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/addroomtouser?roomid=${roomId}`, requestOptions)
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
  console.log('[Fetching all rooms]');
  return fetch(`${url}/rooms`)
    .then((response) => response.json())
    .then((data) => {
      console.log('[Got data]');
      return data;
    });
};

export const createRoom = (room) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(room),
  };

  return fetch(`${url}/createroom`, requestOptions)
    .then((response) => response.json())
    .then((_room) => {
      console.log('[Create Room]', _room);
      return _room;
    });
};

export const joinRoom = async (roomId, token) => {
  console.log('[Join room api call]');
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return fetch(`${url}/addusertoroom?roomid=${roomId}`, requestOptions).then(
      () => {
        console.log('[Add user to room]');
        return fetch(`${url}/addroomtouser?roomid=${roomId}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log('[Add room to user]', data);
            return data;
          });
      },
    );
  } catch (err) {
    console.log('[Join Room Error]', err);
  }
};

export const addUserToRoom = (token, roomId) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(`${url}/addusertoroom?roomid=${roomId}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('[Add room to user]', data);
      return data;
    });
};

export const acceptInvitation = () => {};

export const getChatroomInfo = (id) => {
  console.log('[ID]', id);
  return fetch(`${url}/room/${id}`)
    .then((response) => response.text())
    .then((data) => {
      const responseJson = JSON.parse(data);
      console.log('[Chatroom info data]', responseJson);
      return responseJSON;
    });
};

export const sendNotifactionFirebaseApi = (message, apiKey) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'key=' + apiKey,
    },
    body: JSON.stringify(message),
  };

  return fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
