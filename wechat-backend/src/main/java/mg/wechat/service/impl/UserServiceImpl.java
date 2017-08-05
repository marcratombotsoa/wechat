package mg.wechat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mg.wechat.exception.UsernameAlreadyUsedException;
import mg.wechat.model.User;
import mg.wechat.repository.UserRepository;
import mg.wechat.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userDao;
	
	@Override
	public User connect(User user) throws UsernameAlreadyUsedException {
		User dbUser = userDao.findByUsername(user.getUsername());
		
		if (dbUser != null) {
			throw new UsernameAlreadyUsedException("The user " + user.getUsername() + " is already used.");
		}
		
		return userDao.save(user);
	}

	@Override
	public void disconnect(User user) {
		if (user == null) {
			return;
		}
		
		userDao.deleteByUsername(user.getUsername());
	}

}
