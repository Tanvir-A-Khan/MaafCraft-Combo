package maafcraft.backend.services;

import maafcraft.backend.repositories.PhotoRepository;
import maafcraft.backend.model.Photo;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public class PhotoService implements IPhotoService{

    @Autowired
    private PhotoRepository photoRepository;

    public String addPhoto(ObjectId productId, MultipartFile file) throws IOException {

        Photo photo = new Photo(productId);

        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));

        photo = photoRepository.insert(photo);

        return photo.getId().toHexString();
    }

    public Photo getPhoto(ObjectId id) {
        return photoRepository.findById(id).get();
    }

    public List<Photo> getPhotosByProductId(ObjectId productId) {

        return photoRepository.findByProductId(productId);
    }
}
