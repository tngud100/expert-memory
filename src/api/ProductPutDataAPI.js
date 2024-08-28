import instance from '@/utils/axiosInstance.js';

export const putProductAPI = () => {
    const updateProduct = async (formData) => {
        const product_id = formData.get('product_id');
        await instance.put(`/product/${product_id}/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상품 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }
    
    const updateProductCategory = async (product_id, product_category_id, category_name) => {
        await instance.put(`/product/${product_id}/category/update`,{}, { 
            params: {
                product_id: product_id,
                product_category_id: product_category_id,
                category_name: category_name
            }
         }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            alert("카테고리 이름 설정 성공");
            return res;
        })
        .catch((err) => {
            alert(err.response.data);
            return null;
        })
    }

    const setCategoryDefault = async (product_id, product_category_id) => {
        return await instance.put('/productDetail/setCategoryDefault',{}, { 
            params: {
                product_id: product_id,
                product_category_id: product_category_id
            }
         }, {
            Headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            alert("카테고리 기본값 설정 성공");
            return res;
        })
        .catch((err) => {
            alert(err.response.data);
            return false;
        })
    }

    const updateProductDetail = async (formData, product_detail_id) => {
        await instance.put(`/productDetail/${product_detail_id}/update`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상세상품 수정 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }

    const setProductDetailDefault = async (product_id, product_detail_id) => {
        await instance.put("/productDetail/setProductDefault", {}, {
            params: {
                product_id: product_id,
                product_detail_id: product_detail_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                alert("상세상품 기본값 설정 성공");
                return res;
            })
            .catch((err) => {
                alert(err.response.data);
                return false;
            })
    }
    const setProductMain = async (product_id) => {
        await instance.put("/product/setMain", {}, {
            params: {
                product_id: product_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                alert("메인상품 설정 성공");
                return res;
            })
            .catch((err) => {
                alert(err.response.data);
                return false;
            })
    }
    const uploadProductMainImg = async (formData) => {
        await instance.put("/product/insertMainPicture", formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                alert("메인이미지 업로드 성공");
                return res;
            })
            .catch((err) => {
                alert(err.response.data);
                return false;
            })
    }

    const resetMainPicture = async (product_id) => {
        await instance.put("/product/resetMainPicture", {}, {
            params: {
                product_id: product_id
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                alert("메인이미지 초기화 성공");
                return res;
            })
            .catch((err) => {
                alert(err.response.data);
                return false;
            })
    }


    return {
        setCategoryDefault,
        updateProductCategory,
        updateProductDetail,
        setProductDetailDefault,
        updateProduct,
        setProductMain,
        uploadProductMainImg,
        resetMainPicture,
    };
}