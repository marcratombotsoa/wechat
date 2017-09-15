package mg.wechat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import mg.wechat.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

	Page<Message> findAllByChannel(String channel, Pageable pageable);
	
}
