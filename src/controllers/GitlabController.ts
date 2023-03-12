import { gitlabDataObject } from "@/interfaces/gitlabDataObject"
import { IGitlabService } from "@/services/GitlabService/IGitlabService"

/**
 * Controller for the Gitlab API.
 */
export class GitlabController {
  private gitlabService: IGitlabService

  /**
  * Constructor for the Gitlab controller.
  * @param {IGitlabService} gitlabService - Gitlab service used to interact with the Gitlab API.
  */
  constructor(gitlabService: IGitlabService) {
    this.gitlabService = gitlabService
  }

  /**
   * Gets data from the Gitlab API using the provided access token.
   * @param {string} token - Access token for the Gitlab API.
   * @returns {gitlabDataObject<gitlabDataObject>} - A Gitlab data object.
   * @throws {Error} - Error thrown when there is an error getting the data from the Gitlab API.
   */
  async getData(token: string) {
    try {
      const data: gitlabDataObject = await this.gitlabService.getData(token)
      return data
    } catch (error) {
      throw new Error('There was an error getting the data from Gitlab')
    }

  }


}