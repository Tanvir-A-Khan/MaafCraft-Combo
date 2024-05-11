package maafcraft.backend.repositories;

import maafcraft.backend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {

    boolean existsByItem(String item);

    List<Product> findByCategory(String categoryName);
    Page<Product> findByCategory(String categoryName, Pageable pageable);

    Optional<Product> findByItemIgnoreCase(String item);

    List<Product> findByDashboardView(String dashboardCategory);
}
