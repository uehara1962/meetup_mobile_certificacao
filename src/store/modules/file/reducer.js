import produce from 'immer'

const INITIAL_STATE = {
  // file: {
  //   url: null,
  //   id: null,
  //   name: null
  // },
  file: null
}

export default function file(state = INITIAL_STATE, action ){
  return produce(state, draft => {
    switch (action.type) {
      case '@file/INCLUDE_FILE_SUCCESS': {
        draft.file = action.payload
        console.log('reducer_file_acton: ', action)
        break
      }
      default:
    }
  })
}