import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle (
    {request}: HttpContextContract, 
    next: () => Promise<void>, 
    allowerdRoles: string[]
  ) {
    
    console.log(`${request.url()} enforces ${allowerdRoles}`)

    await next()
  }
}
