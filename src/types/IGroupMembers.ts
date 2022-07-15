
export default interface IGroupMembers {
  id: string;
  groupId: string;
  userId: string,
  practitionerId: string,
  role: string,
  period: {
    start: string,
    end: string
  }
}
