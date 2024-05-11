package maafcraft.backend.controller;

import maafcraft.backend.dto.request.ProductReq;
import maafcraft.backend.dto.response.ProductResponse;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.services.IProductService;
import maafcraft.backend.services.IUploadImageCouldinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;

import static maafcraft.backend.services.ProductService.convertBase64ToMultipartFile;

@RestController
@RequestMapping("/products")
@CrossOrigin("${FRONTEND_BASE_URL}")
public class ProductController {

    private final IProductService productService;
    private final IUploadImageCouldinary uploadImageCouldinary;

    @Autowired
    public ProductController(IProductService productService, IUploadImageCouldinary uploadImageCouldinary) {
        this.productService = productService;
        this.uploadImageCouldinary = uploadImageCouldinary;
    }

    @PostMapping("/add-new")
    public ResponseEntity<Response> addANewProduct(@RequestBody ProductReq productReq){

        return productService.addNewProduct(productReq) ;
    }

    @PostMapping("/upload-image")
    public String  uploadImage(@RequestBody ImageData imageData) throws IOException {

        String base64Image = imageData.getImage();
        String name = imageData.getName();
        String description = imageData.getDescription();


        try{
            MultipartFile file = convertBase64ToMultipartFile(base64Image);
            System.out.println("Working");
            return uploadImageCouldinary.uploadImage(file);
        }catch (Exception e){

            System.out.println(e);
            MultipartFile file = convertBase64ToMultipartFile(base64Image);
            return "Got Exception";
        }

    }


    public static class Base64MultipartFile implements MultipartFile {

        private final byte[] imgContent;
        private final String contentType;

        public Base64MultipartFile(byte[] imgContent, String contentType) {
            this.imgContent = imgContent;
            this.contentType = contentType;
        }

        @Override
        public String getName() {
            return null;
        }

        @Override
        public String getOriginalFilename() {
            return null;
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public boolean isEmpty() {
            return imgContent == null || imgContent.length == 0;
        }

        @Override
        public long getSize() {
            return imgContent.length;
        }

        @Override
        public byte[] getBytes() throws IOException {
            return imgContent;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(imgContent);
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {
            new FileOutputStream(dest).write(imgContent);
        }
    }

    public static class ImageData {
        private String image;
        private String name;
        private String description;

        // Getters and setters
        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }


    @PostMapping("/delete-image")
    public String deleteImage(@RequestParam(name = "url") String url){

        return uploadImageCouldinary.deleteImage(url) ;
    }

    @PutMapping("/rate-a-product")
    public ResponseEntity<Response> rateAProduct(@RequestParam(name = "product_id") String productId,
                               @RequestParam(name = "rate") Double rate){

        return productService.rateProduct(productId, rate);
    }

    @PutMapping("/update-product")
    public ResponseEntity<Response> updateProduct(@RequestBody ProductResponse productResponse){

        return productService.updateAProduct(productResponse) ;
    }
    @DeleteMapping("/update-product")
    public ResponseEntity<Response> deleteProduct(@RequestParam String id){

        return productService.deleteAProduct(id) ;
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllProducts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page ,
            @RequestParam(name = "per_page", defaultValue = "20", required = false) int per_page,
            @RequestParam(name = "item", defaultValue = "" , required = false) String item,
            @RequestParam(name = "category" , defaultValue = "", required = false) String category
    ){

        return productService.getAllProducts(item,category, page, per_page);
    }
  @GetMapping("/get-all-by-category")
    public ResponseEntity<Response> getAllProducts(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page ,
            @RequestParam(name = "per_page", defaultValue = "20", required = false) int per_page,
            @RequestParam(name = "category" , defaultValue = "", required = false) String category
    ){

        return productService.getAllProductsByCategory(category, page, per_page);
    }

    @GetMapping("/get-all-by-dashboard-view")
    public ResponseEntity<Response> getAllProductsOfDashBoardCategory(
            @RequestParam(name = "dashboard") String category
    ){

        return productService.getAllProductsForDashboard(category);
    }



    @PostMapping("/add-new-category")
    public ResponseEntity<Response> addNewCategory(@RequestParam String category){

        return productService.addNewProductCategory(category) ;
    }

    @GetMapping("/get-all-categories")
    public ResponseEntity<Response> getAllProductsCategories(){

        return productService.getAllProductsCategories();
    }

    @DeleteMapping("/delete-category")
    public ResponseEntity<Response> deleteACategory(@RequestParam String category){

        return productService.deleteCategory(category);
    }
    @PutMapping("/update-category")
    public ResponseEntity<Response> updateACategory(@RequestParam String preCategory,
                                                    @RequestParam String newCategory){

        return productService.updateCategory(preCategory, newCategory);
    }

    @GetMapping("/auto-name-complete")
    public ResponseEntity<Response> getProductNameAutoComplete(
            @RequestParam(name = "item") String item
    ){
        System.out.println("working");
        return productService.getNameAutoComplete(item);
    }




}
