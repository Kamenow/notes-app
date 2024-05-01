import User from '../models/User';

export function createUser(email: string, password: string): Promise<User> {
  return User.create({ email, password });
}

export function getUserById(id: number): Promise<User | null> {
  return User.findByPk(id);
}

export function getUserByEmail(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}
