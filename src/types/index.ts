export interface Image {
  id: number
  fileName: string
  uploadPath: string
  size: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface Category {
  id: number
  name: string
  flag?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  parentId?: Category
  subCategories?: Category[]
}

export interface User {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  id: number
  socialId?: number
  provider: string
  username: string
  email: string
  introduction?: string
  image: Image
}

export interface ParentCategory {
  id: number
  name: string
  flag?: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface HashTag {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  id: number
  hashtag: string
}

export interface CardData {
  id: number
  image: Image
  category: Category
  address?: string
  title: string
  content: string
  recruitment: number
  question: string
  online: number
  challengeStartDate: string
  challengeEndDate: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  user: User
  hashTags: HashTag[]
  likes: any[]
  eventApplies: any[]
}

export interface CardProps {
  data: CardData
}

export interface EventDetailData {
  address: EventAddress
  category: Category
  challengeEndDate?: string
  challengeStartDate?: string
  content: string
  createdAt: Date
  deleteAt?: Date
  eventApplies: EventAppliesUser[]
  hashTags: HashTag[]
  id: number
  image: Image
  likes: any[]
  online: number
  question: string
  recruitment: number
  title: string
  updatedAt: string
  user: User
  careerCategories: careerCategory[]
}

export interface EventAddress {
  createdAt: Date
  deleteAt?: Date
  detail1: string
  detail2: string
  id: number
  latitude: number
  longitude: number
  updatedAt: Date
  zipCode: number
}

export interface EventAppliesUser {
  answer: string
  appliedAt: string
  approvedAt: string
  createdAt: string
  deleteAt?: string
  flat: number
  id: number
  status: number
  updatedAt: string
  user: User
}

export interface Response<T> {
  code: number
  message: string
  data: T
}

export interface PostsProps {
  title?: string
  data: CardData[]
  isSlide: boolean
}

export interface EventQuery {
  categoryId?: number
  subCategoryId?: number
  sort?: 'likes'
  limit?: number
  search?: string
  order?: 'ASC' | 'DESC'
  page?: number
  perPage?: number
}

export interface RecruitData {
  address: EventAddress
  category: Category
  challengeEndDate?: string
  challengeStartDate?: string
  careerCategories: careerCategory[]
  content: string
  createdAt: Date
  deleteAt?: Date
  eventApplies: EventAppliesUser[]
  hashTags: HashTag[]
  id: number
  image: Image
  likes: number
  online: number
  question: string
  recruitment: number
  title: string
  updatedAt: string
  user: User
}

export interface RecruitDataProps {
  data: RecruitData
}

export interface careerCategory {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  parentId: ParentCategory
  categories?: Category[]
}

export interface ChatUser {
  _id: string
  userId: number
  online: boolean
  username: string
  image: string
  createdAt: Date
  updatedAt: Date
}
export interface ChatMessage {
  _id: string
  type: 'text' | 'image' | 'link' | 'system'
  message: string
  user: ChatUser
  createdAt: Date
}

export interface ChatRoom {
  _id: string
  room: number
  name: string
  image: string
  category: string
  lastMessage?: string
  createdAt: Date
  updatedAt: Date
  users: ChatUser[]
}

export interface ChatResponse {
  connect?: boolean
  code: number
  message: string
}

export enum CHAT {
  CONNECT = 'connect',
  ROOM_JOIN = 'room',
  PREV_MESSAGES = 'getPrevMessages',
  SEND_MESSAGE = 'sendMessage',
  MESSAGE = 'message',
  MESSAGES = 'read',
  DISCONNECT = 'disconnect',
  USER_INFO = 'userinfo',
  ROOM_INFO = 'roomInfo',
}

export interface ReportProps {
  createdAt: Date
  updatedAt: Date
  id: number
  reporterId: object
  reportedId: object
  description: string
}
