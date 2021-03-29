/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import Env from '@ioc:Adonis/Core/Env'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async () => {
    
    const report = await HealthCheck.getReport()

    return Database.query().select('*').from('users')
})
Route.get('/about/:id?', async ({params}) => {
    if(!params.id) return {message: 'All about posts'}

    return `about post number ${params.id}`
})
//Route.resource('posts', 'SomeRandomController').apiOnly().except(['update', 'destroy'])
//or .only(['index','create', etc...])

Route.group(() => {
    Route.get('/group', async () => ({message: 'grouped prefixed route'}))
}).middleware('auth:user,moderator').prefix('/blog')

//Route.resource('posts', 'Randomshit').middleware({'*': ['auth']})
//Route.resource('posts', 'Randomshit').middleware({
// store: ['auth'],
// update: ['auth'] ... 
//})

//Route.get('users', 'UsersController.index')
Route.resource('posts', 'PostsController')

Route.resource('lists', 'ListsController')

Route.get('/session', async ({session}) => {
    
    return {data: session.get('user')}
})

Route.post('/session/change', async ({session, params, request}) => {
    
    session.put('user', request.all())

    return {message: 'User logged successfully'}
})

Route.get('/middleware', async ({request}) => {
    console.log(request?.country);
    
    return request?.country
})

Route.get('/unauthorized', async () => {
    throw new UnAuthorizedException('Not allowed.')
})

Route.resource('users', 'UsersController')