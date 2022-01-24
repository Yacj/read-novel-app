import api from "../index";

export const rankingService = {
    gender(params, urlParams) {
        return api.get('/ranking/gender', params)
    },
    ranking(params) {
        return api.get(`/ranking/${params}`)
    }
}