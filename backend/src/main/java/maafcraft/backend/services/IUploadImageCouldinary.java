package maafcraft.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface IUploadImageCouldinary {
    String uploadImage(MultipartFile file);
    String deleteImage(String url);

}
