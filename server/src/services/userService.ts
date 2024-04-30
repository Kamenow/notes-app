import User from '../models/User';

export function createUser(email: string, password: string): Promise<User> {
  return User.create({ email, password, id: 321 });
}

// export const getUserById = (id: string) => {
//   return User.findById(id);
// };

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
