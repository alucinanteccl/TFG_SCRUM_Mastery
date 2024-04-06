package es.udc.paproject.backend.model.services;

import java.util.Optional;
import java.io.IOException;

import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.IncorrectLanguageException;
import es.udc.paproject.backend.model.exceptions.IncorrectRoleException;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.entities.UserDao;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public void signUp(User user) throws DuplicateInstanceException {
		
		if (userDao.existsByUserName(user.getUserName())) {
			throw new DuplicateInstanceException("project.entities.user", user.getUserName());
		}
			
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(User.RoleType.DEVELOPMENT_TEAM);
		userDao.save(user);
		
	}

	@Override
	@Transactional(readOnly=true)
	public User login(String userName, String password) throws IncorrectLoginException {
		
		Optional<User> user = userDao.findByUserName(userName);
		
		if (!user.isPresent()) {
			throw new IncorrectLoginException(userName, password);
		}
		
		if (!passwordEncoder.matches(password, user.get().getPassword())) {
			throw new IncorrectLoginException(userName, password);
		}
		
		return user.get();
		
	}
	
	@Override
	@Transactional(readOnly=true)
	public User loginFromId(Long id) throws InstanceNotFoundException {
		return permissionChecker.checkUser(id);
	}

	@Override
	public User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException {
		
		User user = permissionChecker.checkUser(id);
		
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		
		return user;

	}

	@Override
	public void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException {
		
		User user = permissionChecker.checkUser(id);
		
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new IncorrectPasswordException();
		} else {
			user.setPassword(passwordEncoder.encode(newPassword));
		}
		
	}

	@Override
	public User changeRole(Long id, String role)
		throws InstanceNotFoundException, IncorrectRoleException {
		
		User user = permissionChecker.checkUser(id);
		
		if("d".equals(role)){
			user.setRole(User.RoleType.DEVELOPMENT_TEAM);
		}else{
			if("s".equals(role)){
				user.setRole(User.RoleType.SCRUM_MASTER);
			}else{
				if("p".equals(role)){
					user.setRole(User.RoleType.PRODUCT_OWNER);
					System.out.println(user.getRole().toString());
				}else{
					throw new IncorrectRoleException();
				}
			}
		}	

		return user;
	}

	@Override
	public User changeLanguage(Long id, String role)
		throws InstanceNotFoundException, IncorrectLanguageException {
		
		User user = permissionChecker.checkUser(id);
		if(role.equals("en") || role.equals("es") || role.equals("gl") ){
			user.setLanguage(role);
		}else{
			throw new IncorrectLanguageException();
		}

		return user;
	}

	
	@Override
	public User changeImage(Long id, MultipartFile image) throws InstanceNotFoundException, IOException {

		if (image == null) {
			throw new InstanceNotFoundException("User image not found", null);
		}

		User user = permissionChecker.checkUser(id);
		user.setImage(image.getBytes());

		return user;
	}

}
