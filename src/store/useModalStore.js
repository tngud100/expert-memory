import { defineStore } from "pinia";

export const useModalStore = defineStore({
    id: "modal",
    state: () => ({
        isOpenVerifyModal: false,
        verifyContent: [
            {
                code: 0,
                comments:"상품을 등록하시겠습니까?"
            },
            {
                code: 1,
                comments:"상품을 정말로 수정 하시겠습니까?"
            },
            {
                code: 2,
                comments:"상품을 정말로 삭제 하시겠습니까?"
            },
            {
                code: 3,
                comments:"상품을 메인상품에 등록 하시겠습니까?"
            },
            {
                code: 4,
                comments:"해당 상품의 이미지를 등록 하시겠습니까?"
            },
            {
                code: 5,
                comments:"해당 카테고리를 등록 하시겠습니까?"
            },
            {
                code: 6,
                comments:"해당 카테고리를 상품의 기본값으로 설정 하시겠습니까?"
            },
            {
                code: 7,
                comments:"해당 카테고리를 정말로 수정 하시겠습니까?"
            },
            {
                code: 8,
                comments:"해당 카테고리를 정말로 삭제 하시겠습니까?"
            },
            {
                code: 9,
                comments:"해당 상세상품을 등록 하시겠습니까?"
            },
            {
                code: 10,
                comments:"해당 상세상품을 카테고리의 기본값으로 설정 하시겠습니까?"
            },
            {
                code: 11,
                comments:"해당 상세상품을 정말로 수정 하시겠습니까?"
            },
            {
                code: 12,
                comments:"해당 상세상품을 정말로 삭제 하시겠습니까?"
            },
            {
                code: 13,
                comments:"해당 상품의 이미지를 삭제 하시겠습니까?"
            },
            {
                code: 14,
                comments:"해당 문의를 정말로 삭제하시겠습니까?"
            }
        ]
    }),
    getters: {
        getOpenVerifyModal: (state) => state.isOpenVerifyModal,
        getCommentByCode: (state) => (code) => {
            return state.verifyContent.find((item) => item.code === code)?.comments || "comment not found";
        },
    },
    actions: {
        setOpenVerifyModal(value) {
          this.isOpenVerifyModal = value;
        },
    }
});