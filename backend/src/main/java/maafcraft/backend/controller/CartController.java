package maafcraft.backend.controller;

import maafcraft.backend.dto.request.AddCart;
import maafcraft.backend.dto.request.ProductReq;
import maafcraft.backend.dto.request.UpdateCart;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.model.Cart;
import maafcraft.backend.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin("${FRONTEND_BASE_URL}")
public class CartController {

    private final ICartService cartService;

    @Autowired
    public CartController(ICartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Response> addANewProduct(@RequestBody AddCart addCart){

        System.out.println(addCart.getCbm());

        return cartService.addToCart(addCart) ;
    }
    @PutMapping("/update")
    public ResponseEntity<Response> updateCarts(@RequestParam(name = "cart_id") String cartId,
                                                @RequestParam(name = "quantity") int quantity){

        return cartService.updateCart(cartId, quantity) ;
    }

    @GetMapping("/get")
    public ResponseEntity<Response> getCarts(@RequestParam(name = "email", required = false) String email,
                                             @RequestParam(name = "browser_id", required = false) String browserId
                                             ){

        return cartService.getCart(email, browserId) ;
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Response> getCarts(@RequestParam(name = "cart_id") String cartId
    ){

        return cartService.deleteCart(cartId) ;
    }

}
