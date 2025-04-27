export interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  role: "AUTHOR";
  email: string;
  password: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  isPublished?: boolean;
  createdAt: string;
}

export interface IPostFormValues {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface IComment {
  id: string;
  authorId: string;
  userId: string;
  content: string;
  createdAt: string;
  post: IPost,
  user: {
    firstName: string;
    lastName: string;
    username: string;
    id: string;
  }
}