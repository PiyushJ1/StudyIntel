export class UserNotFoundError extends Error {
  constructor(message = "This email does not have an acccount signed up") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class InvalidPasswordError extends Error {
  constructor(message = "Incorrect password") {
    super(message);
    this.name = "InvalidPasswordError";
  }
}

export class EmailAlreadyInWaitlistError extends Error {
  constructor(message = "This email is already in the waitlist") {
    super(message);
    this.name = "EmailAlreadyInWaitlistError";
  }
}
