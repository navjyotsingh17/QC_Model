package com.ldap.auth.config;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;

import org.springframework.context.annotation.PropertySource;

import com.ldap.auth.propertyReader.PropertyReader;

@PropertySource("classpath:application.properties")
public class LdapAuthentication {	
	
public static boolean authUser(String username, String password) {
	
		
		try {
			Properties env = new Properties();
			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, PropertyReader.getResourceBundle().getString("LDAP_URL"));
			env.put(Context.SECURITY_PRINCIPAL, "cn="+username+",ou=users,ou=system");
			env.put(Context.SECURITY_CREDENTIALS, password);
			DirContext connection = new InitialDirContext(env);
			connection.close();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return false;
		}
}
}
