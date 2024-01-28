package com.qcModel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.qcModel.Entity.*;

public interface Login_Repository extends JpaRepository<Users, Long> {

	@Query("select u from Users u where u.username =:username and u.password =:password")
	public Users checkUser(@Param("username") String username, @Param ("password") String password);
}
