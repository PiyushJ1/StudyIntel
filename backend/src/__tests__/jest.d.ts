/// <reference types="jest" />

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }

  var fetch: jest.Mock;
}

export {};
