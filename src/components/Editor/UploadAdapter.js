import axios from '@/utils/axiosInstance.js';

export default class UploadAdapter {
    constructor(loader, uplodedImageUrls) {
        this.loader = loader;
        this.uplodedImageUrls = uplodedImageUrls;
        this.loader.file.then((pic) => (this.file = pic));
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then((uploadedFile) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', uploadedFile);
                formData.append('dirName', 'editorImage');

                axios.post('/editor/imgUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    const returnUrl = res.data.url;
                    const decodeUrl = decodeURIComponent(returnUrl);
                    // console.log('File uploaded:', returnUrl, decodeUrl, imageUrl); // 업로드된 URL을 로그로 확인
                    this.uplodedImageUrls.push(decodeUrl);
                    // console.log('Image URL added to uplodedImageUrls:', this.uplodedImageUrls); // 추가된 URL을 로그로 확인
                    resolve({
                         default: decodeUrl,
                    });
                })
                .catch((error) => {
                    console.error('File upload failed:', error);
                    reject(error.response?.data?.message || 'Upload failed');
                });
            });
        });
    }
}