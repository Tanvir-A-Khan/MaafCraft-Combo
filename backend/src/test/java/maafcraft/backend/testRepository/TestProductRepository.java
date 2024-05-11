package maafcraft.backend.testRepository;
import maafcraft.backend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestProductRepository extends MongoRepository<Product, ObjectId> {

}
