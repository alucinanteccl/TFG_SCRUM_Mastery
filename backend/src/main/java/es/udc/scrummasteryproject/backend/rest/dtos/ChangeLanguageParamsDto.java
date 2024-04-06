package es.udc.paproject.backend.rest.dtos;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ChangeLanguageParamsDto {
	
	private String language;
	
	public ChangeLanguageParamsDto() {}

	@NotNull
	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

}