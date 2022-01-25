import {defineStore} from "pinia";
import {uuid} from "../../utils";
import {local} from "../../utils/local";
import {getToken,setToken} from "../../utils/auth";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userInfo: local.getItem("info") || {},
        token: getToken() || ''
    }),
    actions: {
        setUserData(data) {
            const userInfo = {
                name: 'John',
                avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
                phone: '15255334975'
            }
            const token = uuid()
            setToken(token)
            local.setItem("info", userInfo)
        },
        login(data) {
            return new Promise((resolve, reject) => {
                if (data) {
                    this.setUserData(data)
                    resolve()
                } else {
                    reject('error')
                }
            })
        }
    }
})