export class CreateUserDto {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    const trimmedUsername = username.trim();
    const isAlphanumeric = /^[A-Za-z0-9-]{8,24}$/;
    if (
      trimmedUsername.length < 8 ||
      trimmedUsername.length > 24 ||
      !isAlphanumeric.test(trimmedUsername)
    ) {
      throw new Error('Invalid username');
    }
    this.username = trimmedUsername;

    const trimmedPassword = password.trim();
    const isStrongPassword =
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*\.])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,50}$/;
    if (
      trimmedPassword.length < 8 ||
      trimmedPassword.length > 32 ||
      !isStrongPassword.test(trimmedPassword)
    ) {
      throw new Error('Invalid password');
    }
    this.password = password;
  }
}
