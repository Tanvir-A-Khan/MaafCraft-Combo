package maafcraft.backend.controller;

import maafcraft.backend.dto.request.FeedBackMessage;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.services.IMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
public class MessageController {

    private final IMessageService messageService;

    @Autowired
    public MessageController(IMessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<Response> addMessagess(@RequestBody FeedBackMessage feedBackMessage){
        return messageService.addMessage(feedBackMessage);
    }

    @GetMapping
    public ResponseEntity<Response> getmessages(){
        return messageService.getMessages();
    }
}
