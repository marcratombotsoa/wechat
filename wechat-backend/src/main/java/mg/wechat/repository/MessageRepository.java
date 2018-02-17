package mg.wechat.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import mg.wechat.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

	Page<Message> findAllByChannel(String channel, Pageable pageable);
	
	@Modifying
	@Query(value = "update message set readDate = now() "
			+ " where channel = ?1 and sender = ?2 and readDate is null", nativeQuery = true)
	void sendReadReceipt(String channel, String username);
}
