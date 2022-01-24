import api from "../index";

export const bookService = {
    categories(params) {
        return api.get('/book/by-categories', params)
    }
}