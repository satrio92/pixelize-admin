import {errorResponse} from "../../error/error_response.js";

const validation = (schema, request) => {
  const result = schema.validate(request);

  if (result.error) {
    throw errorResponse(400, result.error.message)
  } else {
    return result.value;
  }
}

export { validation }



