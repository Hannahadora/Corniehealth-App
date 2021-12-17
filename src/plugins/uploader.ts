export async function uploadFile(
    files: IIndexableObject,
    progressCB?: (progress: number) => void,
    setXHR?: (xhr: XMLHttpRequest) => void
) {
    const form = buildFormData(files);
    const xhr = new XMLHttpRequest();
    if (setXHR) setXHR(xhr);
    const callback = progressHandler(progressCB);
    return await new Promise((resolve, reject) => {
        xhr.open(
            "POST",
            "http://18.135.196.19:5001/document-management/upload/corniehealth",
            true
        );
        xhr.onload = async () => {
            const status = xhr.status;
            if (status >= 200 && status < 300) {
                const json = await xhr.response;
                const data = JSON.parse(json);
                resolve(data.fileUrl);
            } else reject(status);
        };
        xhr.onerror = () => {
            reject("Failed to upload file");
        };
        if (xhr.upload) xhr.upload.onprogress = callback;
        xhr.send(form);
    });
}

function buildFormData(files: IIndexableObject) {
    const form = new FormData();
    Object.entries(files).forEach(([key, value]) => {
        form.set(key, value);
    });
    return form;
}

function progressHandler(handler?: (percent: number) => void) {
    return (evt: any) => {
        if (!handler || !evt.lengthComputable) return;
        const progress = Math.floor((evt.loaded / evt.total) * 100);
        handler(progress);
    };
}
