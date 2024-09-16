function generateSecretKey(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join(
    ""
  );
}

export const secretKey = generateSecretKey(32);

export const ROOT_URL = import.meta.env.VITE_ROOT_URL;

export const ENDPOINTS = Object.freeze({
  // Home
  dashboard: `${ROOT_URL}/v1/dashboard`,
  // User
  user: `${ROOT_URL}/v1/users`,
  addUser: `${ROOT_URL}/v1/users/add`,
  deleteUser: `${ROOT_URL}/v1/users/delete`,
  updateUser: `${ROOT_URL}/v1/users/update`,
  detailUser: `${ROOT_URL}/v1/users/detail`,
  // Member
  members: `${ROOT_URL}/v1/members`,
  addMember: `${ROOT_URL}/v1/members/add`,
  deleteMember: `${ROOT_URL}/v1/members/delete`,
  updateMember: `${ROOT_URL}/v1/members/update`,
  detailMember: `${ROOT_URL}/v1/members/detail`,
  // family
  family: `${ROOT_URL}/v1/family`,
  addFamily: `${ROOT_URL}/v1/family/add`,
  deleteFamily: `${ROOT_URL}/v1/family/delete`,
  updateFamily: `${ROOT_URL}/v1/family/update`,
  detailFamily: `${ROOT_URL}/v1/family/detail`,
  //upload
  uploadImage: `${ROOT_URL}/uploadImage`,
  // Auth
  login: `${ROOT_URL}/v1/auth/login`,
  logout: `${ROOT_URL}/v1/auth/logout`,
  checkAuth: `${ROOT_URL}/v1/auth/checkAuth`,
  TWO_FACTOR_AUTH: "api/auth/twofactorlogin",
});

export const PERMISSIONS = Object.freeze({
  CATEGORIES: "Categories",
});
