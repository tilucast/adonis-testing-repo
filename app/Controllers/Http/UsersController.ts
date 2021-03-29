import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

    public async index() {
        return await User.all()
    }

    public async show({params}: HttpContextContract){
        return await User.findOrFail(params.id)
    }

    public async store({request}: HttpContextContract){

        try{
            const user = await request.validate(UserValidator)

            const validatedUser = await User.create({
                email: user.email,
                password: user.password
            })

            return {message: `User with id: ${validatedUser.id} was created successfully.`}

        }catch(error){
            return error
        }
        
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
