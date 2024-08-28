import instance from '@/utils/axiosInstance.js';

export const renewalDataAPI = () => {
    const enrollProduct = async (formData) => {
        return await instance.post('product/enroll', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
         .then((res) => {
            alert("상품 등록 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }

    const enrollPictorialProduct = async (formData) => {
        return await instance.post('/main/pictorial/enroll', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert("화보 등록 성공");
            return res;
        })
            .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }
    const enrollBestProduct = async (formData) => {
        return await instance.post('/main/best/enroll', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert("베스트 상품 등록 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }

    
    const getProductAllList = async () => {
        return await instance.get('/product/get/all')
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });
    }
    const getProductListById = async (product_id) => {
        return await instance.get(`/product/get/${product_id}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    }

    const getMainPictorialList = async () => {
        return await instance.get("/main/get/pictorialProduct")
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });
    }
    const getMainBestList = async () => {
        return await instance.get("/main/get/bestProduct")
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err);
                return err;
            });
    }

    const updateRenewalProduct = async (formData) => {
        return await instance.put('/product/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert("상품 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }
    const updatePictorialProduct = async (formData) => {
        return await instance.put('/main/pictorial/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert("화보 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }
    const updateBestProduct = async (formData) => {
        return await instance.put('/main/best/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            alert("베스트 상품 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return null;
        });
    }


    const deleteRenewalProduct = async (product_id) => {
        return await instance.put(`/product/delete/${product_id}`)
            .then((res) => {
                alert("상품 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }
    const deletePictorialProduct = async (pictorial_product_id) => {
        return await instance.put(`/main/pictorial/delete/${pictorial_product_id}`)
            .then((res) => {
                alert("화보 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    const deleteBestProduct = async (best_product_id) => {
        return await instance.put(`/main/best/delete/${best_product_id}`)
            .then((res) => {
                alert("베스트 상품 삭제 성공");
                return res;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    return {
        enrollProduct,
        enrollPictorialProduct,
        enrollBestProduct,
        getProductAllList,
        getProductListById,
        getMainBestList,
        getMainPictorialList,
        updateRenewalProduct,
        updatePictorialProduct,
        updateBestProduct,
        deleteRenewalProduct,
        deletePictorialProduct,
        deleteBestProduct
    };
}