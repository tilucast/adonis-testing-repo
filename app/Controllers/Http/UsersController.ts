import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

    public async index() {
        return await User.query().preload('profile')
    }

    public async show({params}: HttpContextContract){
        const user = await User.query()
        .where('id', params.id)
        .preload('profile') 
        .firstOrFail()

        return user.serialize({
            fields: {omit: ['created_at', 'updated_at']},
            relations: {
                profile: {
                    fields: ['avatar', 'user_id']
                }
            }
        })
    }

    public async store({request}: HttpContextContract){

        
        const user = await request.validate(UserValidator)

        const validatedUser = new User()
        validatedUser.email = user.email
        validatedUser.password = user.password

        await validatedUser.related('profile').create({
            avatar: user.avatar
        })

        return {message: `User with id: ${validatedUser.id} was created successfully.`}

        
    }

    public async update({request, params}: HttpContextContract){

        const user = await User.findOrFail(params.id)

        user.password = request.all()['password']

        await user.save()  
        
        return {message: 'Password changed.'}
        
    }

    public async destroy({params}: HttpContextContract){
        const user = await User.findOrFail(params.id)

        await user.delete()

        return {message: `User with id: ${user.id} was deleted.`}
    }
}
