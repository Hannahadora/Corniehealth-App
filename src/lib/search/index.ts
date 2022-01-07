export default class Search {
  public searchObject(
    subject: IIndexableObject,
    query: string | number
  ): boolean {
    return (
      Object.values(subject).filter(value => {
        if (typeof value === "number") return value === query;
        if (typeof value === "string") {
          const queryString = query.toString();
          return value.toLowerCase().includes(queryString.toLowerCase());
        }
      }).length > 0
    );
  }

  public searchObjectArray(
    subjects: IIndexableObject[],
    query: string
  ): IIndexableObject[] {
    return subjects.filter(subject => {
      return this.searchObject(subject, query);
    });
  }
}
