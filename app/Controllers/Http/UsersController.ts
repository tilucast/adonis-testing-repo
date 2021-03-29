import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async index() {
        return await User.all()
    }

    public async show({params}: HttpContextContract){
        return await User.findOrFail(params.id)
    }
}
