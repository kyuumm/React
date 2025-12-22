//封装Token

const TOKENKEY = 'token_key'
//setToken
function setToken(token) {
  localStorage.setItem(TOKENKEY, token)
}
//getToken
function getToken() {
  return localStorage.getItem(TOKENKEY);
}
//removeToken
function removeToken() {
  localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  removeToken
}