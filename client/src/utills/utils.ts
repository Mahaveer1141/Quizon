export function setAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function getAcessToken() {
  const accessToken = localStorage.getItem("accessToken") || "";
  return accessToken;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken") || "";
  return refreshToken;
}

export function clearToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
