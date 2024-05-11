package maafcraft.backend.services;

import maafcraft.backend.model.Photo;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IPhotoService {
    String addPhoto(ObjectId productId, MultipartFile file) throws IOException;
    Photo getPhoto(ObjectId id);
    List<Photo> getPhotosByProductId(ObjectId id);
}
