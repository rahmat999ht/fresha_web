export const HttpStatusSuccess = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
  } as const;
  
  export const HttpStatusError = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  } as const;
  
  export const HttpStatus = {
    ...HttpStatusSuccess,
    ...HttpStatusError,
  } as const;