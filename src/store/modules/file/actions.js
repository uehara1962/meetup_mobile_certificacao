export function includeFileRequest(data){
  return {
    type: '@file/INCLUDE_FILE_REQUEST',
    payload: { data }
  }
}

export function includeFileSuccess(data){
  return {
    type: '@file/INCLUDE_FILE_SUCCESS',
    payload: { data }
  }
}

export function includeFileFailure(data){
  return {
    type: '@file/INCLUDE_FILE_FAILURE',
  }
}