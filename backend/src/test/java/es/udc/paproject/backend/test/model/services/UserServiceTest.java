package es.udc.paproject.backend.test.model.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.paproject.backend.model.exceptions.IncorrectLanguageException;
import es.udc.paproject.backend.model.exceptions.IncorrectRoleException;
import es.udc.paproject.backend.model.services.UserService;

import static org.junit.jupiter.api.Assertions.*;
import java.awt.image.ImagingOpException;
import org.springframework.mock.web.MockMultipartFile;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
	
	private final Long NON_EXISTENT_ID = Long.valueOf(-1);
	
	@Autowired
	private UserService userService;
	
	private User createUser(String userName) {
		return new User(userName, "password", "firstName", "lastName", userName + "@" + userName + ".com");
	}
	
	@Test
	public void testSignUpAndLoginFromId() throws DuplicateInstanceException, InstanceNotFoundException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		
		User loggedInUser = userService.loginFromId(user.getId());
		
		assertEquals(user, loggedInUser);
		assertEquals(User.RoleType.DEVELOPMENT_TEAM, user.getRole());
		
	}
	
	@Test
	public void testSignUpDuplicatedUserName() throws DuplicateInstanceException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		assertThrows(DuplicateInstanceException.class, () -> userService.signUp(user));
		
	}
	
	@Test
	public void testLoginFromNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () -> userService.loginFromId(NON_EXISTENT_ID));
	}
	
	@Test
	public void testLogin() throws DuplicateInstanceException, IncorrectLoginException {
		
		User user = createUser("user");
		String clearPassword = user.getPassword();
				
		userService.signUp(user);
		
		User loggedInUser = userService.login(user.getUserName(), clearPassword);
		
		assertEquals(user, loggedInUser);
		
	}
	
	@Test
	public void testLoginWithIncorrectPassword() throws DuplicateInstanceException {
		
		User user = createUser("user");
		String clearPassword = user.getPassword();
		
		userService.signUp(user);
		assertThrows(IncorrectLoginException.class, () ->
			userService.login(user.getUserName(), 'X' + clearPassword));
		
	}
	
	@Test
	public void testLoginWithNonExistentUserName() {
		assertThrows(IncorrectLoginException.class, () -> userService.login("X", "Y"));
	}
	
	@Test
	public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		
		user.setFirstName('X' + user.getFirstName());
		user.setLastName('X' + user.getLastName());
		user.setEmail('X' + user.getEmail());
		
		userService.updateProfile(user.getId(), 'X' + user.getFirstName(), 'X' + user.getLastName(),
			'X' + user.getEmail());
		
		User updatedUser = userService.loginFromId(user.getId());
		
		assertEquals(user, updatedUser);
		
	}
	
	@Test
	public void testUpdateProfileWithNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () ->
			userService.updateProfile(NON_EXISTENT_ID, "X", "X", "X"));
	}
	
	@Test
	public void testChangePassword() throws DuplicateInstanceException, InstanceNotFoundException,
		IncorrectPasswordException, IncorrectLoginException {
		
		User user = createUser("user");
		String oldPassword = user.getPassword();
		String newPassword = 'X' + oldPassword;
		
		userService.signUp(user);
		userService.changePassword(user.getId(), oldPassword, newPassword);
		userService.login(user.getUserName(), newPassword);
		
	}
	
	@Test
	public void testChangePasswordWithNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () ->
			userService.changePassword(NON_EXISTENT_ID, "X", "Y"));
	}
	
	@Test
	public void testChangePasswordWithIncorrectPassword() throws DuplicateInstanceException {
		
		User user = createUser("user");
		String oldPassword = user.getPassword();
		String newPassword = 'X' + oldPassword;
		
		userService.signUp(user);
		assertThrows(IncorrectPasswordException.class, () ->
			userService.changePassword(user.getId(), 'Y' + oldPassword, newPassword));
		
	}

	@Test
	public void testChangeNullImage() throws InstanceNotFoundException, ImagingOpException, DuplicateInstanceException {
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		assertThrows(InstanceNotFoundException.class, () -> {
			userService.changeImage(user.getId(), null);
		});
	}

	@Test
	public void testAddImage() throws Exception {
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		byte[] imageContent = "fake image content".getBytes();
		MockMultipartFile image = new MockMultipartFile("image", "image.png", "image/png", imageContent);

		userService.changeImage(user.getId(), image);

		User updatedUser = userService.loginFromId(user.getId());
		assertNotNull(updatedUser.getImage());
	}

	@Test
	public void testChangeRole() throws Exception {
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		byte[] imageContent = "fake image content".getBytes();
		MockMultipartFile image = new MockMultipartFile("image", "image.png", "image/png", imageContent);

		userService.changeRole(user.getId(), "p");

		User updatedUser = userService.loginFromId(user.getId());
		assertEquals(updatedUser.getRole(),User.RoleType.PRODUCT_OWNER);
	}

	@Test
	public void testChangeIncorrectRole() throws Exception{
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		assertThrows(IncorrectRoleException.class, () -> {
			userService.changeRole(user.getId(), "fghjk");
		});
	}


	@Test
	public void testChangeLanguage() throws Exception {
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		byte[] imageContent = "fake image content".getBytes();
		MockMultipartFile image = new MockMultipartFile("image", "image.png", "image/png", imageContent);

		userService.changeLanguage(user.getId(), "en");

		User updatedUser = userService.loginFromId(user.getId());
		assertEquals(updatedUser.getLanguage(),"en");
	}

	@Test
	public void testChangeIncorrectLanguage() throws Exception{
		User user = new User();
		user.setUserName("josealonso");
		user.setPassword("pwd");
		user.setFirstName("Jose");
		user.setLastName("Alonso");
		user.setEmail("jose.alonso@udc.es");
		user.setImage("josealonso".getBytes());

		userService.signUp(user);

		User loggedInUser = userService.loginFromId(user.getId());

		assertThrows(IncorrectLanguageException.class, () -> {
			userService.changeLanguage(user.getId(), "fghjk");
		});
	}

}
