package maafcraft.backend.services;

import maafcraft.backend.dto.request.ProductReq;
import maafcraft.backend.dto.response.ProductResponse;
import maafcraft.backend.dto.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IProductService {
    public ResponseEntity<Response> getAllProducts(String item, String category, int page, int perPage);
    public ResponseEntity<Response> getAllProductsByCategory( String category, int page, int perPage);
    public ResponseEntity<Response> getAllProductsForDashboard (String  dashboardCategory);
    public ResponseEntity<Response> addNewProduct(ProductReq productReq);
    public ResponseEntity<Response> updateAProduct(ProductResponse productResponse);
    public ResponseEntity<Response> deleteAProduct(String id);
    public ResponseEntity<Response> addNewProductCategory(String productCategory);
    public ResponseEntity<Response> getAllProductsCategories();
    public ResponseEntity<Response> deleteCategory(String categoryName);
    public ResponseEntity<Response> updateCategory(String preCategory, String newCategory);
    public ResponseEntity<Response> rateProduct(String id, Double rate);

    ResponseEntity<Response> getNameAutoComplete(String item);
}
