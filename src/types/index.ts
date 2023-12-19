export interface Image {
  id: number;
  fileName: string;
  uploadPath: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ParentCategory {
  id: number;
  name: string;
  flag?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SubCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  parentId: ParentCategory;
  categories?: SubCategory[];
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  id: number;
  socialId: number;
  provider: string;
  username?: string;
  email: string;
  introduction?: string;
  image: Image
}

export interface HashTag {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  id: number;
  hashtag: string;
}

export interface CardData {
  id: number;
  image: Image;
  category: Category;
  address?: string;
  title: string;
  content: string;
  recruitment: number;
  question: string;
  online: number;
  challengeStartDate: string;
  challengeEndDate: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: User;
  hashTags: HashTag[];
}

export interface CardProps {
  data: CardData;
}

export interface Response<T> {
  code: number;
  message: string;
  data: T;
} 