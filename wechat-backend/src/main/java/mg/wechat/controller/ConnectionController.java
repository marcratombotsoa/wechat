package mg.wechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import mg.wechat.exception.UsernameAlreadyUsedException;
import mg.wechat.model.User;
import mg.wechat.repository.UserRepository;
import mg.wechat.service.UserService;

@RestController
public class ConnectionController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userDao;

	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> login(@RequestBody User user) {
		
		try {
			userService.connect(user);
		} catch (UsernameAlreadyUsedException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		}
		
		return ResponseEntity.ok().build();
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void logout(@RequestBody User user) {
		userService.disconnect(user);
	}
	
	@RequestMapping(value = "/listUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<User> findConnectedUsers() {
		return userDao.findAll();
	}
}
