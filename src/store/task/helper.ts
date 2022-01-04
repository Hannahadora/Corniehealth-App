import { cornieClient } from "@/plugins/http";
import ITask from "@/types/ITask";

export async function fetchTasks() {
  try {
    const response = await cornieClient().get("/api/v1/task");
    if (response.success) {
      return response.data;
    }
  } catch (error) {}
  return [] as ITask[];
}

export async function deleteTask(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/task/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
