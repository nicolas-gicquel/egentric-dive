import jwtDecode from "jwt-decode";

let getToken = () => {
  return localStorage.getItem("access_token");
};

let getDecodedToken = () => {
  if (getToken()) {
    return jwtDecode(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

let getExpiryTime = () => {
  // Check si le token est valide et n'a pas expiré
  if (getDecodedToken() && !(getDecodedToken().exp * 1000 < Date.now())) {
    return true;
  } else {
    return localStorage.removeItem("access_token");
    // return false;
  }
};

let getRoles = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    // la valeur de base est un tableau dans un string, on le parse pour faire sauter le string et
    // on le tostring pour faire sauter le tableau, comme ça on a seulement la valeur
    // return JSON.parse(getDecodedToken().role_id).toString();
    return getDecodedToken().role_id;
  } else {
    return false;
  }
};

// let getEmail = () => {
//   // On teste si il y a un token décodé et si il n'a pas expiré
//   if (getExpiryTime()) {
//     return getDecodedToken().email;
//   } else {
//     return false;
//   }
// };

let getPseudo = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    return getDecodedToken().pseudo;
  } else {
    return false;
  }
};

let getId = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    return getDecodedToken().id;
  } else {
    return false;
  }
};

let getFirstname = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    return getDecodedToken().firstname;
  } else {
    return false;
  }
};

let getLastname = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    return getDecodedToken().lastname;
  } else {
    return false;
  }
};
let getPicture = () => {
  // On teste si il y a un token décodé et si il n'a pas expiré
  if (getExpiryTime()) {
    return getDecodedToken().picture;
  } else {
    return false;
  }
};

let loggedAndAdmin = () => {
  // Check si il y a un token valide et check si le rôle est celui d'un admin, répond true quand c'est vrai
  return !!(getExpiryTime() && getRoles() === 1);
};
let loggedAndAdminOrEditorM = () => {
  // Check si il y a un token valide et check si le rôle est celui d'un editorM ou Admin, répond true quand c'est vrai
  return !!((getExpiryTime() && getRoles() === 2) || getRoles() === 1);
};

export default {
  getToken,
  getDecodedToken,
  getRoles,
  // getEmail,
  getPseudo,
  getId,
  getPicture,
  getLastname,
  getFirstname,
  loggedAndAdmin,
  loggedAndAdminOrEditorM,
  getExpiryTime,
};
