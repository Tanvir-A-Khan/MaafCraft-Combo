package maafcraft.backend.services;

import maafcraft.backend.dto.request.FeedBackMessage;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.model.Feedback;
import maafcraft.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService implements IMessageService {

    private final FeedbackRepository feedbackRepository;

@Autowired
    public MessageService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public ResponseEntity<Response> addMessage(FeedBackMessage feedBackMessage) {

        try {
            Feedback feedback = new Feedback();
            feedback.setMessage(feedBackMessage.getMessage());
            feedback.setEmail(feedBackMessage.getEmail());
            feedback.setPhone(feedBackMessage.getPhone());
            feedback.setName(feedBackMessage.getName());

            feedbackRepository.save(feedback);

            return new ResponseEntity<>(new Response(true, "Your feedback has been received"), HttpStatus.CREATED);

        }catch (Exception e){
            return new ResponseEntity<>(new Response(false, "Message sent failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Response> getMessages() {
        List<Feedback> messages = feedbackRepository.findAll();

        return new ResponseEntity<>(new Response(true, "Feedbacks", messages), HttpStatus.OK);

    }
}
