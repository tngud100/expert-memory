import instance from '@/utils/axiosInstance.js';

export const boardDeleteDataAPI = () => {
    const deleteNoticeBoard = async (noticesId) => {
        return await instance.put(`/board/notice/${noticesId}/delete`)
            .then((res) => {
                alert("공지사항 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }
    const deleteFAQBoard = async (faqsId) => {
        return await instance.put(`/board/faq/${faqsId}/delete`)
            .then((res) => {
                alert("FAQ 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }
    const deleteDownloadBoard = async (downloadsId) => {
        return await instance.put(`/board/download/${downloadsId}/delete`)
            .then((res) => {
                alert("다운로드 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }
    return {
        deleteNoticeBoard,
        deleteFAQBoard,
        deleteDownloadBoard
    }
}