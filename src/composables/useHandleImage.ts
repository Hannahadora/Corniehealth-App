import { ref } from "vue";

async function uploadImage(img: any): Promise<string> {
  const form = new FormData();
  form.set("file", img);
  try {
    const response = await fetch(
      "http://18.135.196.19:5001/document-management/upload/corniehealth",
      {
        method: "POST",
        body: form,
      }
    );
    if (!response.ok) {
      window.notify({ msg: "File upload failed", status: "error" });
      return "";
    }
    const data = await response.json();
    return data.fileUrl;
  } catch (error) {
    window.notify({ msg: "File not uploaded", status: "error" });
  }
  return "";
}

export function useHandleImage(oldUrl = "") {
  const url = ref(oldUrl);
  const placeholder = ref(require("@/assets/img/avatar.svg"));
  const onChange = async (event: any) => {
    const imageFile = event.target.files[0];
    url.value = await uploadImage(imageFile);
  };
  return { placeholder, url, onChange };
}
