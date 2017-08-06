package mg.wechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import mg.wechat.model.Message;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate template;
	
	@MessageMapping("/messages")
    public void handleMessage(Message message) {
		template.convertAndSend("/channel/chat/" + message.getChannel(), message);
    }
}
