package com.qcModel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.qcModel")
public class QCModelApplication {

	public static void main(String[] args) {
		SpringApplication.run(QCModelApplication.class, args);
		System.out.println("running");
	}

}

