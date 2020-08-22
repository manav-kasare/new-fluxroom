import constants from '../../shared/constants';
import base64 from 'react-native-base64';

export const loginUserWithUsername = ({username, password}) => {
  return fetch(
    `http://${constants.localIP}:8000/user/loginWithUsername?username=${username}&password=${password}`,
  )
    .then((response) => response.json())
    .then(({data}) => {
      return data;
    });
};

export const loginUserWithEmail = ({email, password}) => {
  return fetch(
    `http://${constants.localIP}:8000/user/loginWithEmail?email=${email}&password=${password}`,
  )
    .then((response) => response.json())
    .then(({data}) => {
      return data;
    });
};

export const createUser = ({id, email, password}) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({_id: id, email: email, password: password}),
  };

  return fetch(`${constants.url}/user/create`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('API CALL DATA', data);
      return data;
    });

  // return fetch(
  //   `http://${constants.localIP}:8000/user/add?email=${email}&password=${password}&id=${id}`,
  // )
  //   .then((response) => response.text())
  //   .then(async (responseText) => {
  //     const emailResponse = await emailConfirmation(id, email);
  //     if (emailResponse === 'success') {
  //       return responseText;
  //     } else {
  //       return 'error';
  //     }
  //   });
};

export const getUsers = () => {
  return fetch(`http://${constants.localIP}:8000/users`)
    .then((response) => response.json())
    .then(({data}) => {
      return data;
    });
};

// export const getUserInfo = (id) => {
//   return fetch(`http://${constants.localIP}:8000/user/info?id=${id}`)
//     .then((response) => response.json())
//     .then(({data}) => {
//       return data[0];
//     });
// };

export const getUserInfo = (id) => {
  return fetch(`http://${constants.url}/user/${id}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getUserChatRooms = (id) => {
  return fetch(`http:${constants.localIP}:8000/user/chatrooms?userID=${id}`)
    .then((response) => response.json())
    .then((responseJSON) => {
      const object = JSON.parse(responseJSON[0].chatrooms);
      const roomList = object.chatrooms;
      return roomList;
    });
};

export const getChatroomInfo = (id, reason) => {
  return fetch(`http://${constants.localIP}:8000/chatroom/getInfo?roomID=${id}`)
    .then((response) => response.json())
    .then((data) => {
      switch (reason) {
        case 'host':
          const membersObject = JSON.parse(data[0].members);
          const hostID = membersObject.host;
          return hostID;
        case 'room':
          return data[0];
      }
    });
};

export const sendFriendRequest = (fromID, toID) => {
  return fetch(
    `http://${constants.localIP}:8000/sendRequest?fromID=${fromID}&toID=${toID}`,
  )
    .then((response) => response.text())
    .then((reponseText) => {
      return reponseText;
    });
};

export const acceptFriendRequest = (userID, friendID) => {
  return fetch(
    `http://${constants.localIP}:8000/addFriend?friendID=${friendID}&userID=${userID}`,
  )
    .then((response) => response.text())
    .then((reponseText) => {
      return reponseText;
    });
};

export const declineFriendRequest = (userID, friendID) => {
  return fetch(
    `http://${constants.localIP}:8000/declineRequest?friendID=${friendID}&userID=${userID}`,
  )
    .then((response) => response.text())
    .then((reponseText) => {
      return reponseText;
    });
};

export const removeFriend = (userID, friendID) => {
  return fetch(
    `http://${constants.localIP}:8000/removeFriend?friendID=${friendID}&userID=${userID}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const createRoom = (userID, room) => {
  const encodedUri = base64.encode(room.profilePhoto);

  return fetch(
    `http://${constants.localIP}:8000/chatroom/create?userID=${userID}&roomID=${room.id}&name=${room.name}&profilePhoto=${encodedUri}&description=${room.description}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const updateDescription = (id, description) => {
  return fetch(
    `http://${constants.localIP}:8000/user/updateDescription?description=${description}&id=${id}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const updateProfilePhoto = (id, uri) => {
  const encodedUri = base64.encode(uri);

  return fetch(
    `http://${constants.localIP}:8000/user/updateProfilePhoto?id=${id}&profilePhoto=${encodedUri}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const updateUsernameDescription = ({id, username, description}) => {
  return fetch(
    `http://${constants.localIP}:8000/user/updateUsernameDescription?userID=${id}&username=${username}&description=${description}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const checkIfEmailIsRegistered = (email) => {
  return fetch(
    `http://${constants.localIP}:8000/isEmailRegistered?email=${email}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const checkIfUsernameIsRegistered = (username) => {
  return fetch(
    `http://${constants.localIP}:8000/isUsernameRegistered?username=${username}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const emailConfirmation = (id, email) => {
  return fetch(
    `http://${constants.localIP}:8000/emailConfirmation?toEmail=${email}&userID=${id}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const forgotPassword = (email) => {
  return fetch(
    `http://${constants.localIP}:8000/forgotPassword?toEmail=${email}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const verifyPassword = (id, currentPass) => {
  return fetch(
    `http://${constants.localIP}:8000/user/verifyPassword?id=${id}&password=${currentPass}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

export const changePassword = (id, newPass) => {
  return fetch(
    `http://${constants.localIP}:8000/user/changePassword?id=${id}&password=${newPass}`,
  )
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};
