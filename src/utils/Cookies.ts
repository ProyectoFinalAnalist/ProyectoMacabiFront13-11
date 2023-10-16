export function setCookie(value, name = "usuario", expirationDays = 7) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  const cookieString = `${name}=${JSON.stringify(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

export function getCookie(name = "usuario") {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}

export function removeCookie(name = "usuario") {
  setCookie(null, name, -1000);
  //location.reload();
}

export function getCookieJSON(name = "usuario") {
  const cookie = getCookie(name);
  if (!!cookie) {
    return JSON.parse(cookie);
  }
  return null;
}

export function getRolFromCookie() {
  const cookieData = getCookieJSON();
  if (cookieData && cookieData.Rol) {
    return cookieData.Rol.tipo;
  }
  return null; 
}

export function getIdUsuarioFromCookie() {
  const cookieData = getCookieJSON();
  if (cookieData && cookieData.idUsuario) {
    return cookieData.idUsuario.toString();
  }
  return null; 
}
