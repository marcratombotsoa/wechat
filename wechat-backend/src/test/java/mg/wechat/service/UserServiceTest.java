package mg.wechat.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import mg.wechat.exception.UsernameAlreadyUsedException;
import mg.wechat.model.User;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

	@Autowired
	private UserService userService;
	
	@Test
	public void testConnectUser_Successful() throws UsernameAlreadyUsedException {
		User user = userService.connect(new User("Tom"));
		
		assertNotNull(user);
		assertEquals("Tom", user.getUsername());
		assertNotNull(user.getId());
	}
	
	@Test(expected = UsernameAlreadyUsedException.class)
	public void testConnectUser_userAlreadyConnected() throws UsernameAlreadyUsedException {
		userService.connect(new User("Jerry"));
		
		// Trying to connect the same user
		userService.connect(new User("Jerry"));
	}
	
	@Test
	public void testDisconnectUser_whenUserIsNull() {
		userService.disconnect(null);
	}
	
	@Test
	public void testDisconnectUser_whenUserExists() throws UsernameAlreadyUsedException {
		userService.connect(new User("Mickey"));
		userService.disconnect(new User("Mickey"));
	}
}
