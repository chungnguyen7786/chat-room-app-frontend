import { createContext, useReducer, useState } from 'react'
import { roomReducer } from '../reducers/roomReducer'
import {
  ROOMS_LOADED_SUCCESS,
  ROOMS_LOADED_FAIL,
  ADD_ROOM,
  SELECT_ROOM,
  INVITE_USERS,
  apiUrl,
} from '../utils/constants'

import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:5000')

export const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {
  // State
  const [roomState, dispatch] = useReducer(roomReducer, {
    room: null,
    rooms: [],
    roomsLoading: true,
  })

  const { room, rooms } = roomState

  const [messageState, setMessageState] = useState({
    messages: [],
    messagesLoading: true,
  })

  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false)
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
      setAlert({ type: 'error', message: error.response.data.message })
      //alert will disapper after 5s
      setTimeout(() => setAlert(null), 5000)
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' }
    }
  }

  // Select a room to show message list of this room
  const selectRoom = (roomId) => {
    const room = rooms.find((room) => room._id === roomId)
    dispatch({ type: SELECT_ROOM, payload: room })
    socket.emit('currentRoom', room)
  }

  // Get message list
  const getMessages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/messages/${room._id}`)
      if (response.data.success) {
        setMessageState({
          ...messageState,
          messages: response.data.messages,
          messagesLoading: false,
        })
      }
    } catch (error) {
      setMessageState({
        ...messageState,
        messages: [],
        messagesLoading: false,
      })
    }
  }

  // Send message
  const sendMessage = async (text) => {
    try {
      const response = await axios.post(`${apiUrl}/messages/${room._id}`, {
        text,
      })
      if (response.data.success) {
        console.log(response.data.newMessage)
        socket.emit('clientSendMessage', response.data.newMessage)
      }
    } catch (error) {
      console.erorr(error)
    }
  }

  // Invite user
  const inviteUsers = async (selectedMemberIds) => {
    try {
      const response = await axios.put(`${apiUrl}/rooms/invite/${room._id}`, {
        userIds: selectedMemberIds,
      })
      if (response.data.success) {
        dispatch({ type: INVITE_USERS, payload: response.data.room })
        return response.data
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.response.data.message })
      //alert will disapper after 5s
      setTimeout(() => setAlert(null), 5000)
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' }
    }
  }

  // Clear all state
  const clearState = () => {
    setShowAddRoomModal(false)
    setShowInviteMembersModal(false)
    setAlert(null)
    selectRoom(null)
    // socket.emit('logout')
  }

  // Room context data
  const roomContextData = {
    socket,
    roomState,
    messageState,
    setMessageState,
    showAddRoomModal,
    setShowAddRoomModal,
    showInviteMembersModal,
    setShowInviteMembersModal,
    alert,
    setAlert,
    getRooms,
    addRoom,
    selectRoom,
    getMessages,
    sendMessage,
    inviteUsers,
    clearState,
  }

  return (
    <RoomContext.Provider value={roomContextData}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContextProvider
