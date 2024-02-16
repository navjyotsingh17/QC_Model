package com.qcModel.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") 
public class Users {
	
	@Override
	public String toString() {
		return "Users [username=" + username + ", password=" + password + "]";
	}

	@Id
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	
	public Users() {
		super();
	}

	public Users(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	


}
