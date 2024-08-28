import instance from '@/utils/axiosInstance.js';

export const boardGetDataAPI = () => {
    const getNoticeList = async () => {
        return await instance.get('/board/notice/get/all')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }
    const getFAQList = async () => {
        return await instance.get('/board/faq/get/all')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }
    const getDownloadList = async () => {
        return await instance.get('/board/download/get/all')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    const getNoticeByNoticeId = async (noticesId) => {
        return await instance.get(`/board/notice/get/${noticesId}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }
    const getFAQByFAQId = async (faqsId) => {
        return await instance.get(`/board/faq/get/${faqsId}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }
    const getDownloadByDownloadId = async (downloadsId) => {
        return await instance.get(`/board/download/get/${downloadsId}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    return {
        getNoticeList,
        getFAQList,
        getDownloadList,
        getNoticeByNoticeId,
        getFAQByFAQId,
        getDownloadByDownloadId
    };
}