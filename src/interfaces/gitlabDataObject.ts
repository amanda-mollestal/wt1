import { userObject } from "./userObject"
import { groupsObject } from "./groupsObject"
import { eventsObject } from "./eventsObject"

/**
 * Represents an object that contains all data from Gitlab.
 * @interface
 * @property {userObject} user - The user object.
 * @property {groupsObject} groups - The groups object.
 * @property {eventsObject[]} events - The events object.
 */
export interface gitlabDataObject {

    user: userObject,
    groups: groupsObject,
    events: eventsObject[]
}