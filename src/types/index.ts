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
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  parentId: ParentCategory
  subCategories?: Category[]
}

export interface User {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  id: number
  socialId: number
  provider: string
  username?: string
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
}

export interface CardProps {
  data: CardData
}

export interface Response<T> {
  code: number
  message: string
  data: T
}

export interface RecruitData {
  category: Category
  userId: number
  categoryId: number
  subCategoryId: number
  careerCategoryId: number[]
  hashTag: string[]
  image: File | undefined
  title: string
  content: string
  recruitment: number
  question: string
  online: number
  challengeStartDate: Date | null
  challengeEndDate: Date | null
  address: {
    zipCode: number
    detail1: string
    detail2: string
    latitude: number
    longitude: number
  }
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
