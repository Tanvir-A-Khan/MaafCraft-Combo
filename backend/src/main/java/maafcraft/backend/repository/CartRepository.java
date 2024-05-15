package maafcraft.backend.repository;

import maafcraft.backend.model.Cart;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart, ObjectId> {

    @Query("{$and :[{'browserId': ?0}, {'productName': ?1}]}")
    Cart findByBrowserIdAndProductName(String browserId, String productName);

    boolean existsByBrowserIdAndProductName(String browserId, String productName);
}
