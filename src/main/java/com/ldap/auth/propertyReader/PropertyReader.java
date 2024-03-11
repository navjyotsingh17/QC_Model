package com.ldap.auth.propertyReader;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Locale;
import java.util.ResourceBundle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class PropertyReader {
	
	private static final Logger logger = LoggerFactory.getLogger(PropertyReader.class);

	private static String path = "C://Users//Lenovo//Desktop//";
	 public static ResourceBundle getResourceBundle() 
	  {
		 ResourceBundle rsbundle = null;
		 FileInputStream fis = null;
		try {
			File file = new File(path);
			URL[] urls = {file.toURI().toURL()};
			ClassLoader loader = new URLClassLoader(urls);
			ResourceBundle rb = ResourceBundle.getBundle("config", Locale.getDefault(), loader);
			return rb;
		} catch (IOException e) {
			logger.error("Property File Not Found "+e.fillInStackTrace());
		}finally{
			
			fis=null;
			
		}
		return rsbundle;
	  }
	
//	public static void main(String[] args) {
//		try {
//			String url = PropertyReader.getResourceBundle().getString("LDAP_URL");
//			System.out.println("String url:- "+url);
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
//	}
	
}
