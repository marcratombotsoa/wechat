package mg.wechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.wechat.model.Message;
import mg.wechat.repository.MessageRepository;

@RestController
public class MessageController {

	@Autowired MessageRepository messageRepository;
	
	@GetMapping(value = "/messages")
	public Page<Message> findMessages(Pageable pageable) {
		return messageRepository.findAll(pageable);
	}
}
