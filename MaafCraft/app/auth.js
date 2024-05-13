function decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  
  // Function to extract data from JWT payload
  export function extractDataFromJWT(token) {
    const payload = decodeJWT(token);
    if (payload) {
      return payload;
    } else {
      console.error("Failed to extract data: invalid token or decoding error.");
      return null;
    }
  }
  