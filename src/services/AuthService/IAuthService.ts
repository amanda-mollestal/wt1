
/**
 * Interface for the AuthService class
 *
 * @export IAuthService
 * @interface IAuthService
 */
export interface IAuthService {
  getAccessToken(code: string): any
  isTokenExpired(tokenObject: string): boolean
}