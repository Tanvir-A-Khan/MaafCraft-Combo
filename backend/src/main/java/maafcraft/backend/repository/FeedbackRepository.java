package maafcraft.backend.repository;

import maafcraft.backend.model.Feedback;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackRepository extends MongoRepository<Feedback, ObjectId> {
}
