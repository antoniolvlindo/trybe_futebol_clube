export const successfulLogin = {
  status: "SUCCESSFUL",
  data: { token: 'fake token' }
}

export const wrongEmailOrPasswordLogin = {
  status: "UNAUTHORIZED",
  data: { message: 'Invalid email or password' }
}

export const missingEmailOrPasswordLogin = {
  status: "BADREQUEST",
  data: { message: 'All fields must be filled' }
}