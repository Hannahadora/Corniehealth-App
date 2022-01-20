export default class ObjectSet implements Iterable<any> {
  /**
   * Makes a set of objects based on a unique key in each object.
   * for example objectA = {id: 1, name: "something"} and
   * objectB = {id: 1, name: "something else"} are the same based on id
   * so ObjectSet([objectA, objectB], 'id') will contain only one object while
   * ObjectSet([objectA, objectB], 'name') will contain two objects as they
   *  have different "name" values.
   */
  private data!: any[];

  constructor(values: any[], key: any) {
    this.data = [];
    const map = new Map();
    values.forEach((value: IIndexableObject) => {
      map.set(value[key], value);
    }, this);
    this.data = [...map.values()];
  }

  *[Symbol.iterator]() {
    for (const val of this.data) {
      yield val;
    }
  }
}
