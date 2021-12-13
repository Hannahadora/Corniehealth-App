import { ref } from 'vue'

async function uploadImage(img: any): Promise<string> {
	const form = new FormData()
	form.set('file', img)
	try {
		const response = await fetch(
			'http://18.135.196.19:5001/document-management/upload/corniehealth',
			{
				method: 'POST',
				body: form,
			}
		)
		if (!response.ok) {
			alert('File upload failed')
			return ''
		}
		const data = await response.json()
		return data.fileUrl
	} catch (error) {
		alert('File not uploaded')
	}
	return ''
}

export function useHandleImage(oldUrl = '') {
	const url = ref(oldUrl)
	const placeholder = ref(require('@/assets/img/placeholder.png'))
	const onChange = async (event: any) => {
		const imageFile = event.target.files[0]
		url.value = await uploadImage(imageFile)
	}
	return { placeholder, url, onChange }
}
