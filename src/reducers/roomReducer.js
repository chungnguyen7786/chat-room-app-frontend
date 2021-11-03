import {
  ROOMS_LOADED_SUCCESS,
  ROOMS_LOADED_FAIL,
  ADD_ROOM,
  SELECT_ROOM,
  INVITE_USERS,
} from '../utils/constants'

export const roomReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ROOMS_LOADED_SUCCESS:
      return {
        ...state,
        rooms: payload,
        roomsLoading: false,
      }
    case ROOMS_LOADED_FAIL:
      return {
        ...state,
        rooms: [],
        roomsLoading: false,
      }
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, payload],
      }
    case SELECT_ROOM:
      return {
        ...state,
        room: payload,
      }
    case INVITE_USERS:
      return {
        ...state,
        room: payload,
      }
    default:
      return state
  }
}
