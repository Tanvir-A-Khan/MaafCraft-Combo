package maafcraft.backend.services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class UploadImageCloudinary implements IUploadImageCouldinary {

    @Override
    public String  uploadImage(MultipartFile file) {
        try {
            // Load Cloudinary credentials from environment variables
            Dotenv dotenv = Dotenv.load();
            Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));

            // Upload the image
            Map<String, Object> params = ObjectUtils.asMap(
                    "use_filename", true, // Set to true to use the original filename
                    "unique_filename", true, // Set to false if you don't want Cloudinary to generate a unique filename
                    "overwrite", false
            );
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);

            // Return the secure URL in the response entity
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            // Log the error and return a failure response
            e.printStackTrace();
            return "Cloudinary uploadFailed";
        }
    }


    public String  deleteImage(String secureUrl ) {
        try {
        Dotenv dotenv = Dotenv.load();
        Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));

        // Parse the public ID from the secure URL
        String publicId = extractPublicId(secureUrl);

        // Delete the image from Cloudinary
            Map<?, ?> deletionResult = cloudinary.uploader().destroy(publicId, null);
            return "Deletion result: " + deletionResult;

        } catch (Exception e) {

            e.printStackTrace();
            return "Delete Failed";
        }
    }

    private static String extractPublicId(String secureUrl) {
        int startIndex = secureUrl.lastIndexOf("/") + 1;
        int endIndex = secureUrl.lastIndexOf(".");
        return secureUrl.substring(startIndex, endIndex);
    }
}