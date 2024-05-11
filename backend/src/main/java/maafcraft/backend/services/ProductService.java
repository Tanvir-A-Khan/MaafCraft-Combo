package maafcraft.backend.services;

import maafcraft.backend.controller.ProductController;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.dto.response.Search;
import maafcraft.backend.repositories.CategoryRepository;
import maafcraft.backend.repositories.ProductRepository;
import maafcraft.backend.dto.request.ProductReq;
import maafcraft.backend.dto.response.DashboardProductResponse;
import maafcraft.backend.dto.response.ProductResponse;
import maafcraft.backend.model.Category;
import maafcraft.backend.model.Product;
import maafcraft.backend.model.submodels.ProductDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProductService implements IProductService {

    public final ProductRepository productRepository;
    public final CategoryRepository categoryRepository;
    public final UploadImageCloudinary uploadImageCloudinary;
    public final MongoTemplate mongoTemplate;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
                          UploadImageCloudinary uploadImageCloudinary, MongoTemplate mongoTemplate) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.uploadImageCloudinary = uploadImageCloudinary;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ResponseEntity<Response> getAllProducts(String item, String category, int page, int perPage) {


        if(page<0 || perPage<0){
            page = 1;
            perPage = 20;
        }


        try{
            Pageable pageable =  PageRequest.of(page, perPage);
            Page<Product> productPage = null;

            if(item!=null && !item.isEmpty()){
                Optional<Product> optionalProduct = productRepository.findByItemIgnoreCase(item);

                return optionalProduct.map(product -> new ResponseEntity<>(new Response(true, "Success",
                        getProductResponse(product)),
                        HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(new Response(false, "No product found of " + item),
                        HttpStatus.OK));
            }
            if(category!= null && !category.isEmpty()){
                productPage = productRepository.findByCategory(category, pageable);
            }else{
                productPage = productRepository.findAll(pageable);
            }

            List<Product> productList = productPage.getContent();
            if(productList.isEmpty()){
                return  new ResponseEntity<>(new Response(false, "No product found"),
                        HttpStatus.OK);
            }

            List<ProductResponse> productResponses = getAllProductsResponseList(productList);
            HashMap<String, Object> response = new HashMap<>();
            response.put("data", productResponses);
            response.put("total", productPage.getTotalElements());

            return new ResponseEntity<>(new Response(true, "Success", response),
                    HttpStatus.OK);

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Exception error"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Override
    public ResponseEntity<Response> getAllProductsByCategory(String category, int page, int perPage) {
        try{

            if(category != null && !category.isEmpty()){

                List<Product> productList = productRepository.findByCategory(category);
                List<ProductResponse> productResponses = getAllProductsResponseList(productList);
                HashMap<String, Object> response = new HashMap<>();
                response.put("data", productResponses);
                response.put("total", productList.size());

                return new ResponseEntity<>(new Response(true,
                        "Success", response),
                        HttpStatus.OK);

            }
            return new ResponseEntity<>(new Response(false,
                    "No product found of this Category"),
                    HttpStatus.OK);

        }catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Exception error"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Response> getAllProductsForDashboard(String dashboardCategory) {
        try{

            if(dashboardCategory != null && !dashboardCategory.isEmpty()){

                List<Product> productList = productRepository.findByDashboardView(dashboardCategory);
                List<DashboardProductResponse> productResponses = getAllProductsResponseListForDashboard(productList);
                HashMap<String, Object> response = new HashMap<>();
                response.put("data", productResponses);
                response.put("total", productList.size());

                return new ResponseEntity<>(new Response(true,
                        "Success", response),
                        HttpStatus.OK);

            }
            return new ResponseEntity<>(new Response(false,
                    "No product found of this dashboardCategory"),
                    HttpStatus.OK);

        }catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Exception error"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private List<ProductResponse> getAllProductsResponseList(List<Product> productList) {

        List<ProductResponse> productResponses = new ArrayList<>();
        for(Product product: productList){
            productResponses.add(getProductResponse(product));
        }
        return productResponses;
    }
    private List<DashboardProductResponse> getAllProductsResponseListForDashboard(List<Product> productList) {

        List<DashboardProductResponse> productResponses = new ArrayList<>();
        for(Product product: productList){
            DashboardProductResponse productResponse = new DashboardProductResponse();
            productResponse.setId(product.getId().toHexString());
            productResponse.setItem(product.getItem());
            productResponse.setModel(product.getModel());
            productResponse.setMaterial(product.getMaterials());
            productResponse.setImages(product.getImages().get(0));
            productResponse.setPricePerPiece(product.getPricePerPiece());
            productResponse.setRating(product.getRating());
            productResponse.setDescription(product.getDescription());
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    public ProductResponse getProductResponse(Product product){
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId().toHexString());
        productResponse.setItem(product.getItem());
        productResponse.setModel(product.getModel());
        productResponse.setMaterials(product.getMaterials());
        productResponse.setTechnique(product.getTechnique());
        productResponse.setColor(product.getColor());
        productResponse.setRemarks(product.getRemarks());
        productResponse.setMoq(product.getMoq());
        productResponse.setLeadTime(product.getLeadTime());
        productResponse.setDescription(product.getDescription());
        productResponse.setImages(product.getImages());
        productResponse.setRating(product.getRating());
        productResponse.setPricePerPiece(product.getPricePerPiece());
        List<ProductDetails> productDetails = getProductDetailsList(product);
        productResponse.setProductDetails(productDetails);
        productResponse.setCategory(product.getCategory());
        productResponse.setDashboardView(product.getDashboardView());

        return productResponse;

    }

    private static List<ProductDetails> getProductDetailsList(Product product) {
        List<ProductDetails> productDetails = new ArrayList<>();
        for(ProductDetails productDetail: product.getProductDetails()){
            ProductDetails productDetails1 = new ProductDetails();
            productDetails1.setProductSize(productDetail.getProductSize());
            productDetails1.setWeight(productDetail.getWeight());
            productDetails1.setLength(productDetail.getLength());
            productDetails1.setWidth(productDetail.getWidth());
            productDetails1.setHeight(productDetail.getHeight());

            productDetails.add(productDetails1);
        }
        return productDetails;
    }

    @Override
    public ResponseEntity<Response> addNewProduct(ProductReq productReq) {

        try{
            Product product = new Product();

            if( productRepository.existsByItem(productReq.getItem()) ){
                return new ResponseEntity<>(new Response(false, "Item of name "
                        + productReq.getItem() + "already exist"),
                        HttpStatus.BAD_REQUEST);
            }
            product.setItem(productReq.getItem());
            product.setModel(productReq.getModel());
            product.setMaterials(productReq.getMaterials());

            product.setTechnique(productReq.getTechnique());
            product.setColor(productReq.getColor());
            product.setRemarks(productReq.getRemarks());
            product.setMoq(productReq.getMoq());
            product.setLeadTime(productReq.getLeadTime());
            product.setDescription(productReq.getDescription());
            product.setImages(productReq.getImages());
            product.setRating(0.0);
            product.setPricePerPiece(productReq.getPricePerPiece());

            List<String> images = new ArrayList<>();

            for(String img: productReq.getImages()){
                try {
                    MultipartFile file = convertBase64ToMultipartFile(img);
                    String url = uploadImageCloudinary.uploadImage(file);
                    images.add(url);
                }catch (Exception e){
                    System.out.println(e);
                }
            }

            product.setImages(images);
            List<ProductDetails> productDetailsList = getProductDetails(productReq);
            product.setProductDetails(productDetailsList);

            product.setProductDetails(productReq.getProductDetails());

            if(!categoryRepository.existsByCategoryName(productReq.getCategory())){
                return new ResponseEntity<>(new Response(false, "Category "+ productReq.getCategory() +
                        " does not exist"),
                        HttpStatus.BAD_REQUEST);
            }

            product.setCategory(productReq.getCategory());
            product.setDashboardView(productReq.getDashboardView());
            productRepository.save(product);

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Response(true, "Product Added Successful"),
                HttpStatus.CREATED);
    }

    public static MultipartFile convertBase64ToMultipartFile(String base64Image) throws IOException {
        // Extract content type and base64 payload from the base64Image string
        String[] parts = base64Image.split(",");
        String contentType = parts[0].split(";")[0].split(":")[1];
        String base64Payload = parts[1];

        // Decode base64 payload
        byte[] decodedBytes = Base64.getDecoder().decode(base64Payload);


        // Convert byte array to MultipartFile
        return new ProductController.Base64MultipartFile(decodedBytes, contentType);
    }

    private static List<ProductDetails> getProductDetails(ProductReq productReq) {
        List<ProductDetails> productDetailsList = new ArrayList<>();
        for(ProductDetails productDetails: productReq.getProductDetails()){
            ProductDetails productDetails1 = new ProductDetails();
            productDetails1.setProductSize(productDetails.getProductSize());
            productDetails1.setWeight(productDetails.getWeight());
            productDetails1.setHeight(productDetails.getHeight());
            productDetails1.setLength(productDetails.getLength());
            productDetails1.setWidth(productDetails.getWidth());
            productDetailsList.add(productDetails1);
        }
        return productDetailsList;
    }

    @Override
    public ResponseEntity<Response> updateAProduct(ProductResponse productResponse) {
        try{
            Optional<Product> productOptional = productRepository.findById(new ObjectId(productResponse.getId()));

            if(productOptional.isPresent()){
                Product product = productOptional.get();
                if( productRepository.existsByItem(productResponse.getItem()) ){
                    return new ResponseEntity<>(new Response(false, "Item of name "
                            + productResponse.getItem() + "already exist"),
                            HttpStatus.BAD_REQUEST);
                }
                product.setItem(productResponse.getItem());
                product.setModel(productResponse.getModel());
                product.setMaterials(productResponse.getMaterials());
                product.setTechnique(productResponse.getTechnique());
                product.setColor(productResponse.getColor());
                product.setRemarks(productResponse.getRemarks());
                product.setMoq(productResponse.getMoq());
                product.setLeadTime(productResponse.getLeadTime());
                product.setDescription(productResponse.getDescription());
                product.setImages(productResponse.getImages());
                product.setRating(productResponse.getRating());
                product.setPricePerPiece(productResponse.getPricePerPiece());

                product.setProductDetails(productResponse.getProductDetails());
                if(!categoryRepository.existsByCategoryName(productResponse.getCategory())){
                    return new ResponseEntity<>(new Response(false,
                            "Category "+ productResponse.getCategory() + " does not exist"),
                            HttpStatus.BAD_REQUEST);
                }
                product.setCategory(productResponse.getCategory());
                product.setDashboardView(productResponse.getDashboardView());
                productRepository.save(product);

            }else{
                return new ResponseEntity<>(new Response(false, "Product Not Found"),
                        HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts while updating"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Response(true, "Product Update Successful"),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Response> deleteAProduct(String id) {
        try{
            Product product = productRepository.findById(new ObjectId(id)).orElse(null);

            if(product != null){
                productRepository.delete(product);

            }else{
                return new ResponseEntity<>(new Response(false, "Product Not Found"),
                        HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts Deleting Product"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Response(true, "Product Deleted Successful"),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Response> addNewProductCategory(String productCategory) {
        try{

            if(categoryRepository.existsByCategoryName(productCategory)){
                return new ResponseEntity<>(new Response(false,
                        "Already Have one category of this name + ", productCategory),
                        HttpStatus.BAD_REQUEST);
            }

            Category category = new Category();

            category.setCategoryName(productCategory);

            categoryRepository.save(category);

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts Creating Category"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new Response(true, "Product Category Creation Successful"),
                HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Response> getAllProductsCategories() {
        try{
            List<Category> categories =  categoryRepository.findAll();

            List<String> categoryList = new ArrayList<>();

            for(Category category:categories) {

                categoryList.add(category.getCategoryName());
            }

            return new ResponseEntity<>(new Response(true, "List of categories", categoryList),
                    HttpStatus.OK);

        } catch (Exception e){

            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts getting Category"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Response> deleteCategory(String categoryName) {


        try {

            List<Product> producList = productRepository.findByCategory(categoryName);

            if (!producList.isEmpty()) {
                return new ResponseEntity<>(new Response(false,
                        "There are " + producList.size() + " products live in this category. Delete them first"),
                        HttpStatus.OK);

            }

            Category category = categoryRepository.findByCategoryName(categoryName);

            categoryRepository.delete(category);

            category.setCategoryName(categoryName);
            return new ResponseEntity<>(new Response(true, "Category Delete Successfull"),
                    HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts deleting Category"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @Override
    public ResponseEntity<Response> updateCategory(String preCategory, String newCategory) {

        try {
            List<Product> producList = productRepository.findByCategory(preCategory);

            if(!producList.isEmpty()){
                for(Product product: producList){
                    product.setCategory(newCategory);
                }
            }else {
                return new ResponseEntity<>(new Response(false,
                        "Category Not found"),
                        HttpStatus.BAD_REQUEST);
            }
            productRepository.saveAll(producList);

            Category category =  categoryRepository.findByCategoryName(preCategory);

            category.setCategoryName(newCategory);

            categoryRepository.save(category);
            return new ResponseEntity<>(new Response(true, "Category Update Successfull"),
                    HttpStatus.BAD_REQUEST);

        }catch (Exception e){
            return new ResponseEntity<>(new Response(false, "Unsuccessful Attempts updating Category"),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public ResponseEntity<Response> rateProduct(String id, Double rate) {

        Optional<Product> productOptional = productRepository.findById(new ObjectId(id));
        if(productOptional.isPresent()){
            Product product = productOptional.get();

            product.setRating((product.getRating()+rate)/2.0);
            productRepository.save(product);
            return  new ResponseEntity<>(new Response(true, "Product Rated"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new Response(false, "Product Not found"),
                HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<Response> getNameAutoComplete(String item) {

        List<Product> productList = searchNames(item);
        List<Search> names = getProductsSearch(productList);
        return new ResponseEntity<>(new Response(true, "Success", names),
                HttpStatus.OK);

    }

    public List<Product> searchNames(String searchTerm) {
        Query query = new Query();
        Criteria criteria = Criteria.where("item").regex(searchTerm, "i");
        query.addCriteria(criteria);
        return mongoTemplate.find(query, Product.class);
    }

    private List<Search > getProductsSearch(List<Product> productList){
        List<Search> searches = new ArrayList<>();
        int i=0;
        for(Product product: productList){
            Search search = new Search();
            search.setName(product.getItem());
            search.setId(i++);
            searches.add(search);
        }
        return searches;
    }


}
