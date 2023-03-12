/**
 * Module for bootstrapping.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import { AuthController } from '@/controllers/AuthController'
import { GitlabController } from '@/controllers/GitlabController'
import { AuthService } from '@/services/AuthService/AuthService'
import { GitlabService } from '@/services/GitlabService/GitlabService'
import { IoCContainer } from '../util/IoCContainer'

/**
 * IoC container.
 */
const iocContainer = new IoCContainer()

/**
 * Register controllers.
 */
iocContainer.register('AuthController', AuthController, {
  dependencies: ['AuthService'],
  singleton: true
})

/**
 * Register services.
 */
iocContainer.register('GitlabController', GitlabController, {
  dependencies: ['GitlabService'],
  singleton: true
})

/**
 * Register services.
 */
iocContainer.register('GitlabService', GitlabService, {
  singleton: true
})

/*
* Register services.
*/
iocContainer.register('AuthService', AuthService, {
  singleton: true
})


export const container = Object.freeze(iocContainer)
