import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostValidator from 'App/Validators/PostValidator';

export default class PostsController {

    public async index({view}: HttpContextContract){
        const posts = [
            {id: 1, title: 'AdonisJS Template'},
            {id: 2, title: 'More Adonis Stuff here'}
        ]

        return view.render('posts/index', {posts})
    }

    public async store ({request}: HttpContextContract) {

        const data = await request.validate(PostValidator)

        console.log(data)

        return {message: 'Post created.'}
        
    }
}
