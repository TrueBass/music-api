export const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{6,30}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};