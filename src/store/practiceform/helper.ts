import { cornieClient } from "@/plugins/http";
import IPracticeform from "@/types/IPracticeform";

export async function fetchPracticeforms() {
  try {
    const response = await cornieClient().get(
      "/api/v1/practice-form"
    );
    if (response.success){
      return response.data;
    } 
  } catch (error) {
    console.log(error);
  }
  return [] as IPracticeform[];
}
export async function fetchPracticeformsTemplates() {
  try {
    const response = await cornieClient().get(
      "/api/v1/practice-form/template-forms"
    );
    if (response.success){
      return response.data;
    } 
  } catch (error) {
    console.log(error);
  }
  return [] as IPracticeform[];
}
export async function fetchPracticeformsQuestions() {
  try {
    const response = await cornieClient().get(
      "/api/v1/practice-form/template-questions"
    );
    if (response.success){
      return response.data;
    } 
  } catch (error) {
    console.log(error);
  }
  return [] as IPracticeform[];
}

export async function deletePracticeform(id: string) {
  try {
    const response = await cornieClient().delete(`/api/v1/practice-form/${id}`);
    if (response.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
