import { VITE_BACKEND_HOST } from '@/assets/config'
import { io } from 'socket.io-client'
const socket = io(VITE_BACKEND_HOST, {
  withCredentials: true,
  autoConnect: false,
  reconnectionAttempts: 10,
})
export default socket
