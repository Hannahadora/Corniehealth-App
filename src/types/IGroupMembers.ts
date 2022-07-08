
export default interface IGroupMembers {
  id?: string;
  groupId: string;
  userId: string,
  period: {
    start: string,
    end: string
  }
}
