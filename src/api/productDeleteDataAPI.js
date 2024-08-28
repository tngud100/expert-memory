import instance from '@/utils/axiosInstance.js';

export const deleteProductAPI = () => {

    const deleteProduct = async (product_id) => {
        console.log(product_id);
        return await instance.delete(`/product/${product_id}/delete`,{}, { 
            params: {
                product_id: product_id
            }
         }, {
            Headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상품 삭제 성공");
            return true;
        })
        .catch((err) => {
            console.error(err);
            alert("전송 실패");
            return false;
        })
    }

    const deleteProductCategory = async (product_category_id, product_id) => {
    return await instance.delete(`/productCategory/${product_category_id}/delete`, {
        params: {
            product_category_id: product_category_id,
            product_id: product_id
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        console.log(res);
        alert("카테고리 삭제 성공");
        return true;
    })
    .catch((err) => {
        console.error(err);
        alert(err.response.data);
        return false;
    });
}

    const deleteProductDetail = async (product_detail_id) => {
        return await instance.delete(`/productDetail/${product_detail_id}/delete`,{}, { 
            params: {
                product_detail_id: product_detail_id
            }
         }, {
            Headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log(res);
            alert("상세상품 삭제 성공");
            return true;
        })
        .catch((err) => {
            console.error(err);
            alert(err.response.data);
            return false;
        })
    }



    return {
        deleteProduct,
        deleteProductCategory,
        deleteProductDetail
    };
}