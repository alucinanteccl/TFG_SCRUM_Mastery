package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ChangeRoleParamsDto {
	
	private String role;
	
	public ChangeRoleParamsDto() {}

	@NotNull
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}