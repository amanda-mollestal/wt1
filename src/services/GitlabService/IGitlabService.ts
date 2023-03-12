
/**
 * Interface for the GitlabService class
 * 
 * @export IGitlabService
 * @interface IGitlabService
 */
export interface IGitlabService {
  getData(token: string): any
  getUserData(token: string): any
  getGroupData(token: string): any
  getEventsData(token: string): any
  getLastEvent(token: string): any 
}