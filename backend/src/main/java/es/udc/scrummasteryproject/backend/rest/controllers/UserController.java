package es.udc.paproject.backend.rest.controllers;

import static es.udc.paproject.backend.rest.dtos.UserConversor.toAuthenticatedUserDto;
import static es.udc.paproject.backend.rest.dtos.UserConversor.toUser;
import static es.udc.paproject.backend.rest.dtos.UserConversor.toUserDto;

import java.net.URI;
import java.util.Locale;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.multipart.MultipartFile;

import es.udc.paproject.backend.model.exceptions.DuplicateInstanceException;
import es.udc.paproject.backend.model.exceptions.InstanceNotFoundException;
import es.udc.paproject.backend.model.entities.User;
import es.udc.paproject.backend.model.exceptions.IncorrectLoginException;
import es.udc.paproject.backend.model.exceptions.IncorrectPasswordException;
import es.udc.paproject.backend.model.exceptions.IncorrectRoleException;
import es.udc.paproject.backend.model.exceptions.IncorrectLanguageException;
import es.udc.paproject.backend.model.exceptions.PermissionException;
import es.udc.paproject.backend.model.services.UserService;
import es.udc.paproject.backend.rest.common.ErrorsDto;
import es.udc.paproject.backend.rest.common.JwtGenerator;
import es.udc.paproject.backend.rest.common.JwtInfo;
import es.udc.paproject.backend.rest.dtos.AuthenticatedUserDto;
import es.udc.paproject.backend.rest.dtos.ChangePasswordParamsDto;
import es.udc.paproject.backend.rest.dtos.ChangeRoleParamsDto;
import es.udc.paproject.backend.rest.dtos.ChangeLanguageParamsDto;
import es.udc.paproject.backend.rest.dtos.LoginParamsDto;
import es.udc.paproject.backend.rest.dtos.UserDto;
import es.udc.paproject.backend.rest.dtos.UserConversor;

@RestController
@RequestMapping("/users")
public class UserController {
	
	private final static String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";
	private final static String INCORRECT_PASSWORD_EXCEPTION_CODE = "project.exceptions.IncorrectPasswordException";
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Autowired
	private UserService userService;
	
	@ExceptionHandler(IncorrectLoginException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_LOGIN_EXCEPTION_CODE, null,
				INCORRECT_LOGIN_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
		
	}
	
	@ExceptionHandler(IncorrectPasswordException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleIncorrectPasswordException(IncorrectPasswordException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_PASSWORD_EXCEPTION_CODE, null,
				INCORRECT_PASSWORD_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
		
	}

	@PostMapping("/signUp")
	public ResponseEntity<AuthenticatedUserDto> signUp(
		@Validated({UserDto.AllValidations.class}) @RequestBody UserDto userDto) throws DuplicateInstanceException {
		
		User user = toUser(userDto);
		
		userService.signUp(user);
		
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest().path("/{id}")
			.buildAndExpand(user.getId()).toUri();
	
		return ResponseEntity.created(location).body(toAuthenticatedUserDto(generateServiceToken(user), user));

	}
	
	@PostMapping("/login")
	public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
		throws IncorrectLoginException {
		
		User user = userService.login(params.getUserName(), params.getPassword());
			
		return toAuthenticatedUserDto(generateServiceToken(user), user);
		
	}
	
	@PostMapping("/loginFromServiceToken")
	public AuthenticatedUserDto loginFromServiceToken(@RequestAttribute Long userId, 
		@RequestAttribute String serviceToken) throws InstanceNotFoundException {
		
		User user = userService.loginFromId(userId);
		
		return toAuthenticatedUserDto(serviceToken, user);
		
	}

	@PutMapping("/{id}")
	public UserDto updateProfile(@RequestAttribute Long userId, @PathVariable Long id,
		@Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto) 
		throws InstanceNotFoundException, PermissionException {
				
		if (!id.equals(userId)) {
			throw new PermissionException();
		}
		
		return toUserDto(userService.updateProfile(id, userDto.getFirstName(), userDto.getLastName(),
			userDto.getEmail()));
		
	}
	
	@PostMapping("/{id}/changePassword")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void changePassword(@RequestAttribute Long userId, @PathVariable Long id,
		@Validated @RequestBody ChangePasswordParamsDto params)
		throws PermissionException, InstanceNotFoundException, IncorrectPasswordException {
		
		if (!id.equals(userId)) {
			throw new PermissionException();
		}
		
		userService.changePassword(id, params.getOldPassword(), params.getNewPassword());
		
	}

	@PostMapping("/{id}/changeRole")
	public UserDto changeRole(@RequestAttribute Long userId, @PathVariable Long id, @RequestBody ChangeRoleParamsDto params) 
    	throws PermissionException, InstanceNotFoundException, IncorrectPasswordException, IncorrectRoleException {
    
    	if (!id.equals(userId)) {
        	throw new PermissionException();
    	}
		
    	User user = userService.changeRole(id, params.getRole());
		return UserConversor.toUserDto(user);
	}

	@PostMapping("/{id}/changeLanguage")
	public UserDto changeRole(@RequestAttribute Long userId, @PathVariable Long id, @RequestBody ChangeLanguageParamsDto params) 
    	throws PermissionException, InstanceNotFoundException, IncorrectPasswordException, IncorrectLanguageException {
    
    	if (!id.equals(userId)) {
        	throw new PermissionException();
    	}
		
    	User user = userService.changeLanguage(id, params.getLanguage());
		return UserConversor.toUserDto(user);
	}

	@PutMapping("/{id}/changeImage")
	public UserDto changeImage(@RequestAttribute Long userId, @PathVariable Long id,  @RequestPart("file") MultipartFile file) throws InstanceNotFoundException, PermissionException,IOException{
		if (!id.equals(userId)) {
			throw new PermissionException();
		}
		User user = userService.changeImage(id, file);
		
		return UserConversor.toUserDto(user);
	}
	
	private String generateServiceToken(User user) {
		
		JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getUserName(), user.getRole().toString());
		
		return jwtGenerator.generate(jwtInfo);
		
	}
	
}
