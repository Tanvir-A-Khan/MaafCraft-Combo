package maafcraft.backend.services;

import maafcraft.backend.dto.request.AddCart;
import maafcraft.backend.dto.request.UpdateCart;
import maafcraft.backend.dto.response.Response;

import maafcraft.backend.model.Cart;
import maafcraft.backend.repository.CartRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService implements ICartService{

    private final CartRepository cartRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public CartService(CartRepository cartRepository, MongoTemplate mongoTemplate) {
        this.cartRepository = cartRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ResponseEntity<Response> addToCart(AddCart addCart) {
        try {
            // Find existing cart item by browserId and productId
            Cart cartNew = new Cart();
            if(cartRepository.existsByBrowserIdAndProductName(addCart.getBrowserId(), addCart.getProductName())){

                cartNew = cartRepository.findByBrowserIdAndProductName(addCart.getBrowserId(), addCart.getProductName());
            }

            if (cartNew == null) {
                cartNew = new Cart();
            }
            cartNew.setProductName(addCart.getProductName());
            cartNew.setBrowserId(addCart.getBrowserId());

            // Null checks before setting properties
            if (addCart.getImage() != null) {
                cartNew.setImage(addCart.getImage());
            }

            cartNew.setWeight(addCart.getWeight());

            System.out.println(addCart.getCbm());
            cartNew.setCBM(addCart.getCbm());

            cartNew.setPrice(addCart.getPrice());
            if (addCart.getEmail() != null) {
                cartNew.setEmail(addCart.getEmail());
            }

            cartNew.setQuantity(addCart.getQuantity());
            // Save the cart item
            cartRepository.save(cartNew);

            // Return success response
            return new ResponseEntity<>(new Response(true, "Added to cart"), HttpStatus.CREATED);

        } catch (Exception e) {
            // Return error response if any exception occurs
            return new ResponseEntity<>(new Response(false,
                    "Failed to add to cart"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Response> updateCart(String cartId, int quantity) {
        try {

            Optional<Cart> optionalCart = cartRepository.findById(new ObjectId(cartId));
            if(optionalCart.isPresent()) {
                Cart cart = optionalCart.get();
                cart.setQuantity(quantity);
                cartRepository.save(cart);
                return new ResponseEntity<>(new Response(true, "Cart Updated"), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(new Response(false, "Cart ID invalid"), HttpStatus.OK);

            }
        }catch (Exception e){
            return new ResponseEntity<>(new Response(false, "Added to cart"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Response> getCart(String email, String browserId) {
        Query query = new Query();

        List<Criteria> criteriaList = new ArrayList<>();
        criteriaList.add(Criteria.where("email").is(email));
        criteriaList.add(Criteria.where("browserId").is(browserId));
        Criteria finalCriteria = new Criteria().orOperator(criteriaList.toArray(new Criteria[0]));
        query.addCriteria(finalCriteria);
        List<Cart> result = mongoTemplate.find(query, Cart.class);
        if (result.isEmpty()) {
            return ResponseEntity.ok(new Response(false,"Nothing in cart"));
        } else {
            return ResponseEntity.ok(new Response(true,"Success", getCartResponse(result)));
        }
    }

    @Override
    public ResponseEntity<Response> deleteCart(String cartId) {
        cartRepository.deleteById(new ObjectId(cartId));
        return ResponseEntity.ok(new Response(true,"Removed From Cart"));
    }

    public List<UpdateCart> getCartResponse(List<Cart> carts)
    {
        List<UpdateCart> updateCarts = new ArrayList<>();
        for(Cart cart: carts){
            UpdateCart updateCart = new UpdateCart();
            updateCart.setId(cart.getId().toHexString());
            updateCart.setEmail(cart.getEmail());
            updateCart.setQuantity(cart.getQuantity());
            updateCart.setBrowserId(cart.getBrowserId());
            updateCart.setImage(cart.getImage());
            updateCart.setCBM(cart.getCBM());
            updateCart.setPrice(cart.getPrice());
            updateCart.setWeight(cart.getWeight());
            updateCart.setProductName(cart.getProductName());
            updateCarts.add(updateCart);
        }
        return updateCarts;
    }
}
