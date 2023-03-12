import { IAuthService } from "@/services/AuthService/IAuthService"
import type { NextApiRequest, NextApiResponse } from "next"
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import redis from '@/config/redis'
import { v4 as uuidv4 } from 'uuid'

/**
 * Controller for authentication related functionality.
 */
export class AuthController {
  private authService: IAuthService

  /**
   * Constructor for AuthController.
   *
   * @param {IAuthService} authService - The service responsible for authentication related functionality.
   */
  constructor(authService: IAuthService) {
    this.authService = authService
  }

  /**
   * Check if the user is currently logged in.
   *
   * @param {NextApiRequest} req - The request object.
   * @param {NextApiResponse} res - The response object.
   * @returns {Boolean} - True if the user is logged in, false otherwise.
   */
  async userIsLoggedIn(req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = getCookie('session', { req, res })
      const accessToken = await redis.get(`session:${session}`)
      if (accessToken && !this.authService.isTokenExpired(accessToken)) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }

  /**
   * Get the redirect URL for the authentication flow.
   *
   * @returns {string} - The redirect URL.
   */
  getRedirectUrl() {
    const url = (`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_API_SCOPE}`)
    return url
  }

  /**
   * Handle the callback for the authentication flow.
   *
   * @param {NextApiRequest} req - The request object.
   * @param {NextApiResponse} res - The response object.
   * @returns {Promise<void>}
   */
  async callback(req: NextApiRequest, res: NextApiResponse) {
      const { code } = req.query
      const access_token = await this.authService.getAccessToken(code as string)
      const session = uuidv4()

      await redis.set(`session:${session}`, JSON.stringify(access_token))

      setCookie('session', session, { req, res, maxAge: 60 * 60 * 24 * 7 })

      res.redirect('/loading')
  }

  /**
   * Log the user out.
   *
   * @param {NextApiRequest} req - The request object.
   * @param {NextApiResponse} res - The response object.
   * @returns {Promise<void>}
   */
  async logOut(req: NextApiRequest, res: NextApiResponse) {
    try {
      const session = getCookie('session', { req, res })
      await redis.del(`session:${session}`)
      deleteCookie('session', { req, res })
      res.redirect('/')
    } catch (error) {
      throw new Error('An error occurred while logging out.')
    }

  }

  /**
   * Get the access token for the user.
   * 
   * @param {NextApiRequest} req - The request object.
   * @param {NextApiResponse} res - The response object.
   * @returns {string} - The access token.
   */
  async getToken(req: NextApiRequest, res: NextApiResponse) {

    try {
      const cookie = getCookie('session', { req, res })
      const accessToken = await redis.get(`session:${cookie}`)
      const tokenJson = JSON.parse(accessToken as string)
      return tokenJson
    } catch (error) {
      throw new Error('An error occurred while getting the access token.')
    }
  }

}