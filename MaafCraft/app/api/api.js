import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const backend = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("auth") ? `Bearer ${localStorage.getItem("auth")}` : ""
    },
});


backend.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        throw new Error(error);
    }
);

backend.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        throw new Error(error);
    }
);

export async function registerUser(userData) {
    try {
        const response = await backend.post('/register', JSON.stringify(userData));
        // console.log(( response.data));       
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function loginUser(userData) {
    try {
        const response = await backend.post('/login', JSON.stringify(userData));
        // console.log(( response.data));       
        localStorage.setItem("auth", response.data.token);
        console.log(localStorage.getItem("auth"));
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function getAllCategories() {
    try {
        const response = await backend.get('/products/get-all-categories');
        return response.data;
    } catch (error) {
        throw new Error("Error fetching categories: " + error.message);
    }
}

export async function getAllProducts(item, category, page, perPage) {
    try {
        let req = '/products/get-all';
        if (item != null)
            req += `?page=${page}&per_page=${perPage}&item=${item}&category=${category}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllProductsOfDashboardCategory(dashboard) {
    try {
        let req = '/products/get-all-by-dashboard-view';
        if (dashboard != null) req += `?dashboard=${dashboard}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllProductsOfCategory(category, page, per_page) {
    try {
        let req = '/products/get-all-by-category';
        if (category != null)
            req += `?page=${page}&per_page=${per_page}&category=${category}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getNameAutoComplete(item) {
    try {
        let req = '/products/auto-name-complete?item=';
        if (item != null) req += item;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        throw error;
    }
}
