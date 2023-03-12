import { IGitlabService } from "./IGitlabService"
import { request, gql } from 'graphql-request'
import { gitlabDataObject } from "@/interfaces/gitlabDataObject"
import { groupsObject } from "@/interfaces/groupsObject"
import { userObject } from "@/interfaces/userObject"
import { eventsObject } from "@/interfaces/eventsObject"

/**
 * Class for the GitlabService
 */
export class GitlabService implements IGitlabService {

  /**
   * Constructor for the GitlabService
   */
  constructor() {

  }

  /**
   * Get all the data from the Gitlab API.
   * 
   * @param token - The access token.
   * @returns {Object<gitlabDataObject>} - The data from the Gitlab API.
   *
   */
  async getData(token: string) {
    try {

      const userData: userObject = await this.getUserData(token)
      const groupData: groupsObject = await this.getGroupData(token)
      const eventsData: eventsObject[] = await this.getEventsData(token)
      const data: gitlabDataObject = {
        user: userData,
        groups: groupData,
        events: eventsData,
      }

      return data

    } catch (error) {
      console.log(error)
      return null
    }
  }

  /**
   * Get the user data from the Gitlab API.
   * 
   * @param token - The access token.
   * @returns {Object<userObject>} - The user data.
   */
  async getUserData(token: string) {
    const response = await fetch('https://gitlab.lnu.se/api/v4/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    const responseJson = await response.json()
    const userData = {
      id: responseJson.id,
      email: responseJson.email,
      name: responseJson.name,
      username: responseJson.username,
      avatarUrl: responseJson.avatar_url,
      lastActivityAt: responseJson.last_activity_on,
    }

    return userData
  }

  /**
   * Get the group data from the Gitlab API.
   * 
   * @param token - The access token.
   * @returns {Object<groupsObject>} - The group data.
   */
  async getGroupData(token: string) {
    const query = gql`
      {
        currentUser {
          groupCount
          groups(first: 3) {
            nodes {
              fullName
              avatarUrl
              fullPath
              webUrl
              projects(first: 5, includeSubgroups: true) {
                count
                nodes {
                  name
                  path
                  fullPath
                  webUrl
                  avatarUrl
                  lastActivityAt
                  repository {
                    tree {
                      lastCommit {
                        authorEmail
                        fullTitle
                        authoredDate
                        author {
                          name
                          username
                          avatarUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    const response = await request({
      url: 'https://gitlab.lnu.se/api/graphql',
      document: query,
      variables: {},
      requestHeaders: { authorization: `Bearer ${token}` },
    })

    const res = response as any

    const data: groupsObject = {
      groupCount: res.currentUser.groupCount as number,
      groups: res.currentUser.groups.nodes.map((group: any) => {
        return {
          fullName: group.fullName,
          avatarUrl: group.avatarUrl,
          fullPath: group.fullPath,
          webUrl: group.webUrl,
          count: group.projects.count,
          projects: group.projects.nodes.map((project: any) => {
            return {
              name: project.name,
              path: project.path,
              fullPath: project.fullPath,
              webUrl: project.webUrl,
              avatarUrl: project.avatarUrl,
              lastActivityAt: project.lastActivityAt,
              lastCommit: {
                authorEmail: project.repository.tree.lastCommit.authorEmail,
                fullTitle: project.repository.tree.lastCommit.fullTitle,
                authoredDate: project.repository.tree.lastCommit.authoredDate,
                authorName: project.repository.tree.lastCommit.author.name,
                authorUsername: project.repository.tree.lastCommit.author.username,
                authorAvatarUrl: project.repository.tree.lastCommit.author.avatarUrl,
              }
            }
          })
        }
      })
    }
    return data
  }

  /**
   * Get the events data from the Gitlab API.
   * 
   * @param token - The access token.
   * @returns {Object<eventsObject[]>} - The events data.
   */
  async getEventsData(token: string) {
    const response = await fetch(`https://gitlab.lnu.se/api/v4/events?page=1&per_page=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    const responseJson = await response.json()

    const events = responseJson.map((event: any) => {
      if (event.push_data !== undefined) {
        return {
          id: event.id,
          project: event.project_id,
          action: event.action_name,
          date: event.created_at,
          title: event.push_data.commit_title,

        }
      } else {
        return {
          id: event.id,
          project: event.project_id,
          action: event.action_name,
          date: event.created_at
        }
      }
    })

    const lastEvent = await this.getLastEvent(token)
    events.push(lastEvent)


    return events
  }

  /**
   * Get the last event from the Gitlab API.
   * 
   * @param token - The access token.
   * @returns {Object<eventsObject>} - The last event.
   * 
   */
  async getLastEvent(token: string) {
    const response = await fetch(`https://gitlab.lnu.se/api/v4/events?page=2&per_page=100`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })

    const responseJson = await response.json()

    const lastEvent = {
      id: responseJson[0].id,
      project: responseJson[0].project_id,
      action: responseJson[0].action_name,
      date: responseJson[0].created_at,
      title: '-',
    }

    if (responseJson[0].push_data !== undefined) {
      lastEvent.title = responseJson[0].push_data.commit_title
    }

    return lastEvent
  }
}