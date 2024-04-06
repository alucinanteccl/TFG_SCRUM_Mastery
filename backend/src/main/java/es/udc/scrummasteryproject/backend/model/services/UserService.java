package es.udc.paproject.backend.model.services;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.exceptions.IncorrectLanguageException;
import es.udc.paproject.backend.model.exceptions.IncorrectRoleException;
import es.udc.paproject.backend.model.entities.User;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface UserService {
	
	void signUp(User user) throws DuplicateInstanceException;
	
	User login(String userName, String password) throws IncorrectLoginException;
	
	User loginFromId(Long id) throws InstanceNotFoundException;
	
	User updateProfile(Long id, String firstName, String lastName, String email) throws InstanceNotFoundException;
	
	void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException;
	
	User changeRole(Long id, String role)
		throws InstanceNotFoundException, IncorrectRoleException;
		
	User changeLanguage(Long id, String language)
		throws InstanceNotFoundException, IncorrectLanguageException;

	User changeImage(Long id, MultipartFile image)
		throws InstanceNotFoundException, IOException;


}
