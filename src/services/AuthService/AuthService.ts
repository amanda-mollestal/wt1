import { IAuthService } from "./IAuthService"

/**
 * Service for authentication related functionality.
 */
export class AuthService implements IAuthService{

  /**
   * Constructor for AuthService.
   */
  constructor () {
   
  }

  /**
   * Get the access token from the Gitlab API.
   * 
   * @param code - The code returned from the Gitlab API.
   * @returns {Object} - The access token.
   */
  async getAccessToken (code: string) {

    const response = await fetch('https://gitlab.lnu.se/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      }),
    })
    const { access_token, created_at, expires_in } = await response.json()
    const token = { 
      'token': access_token, 
      'created_at': created_at, 
      'expires_in': expires_in }
      return token
  }

  /**
   * Check if the token is expired.
   * 
   * @param tokenObject - The token object.
   * @returns {Boolean} - True if the token is expired, false otherwise.
   */
    isTokenExpired(tokenObject: string): boolean {
    const token = JSON.parse(tokenObject)
    const expirationTime = new Date(token.created_at * 1000 + token.expires_in * 1000)
    return expirationTime < new Date()
  }


}