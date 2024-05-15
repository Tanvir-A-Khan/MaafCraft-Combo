import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

let authToken = "";
if (typeof window !== "undefined") {
  authToken = localStorage.getItem("auth") || "";
}

const backend = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": authToken ? `Bearer ${authToken}` : ""
  }
});

backend.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return new Error(error);
    }
);

backend.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return new Error(error);
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
            
        localStorage.setItem("auth", response?.data?.token);
        console.log(localStorage.getItem("auth"));
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function getAllTypes(type) {
    try {
        const response = await backend.get('/products/get-all-types?category='+type);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return ("Error fetching categories: " + error.message);
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
        return error;
    }
}

export async function getAllProductsOfDashboardCategory(dashboard) {
    try {
        let req = '/products/get-all-by-dashboard-view';
        if (dashboard != null) req += `?dashboard=${dashboard}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
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
        return error;
    }
}

export async function getNameAutoComplete(item) {
    try {
        let req = '/products/auto-name-complete?item=';
        if (item != null) req += item;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addToCart(data) {
    try {
        let req = '/cart/add';
        // if (item != null) req += item;
        const response = await backend.post(req, data);
        console.log(response);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getCartItem(bid, email) {
    try {
        console.log(bid, email);
        let req = `/cart/get?browser_id=${bid}`;
        if (email != null) req += `&email=${email}`;
        const response = await backend.get(req);
        console.log(response);
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function removeACart(cartId) {
    try {
        console.log(cartId);
        let req = `/cart/delete?cart_id=${cartId}`;
        const response = await backend.delete(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateQuantity(cartId, quantity) {
    try {
        console.log(cartId, quantity);
        let req = `/cart/update?cart_id=${cartId}&quantity=${quantity}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function logout(cartId, quantity) {
    try {
        console.log(cartId, quantity);
        let req = `/cart/update?cart_id=${cartId}&quantity=${quantity}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getGalleryImages() {
    try {
        let req = `/products/gallery`;
        console.log(req);
        const response = await backend.get(req);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}