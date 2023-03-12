
/**
 * Represents a user object
 * @interface
 * @property {string} id - The unique identifier for the user.
 * @property {string} email - The email of the user.
 * @property {string} name - The name of the user.
 * @property {string} username - The username of the user.
 * @property {string} avatarUrl - The avatar url of the user.
 * @property {string} lastActivityAt - The date of the last activity of the user.
 * 
 */

export interface userObject {
  id: string,
  email: string,
  name: string,
  username: string,
  avatarUrl: string,
  lastActivityAt: string,
}[]