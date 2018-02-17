package mg.wechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import mg.wechat.model.Message;
import mg.wechat.model.ReadReceiptRequest;
import mg.wechat.repository.MessageRepository;

@RestController
public class MessageController {

	@Autowired MessageRepository messageRepository;
	
	@GetMapping(value = "/messages/{channelId}")
	public Page<Message> findMessages(Pageable pageable, @PathVariable("channelId") String channelId) {
		return messageRepository.findAllByChannel(channelId, pageable);
	}

	@PostMapping(value = "/messages")
	public void sendReadReceipt(@RequestBody ReadReceiptRequest request) {
		messageRepository.sendReadReceipt(request.getChannel(), request.getUsername());
	}
}
