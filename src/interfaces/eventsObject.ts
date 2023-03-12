/**
 * Represents an object that describes an event.
 * @interface 
 * @property {string} id - The unique identifier for the event.
 * @property {string} project - The name of the project related to the event.
 * @property {string} action - The action that occurred during the event.
 * @property {string} date - The date when the event occurred.
 * @property {string} [title] - The title of the event.
 */
export interface eventsObject {
       id: string,
       project: string,
       action: string,
       date: string,
       title?: string
}

