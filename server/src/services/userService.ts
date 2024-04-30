import User from '../models/User';

export function createUser(email: string, password: string): Promise<User> {
  return User.create({ email, password });
}

export function getUserById(id: number): Promise<User | null> {
  return User.findByPk(id);
}

// export const getAllUsers= (userData: IUser) => {
//   const newUser: IUser = new User(userData);
//   return newUser.save();
// };

// export const updateUser = (id: string, userData: IUser) => {
//   return User.findByIdAndUpdate(id, userData, { new: true });
// };

// export const deleteUser = (id: string) => {
//   return User.findByIdAndDelete(id);
// };
