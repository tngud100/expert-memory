import instance from '@/utils/axiosInstance.js';

export const boardPutDataAPI = () => {
    const updateNoticeBoard = async (selectedId, formData) => {
        const noticesId = selectedId;
        await instance.put(`/board/notice/${noticesId}/update`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            alert("공지사항 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }
    const updateFAQBoard = async (selectedId, formData) => {
        const faq_id = selectedId;
        await instance.put(`/board/faq/${faq_id}/update`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            alert("FAQ 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }
    const updateDownloadBoard = async (selectedId, formData) => {
        const download_id = selectedId;
        await instance.put(`/board/download/${download_id}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            alert("다운로드 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }
    
    return {
        updateNoticeBoard,
        updateFAQBoard,
        updateDownloadBoard
    }
}