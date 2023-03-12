/**
 * Encapsulates an inversion of control container.
 */
export class IoCContainer {
  /**
   * A collection of services.
   */
  #services: Map<string, any>

  /**
   * A collection of single instances.
   *
   * @type {Map<string, any>}
   */
  #singletons: Map<string, any>

  /**
   * Initializes a new instance.
   */
  constructor () {
    this.#services = new Map()
    this.#singletons = new Map()
  }

  /**
   * Registers a service with the container.
   */
  register (name: string, definition: any, optionals: { dependencies?: string[]; singleton?: boolean; type?: boolean } = {}
    ) {
    this.#services.set(
      name,
      {
        definition,
        dependencies: optionals.dependencies,
        singleton: !!optionals.singleton,
        type: !!optionals.type
      })
  }

  /**
   * Resolves a value or object by name.
   *
   * @param {string} name - The service's name to resolve.
   * @returns {*} A service.
   */
  resolve (name: string): any {
    const service = this.#services.get(name)
  
    if (service && typeof service.definition !== 'function' && service.type !== undefined) {
      // Return the value.
      return service.definition
    }
  
    // If not a singleton, create and return a new instance.
    if (service && !service.singleton) {
      return this.#createInstance(service)
    }
  
    // It's a singleton, so if it's necessary, create new instance,
    // and return the one and only instance.
    if (service && !this.#singletons.has(name)) {
      const instance = this.#createInstance(service)
      this.#singletons.set(name, instance)
    }
    return this.#singletons.get(name)
  }
  

  /**
   * Creates a new instance based on a service.
   *
   * @param {object} service - ...
   * @returns {*} ...
   */
  #createInstance (service: { definition: any; dependencies?: string[] }): any {
    const args = service.dependencies?.map((dependency) => this.resolve(dependency)) || []
    /* eslint-disable-next-line new-cap */
    return new service.definition(...args)
  }
}
