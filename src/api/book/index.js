import api from "../index";

export const bookService = {
    categories(params) {
        return api.get('/book/by-categories', params)
    },
    searchHotWords(params) {
        return api.get('/book/search-hotwords', params)
    },
    autoComplete(params) {
        return api.get('/book/auto-complete', params)
    },
    fuzzySearch(params) {
        return api.get('/book/fuzzy-search', params)
    }
}