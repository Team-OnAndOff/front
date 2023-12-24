import { VITE_BACKEND_HOST } from '@/assets/config'
import { io } from 'socket.io-client'
const socket = io(VITE_BACKEND_HOST)
export default socket
