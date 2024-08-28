import instance from '@/utils/axiosInstance.js';

export const postProductAPI = () => {
    const logicCheck = (state) => {
        if (state === true) {
            return 1;
        }
        return 0;
    }
    const enrollProduct = async (formData) => {
        await instance.post('/product/enroll', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상품 등록 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    }

    const enrollProductCategory = async (product_id, category_name, category_state) => {
        await instance.post('/productcategory/enroll',null, {
            params: {
                product_id: product_id,
                category_name: category_name, 
                category_state: logicCheck(category_state) 
            }
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => {
            console.log(res);
            alert("카테고리 등록 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
    };

    const enrollProductDetail = async (formData) => {
        await instance.post('/productDetail/enroll', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상세상품 등록 성공");
            return res;
        })
        .catch((err) => {
            console.error(err);
            alert("상세상품 등록 실패")
            return null;
        });
    }

    return { enrollProduct, enrollProductCategory, enrollProductDetail };
}