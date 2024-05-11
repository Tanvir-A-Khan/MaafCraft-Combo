package maafcraft.backend.repositories;

import maafcraft.backend.model.Photo;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PhotoRepository extends MongoRepository<Photo, ObjectId> {

    List<Photo> findByProductId(ObjectId productId);

}
