import User from 'App/Models/User'

export default class UserService {
  public async createUser(userData: any) {
    return await User.create(userData)
  }

  public async getAllUsers() {
    return await User.all()
  }

  public async findUser(id: number) {
    return await User.find(id)
  }

  public async updateUser(id: number, userData: any) {
    const user = await User.findOrFail(id)
    user.merge(userData)
    await user.save()
    return user
  }

  public async deleteUser(id: number) {
    const user = await User.find(id)

    if (user) {
      await user.delete()
    }

    return user
  }
}
