import { createContext, useReducer, useState } from 'react'
import { roomReducer } from '../reducers/roomReducer'
import {
  ROOMS_LOADED_SUCCESS,
  ROOMS_LOADED_FAIL,
  ADD_ROOM,
  SELECT_ROOM,
  apiUrl,
} from '../utils/constants'

import axios from 'axios'

export const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {
  // State
  const [roomState, dispatch] = useReducer(roomReducer, {
    room: null,
    rooms: [],
    roomsLoading: true,
  })

  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [alert, setAlert] = useState(null)

  // Get room list
  const getRooms = async () => {
    try {
      const response = await axios.get(`${apiUrl}/rooms`)
      if (response.data.success) {
        dispatch({ type: ROOMS_LOADED_SUCCESS, payload: response.data.rooms })
      }
    } catch (error) {
      dispatch({ type: ROOMS_LOADED_FAIL })
    }
  }

  // Add room
  const addRoom = async (newRoom) => {
    try {
      const response = await axios.post(`${apiUrl}/rooms`, newRoom)
      if (response.data.success) {
        dispatch({ type: ADD_ROOM, payload: response.data.room })
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' }
    }
  }

  // Select a room to show message list of this room
  const selectRoom = (roomId) => {
    const room = roomState.rooms.find((room) => room._id === roomId)
    dispatch({ type: SELECT_ROOM, payload: room })
    console.log(room._id)
  }

  // Room context data
  const roomContextData = {
    roomState,
    showAddRoomModal,
    setShowAddRoomModal,
    alert,
    setAlert,
    getRooms,
    addRoom,
    selectRoom,
  }

  return (
    <RoomContext.Provider value={roomContextData}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
