package maafcraft.backend.services;

import maafcraft.backend.dto.request.FeedBackMessage;
import maafcraft.backend.dto.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IMessageService {

    ResponseEntity<Response> addMessage(FeedBackMessage feedBackMessage);
    ResponseEntity<Response> getMessages();
}
