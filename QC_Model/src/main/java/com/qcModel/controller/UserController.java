package com.qcModel.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qcModel.Entity.Users;
import com.qcModel.Utility.CripUtils;
import com.qcModel.model.Registermsg;
import com.qcModel.repository.Login_Repository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@PropertySource("classpath:application.properties")
@PropertySource("classpath:log4j.properties")

public class UserController {
	
	@Autowired
	Login_Repository login_repository;
	
	Registermsg registermsg;
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@PostMapping("/createUser")
	public ResponseEntity<Registermsg> Register(@RequestBody Users user) 
	{
			logger.info("Inside createUser");
		
			Registermsg message = new Registermsg();
			
			try {
				String encryptedPassword = CripUtils.encryptStr(user.getPassword() , "HU58YZ3CR9");
				
				logger.info(encryptedPassword);
				
				user.setPassword(encryptedPassword);
				
			} catch (Exception e) {
				
				// TODO Auto-generated catch block
				logger.error("Error occured while encrypting password");
				e.printStackTrace();
				return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
				
			}
			
			message.setMessage("User created succussefully...");

			login_repository.save(user);                  //saves all the data of the user obj using login_repository
			
			return new ResponseEntity<Registermsg>(message,HttpStatus.OK);    	//return 200 ok status
			
	}
	
	@PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody Users user, HttpSession session) {
        
		logger.info("Inside login");
		
		logger.info("User: "+user);

        String username = user.getUsername();
        String password = null;

        try {
            password = CripUtils.encryptStr(user.getPassword(), "HU58YZ3CR9");
        } catch (Exception e) {
            logger.error("Error while encrypting password");
            e.printStackTrace();
        }

        Users u = login_repository.checkUser(username, password);

        if (u != null && username.equals(u.getUsername()) && password.equals(u.getPassword())) {
            String jwtToken = generateJwtToken(username);

            LoginResponse response = new LoginResponse();
            response.setMessage("Logged in successfully...");
            response.setAuthToken(jwtToken);
            response.setSuccess("true");

            session.setAttribute("username", username);

            login_repository.save(u);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            LoginResponse response = new LoginResponse();
            response.setMessage("Logged in Failed...");
            response.setSuccess("false");

            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
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

	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request) {
		
		logger.info("Inside logout");
		
		HttpSession session = request.getSession(false);
		
		if (session != null) {
		
			session.invalidate();
			
			logger.info("Logout successful");
			
			return ResponseEntity.ok("Logout successful");
		
		} else {
		
			return ResponseEntity.badRequest().body("No active session found");
		
		}
	}
	
}

