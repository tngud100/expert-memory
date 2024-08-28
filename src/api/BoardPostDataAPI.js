import instance from '@/utils/axiosInstance.js';

export const boardPostAPI = () => {
    const enrollNotice = async (data) => {
        try {
            const response = await instance.post('/board/notice/enroll', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            alert("게시글 등록 성공");
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const enrollFAQ = async (data) => {
        try {
            const response = await instance.post('/board/faq/enroll', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            alert("FAQ 등록 성공");
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const enrollDownload = async (formData) => {
        try {
            const response = await instance.post('/board/download/enroll', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }   
            });
            console.log(response);
            alert("다운로드 게시글 등록 성공");
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        enrollNotice,
        enrollFAQ,
        enrollDownload
    };
};
