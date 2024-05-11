package maafcraft.backend.repositories;

import maafcraft.backend.model.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {


    boolean existsByCategoryName(String categoryName);
    Category findByCategoryName(String  categoryName);

}
