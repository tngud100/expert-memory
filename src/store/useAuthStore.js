// store/auth.js
import { defineStore } from 'pinia';
import { AuthAPI } from '@/api/AuthAPI';
import getTokenData from "@/utils/getTokenData.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userData: {
      memberId: '',
      loginId: '',
      userName: '',
      phoneNumber: '',
      zipCode: '',
      roadAddress: '',
      jibunAddress: '',
      email: '',
      birthday: '',
      role: '',
    }
  }),
  actions: {
    setUserData(userData) {
      this.userData = userData;
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
      this.userData = {
        memberId: '',
        loginId: '',
        userName: '',
        phoneNumber: '',
        zipCode: '',
        roadAddress: '',
        jibunAddress: '',
        email: '',
        birthday: '',
        role: '',
      };
    },
    async fetchUserData() {
      const { getUserDataByLoginId } = AuthAPI();
      
      if (this.token) {
        const { getUserIdFromToken } = getTokenData();
        const userId = getUserIdFromToken();
        const data = await getUserDataByLoginId(userId);
        this.setUserData({
            memberId: data.member_ID,
            loginId: data.login_ID,
            userName: data.user_NAME,
            phoneNumber: data.phone_NUM,
            zipCode: data.zipcode,
            roadAddress: data.road_ADDRESS,
            jibunAddress: data.jibun_ADDRESS,
            email: data.email,
            birthday: data.birthday,
            role: data.role,
          });
      }
    }
  },
  getters: {
    getToken: (state) => state.token,
    getUserData: (state) => state.userData,
  },
});