package com.ldap.auth.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ldap.auth.config.LdapAuthentication;
import com.ldap.auth.entity.Response;
import com.ldap.auth.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/api")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	 @PostMapping("/authenticate")
	  public ResponseEntity<Response> authenticate(@RequestBody User credentials) {
		 
		String userName = credentials.getUser_name();
		
		String password = credentials.getPassword();
		
		logger.info(credentials.toString());
		
		Response response = new Response();
		
		try {
			if(LdapAuthentication.authUser(userName, password)) {
				String jwtToken = generateJwtToken(userName);
				
				
				response.setAuthToken(jwtToken);
				response.setSuccess("true");
				response.setMessage("User authentication successfull");
				
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
			else {
			
				response.setSuccess("false");
				response.setMessage("Error occured while authenticating the user");
				
				return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	  }
	 
	 private String generateJwtToken(String username) {
       byte[] keyBytes = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();
       @SuppressWarnings("deprecation")
		String jwtToken = Jwts.builder()
               .setSubject(username)
               .signWith(SignatureAlgorithm.HS512, keyBytes)
               .compact();
       return jwtToken;
   }

}
