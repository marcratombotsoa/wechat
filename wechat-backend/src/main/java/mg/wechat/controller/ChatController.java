package mg.wechat.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import mg.wechat.model.Message;
import mg.wechat.repository.MessageRepository;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate template;

	@Autowired
	private MessageRepository messageRepository;

	/**
	 * Sends a message to its destination channel
	 *
	 * @param message
	 */
	@MessageMapping("/messages")
    public void handleMessage(Message message) {
		message.setTimestamp(new Date());
		messageRepository.save(message);
		template.convertAndSend("/channel/chat/" + message.getChannel(), message);
    }
}
