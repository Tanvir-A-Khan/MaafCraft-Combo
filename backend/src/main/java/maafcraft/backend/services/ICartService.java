package maafcraft.backend.services;

import com.amazonaws.services.dynamodbv2.xspec.S;
import maafcraft.backend.dto.request.AddCart;
import maafcraft.backend.dto.request.UpdateCart;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.model.Cart;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ICartService {
    ResponseEntity<Response> addToCart(AddCart cart);
    ResponseEntity<Response> updateCart(String cartId, int quantity);
    ResponseEntity<Response> getCart(String email, String browerId);
    ResponseEntity<Response> deleteCart(String cartId);
}
