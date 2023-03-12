
/**
 * Represents the groupsObject interface
 * @interface
 * @property {number} groupCount - The number of groups the user is a member of.
 * @property {object[]} groups - An array of group objects.
 * @property {string} groups.fullName - The full name of the group.
 * @property {string} groups.avatarUrl - The avatar url of the group.
 * @property {string} groups.fullPath - The full path of the group.
 * @property {string} groups.webUrl - The web url of the group.
 * @property {number} groups.count - The number of projects in the group.
 * @property {object[]} groups.projects - An array of project objects.
 * @property {string} groups.projects.name - The name of the project.
 * @property {string} groups.projects.path - The path of the project.
 * @property {string} groups.projects.fullPath - The full path of the project.
 * @property {string} groups.projects.webUrl - The web url of the project.
 * @property {string} groups.projects.avatarUrl - The avatar url of the project.
 * @property {string} groups.projects.lastActivityAt - The date of the last activity in the project.
 * @property {object} groups.projects.lastCommit - The last commit in the project.
 * @property {string} groups.projects.lastCommit.authorEmail - The email of the author of the last commit.
 * @property {string} groups.projects.lastCommit.fullTitle - The full title of the last commit.
 * @property {string} groups.projects.lastCommit.authoredDate - The date of the last commit.
 * @property {string} groups.projects.lastCommit.authorName - The name of the author of the last commit.
 * @property {string} groups.projects.lastCommit.authorUsername - The username of the author of the last commit.
 * @property {string} groups.projects.lastCommit.authorAvatarUrl - The avatar url of the author of the last commit.
 */

export interface groupsObject {
  groupCount: number,
  groups: {
    fullName: string,
    avatarUrl: string,
    fullPath: string,
    webUrl: string,
    count: number,
    projects: {
      name: string,
      path: string,
      fullPath: string,
      webUrl: string,
      avatarUrl: string,
      lastActivityAt: string,
      lastCommit: {
        authorEmail: string,
        fullTitle: string,
        authoredDate: string,
        authorName: string,
        authorUsername: string,
        authorAvatarUrl: string,
      }
    }[]
  }[]
}
