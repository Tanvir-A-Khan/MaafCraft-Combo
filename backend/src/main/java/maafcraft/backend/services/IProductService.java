package maafcraft.backend.services;

import maafcraft.backend.dto.request.ProductReq;
import maafcraft.backend.dto.response.ProductResponse;
import maafcraft.backend.dto.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IProductService {
    ResponseEntity<Response> getAllProducts(String item, String category, int page, int perPage);
    ResponseEntity<Response> getAllProductsByCategory( String category, int page, int perPage);
    ResponseEntity<Response> getAllProductsForDashboard (String  dashboardCategory);
    ResponseEntity<Response> addNewProduct(ProductReq productReq);
    ResponseEntity<Response> updateAProduct(ProductResponse productResponse);
    ResponseEntity<Response> deleteAProduct(String id);
    ResponseEntity<Response> addNewProductCategory(String productCategory);
    ResponseEntity<Response> getAllProductsCategories();
    ResponseEntity<Response> deleteCategory(String categoryName);
    ResponseEntity<Response> updateCategory(String preCategory, String newCategory);
    ResponseEntity<Response> rateProduct(String id, Double rate);

    ResponseEntity<Response> getNameAutoComplete(String item);
    ResponseEntity<Response> getCategories(String category);
    ResponseEntity<Response> getGallery();
}
