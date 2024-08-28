import instance from '@/utils/axiosInstance.js';

const backendCall = (url) => {
    if (Array.isArray(url)) {
        return url.map(url => `http://localhost:8080${url.trim()}`);
        // return url.map(url => `https://KeyboardBack-env.eba-xmfhb4un.ap-northeast-2.elasticbeanstalk.com${url.trim()}`);
        // return url.map(url => `https://dik58thfdw586.cloudfront.net${url.trim()}`);
    }
    return `http://localhost:8080${url}`
    // return `https://KeyboardBack-env.eba-xmfhb4un.ap-northeast-2.elasticbeanstalk.com${url}`
    // return `https://dik58thfdw586.cloudfront.net${url}`
};

export const AskAPI = () => { 

    const getAskListAll = async () => {
        return await instance.get('/inquire/get/all')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    const getAskListByMemberId = async (memberId) => {
        return await instance.get(`/inquire/get/memberNum/${memberId}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }
    const getAskByInquireId = async (inquiresId) => {
        return await instance.get(`/inquire/get/inquireNum/${inquiresId}`)
            .then((res) => {
                const form = {
                    inquireType : res.data.inquire.inquire_type,
                    title : res.data.inquire.title,
                    content: res.data.inquire.content,
                    images: res.data.images.map((img) => {
                        return {
                            fileName: img.picture_name,
                            imgPath: backendCall(img.picture_path),
                        }
                    }),
                }
            return form;
        })
        .catch((err) => {
            return err;
        });
    }

    ///// 등록
    const enrollAsk = async (formData) => {
        return await instance.post('/inquire/enroll', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }
    const enrollAskPictures = async (imgFiles) => {
        return await instance.post('/inquire/pictures/enroll', imgFiles, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }
    const enrollAskComment = async (admin_id, inquire_id, comments) => {
        return await instance.post(`/inquire/comments/enroll/${inquire_id}`, null, {
            params:{
                member_id : admin_id,
                inquire_id : inquire_id,
                comments : comments
            }}
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }

    const updateAsk = async (formData, inquires_id) => {
        return await instance.put(`/inquire/update/${inquires_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }

    const updateAskPictures = async (formData, inquires_id) => {
        return await instance.put(`/inquire/update/pictures/${inquires_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }
    const updateAskComment = async (inquire_id, comments) => {
        return await instance.put(`/inquire/comments/update/${inquire_id}`, null, {
            params:{
                inquire_id : inquire_id,
                comments : comments
            }}
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }

    const deleteAsk = async (inquires_id) => {
        return await instance.delete(`/inquire/delete/${inquires_id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
    }

    return {
        getAskListAll,
        getAskByInquireId,
        getAskListByMemberId,
        enrollAsk,
        enrollAskPictures,
        enrollAskComment,
        updateAsk,
        updateAskPictures,
        updateAskComment,
        deleteAsk
    };
}
