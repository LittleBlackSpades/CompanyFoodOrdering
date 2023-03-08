package com.food.ordering.model;


//import org.mindrot.jbcrypt.*;
import java.lang.reflect.*;
import java.util.Arrays;
import org.json.*;

public class Customer {
	
	private int customer_id;
	private String firstName;
	private String lastname;
	private String email_id;
	private int age;
	private int role;
	private String designation;
	private String phoneno;
	private String passwrd;
	
	public int getCustomer_id() {
		return customer_id;
	}
	
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}


	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPasswrd() {
		return passwrd;
	}
	public void setPasswrd(String passwrd) {
		this.passwrd=passwrd;
		//this.passwrd = BCrypt.hashpw(passwrd, BCrypt.gensalt());
	}
	
	public static String[] returnDetails()
	{
		return Arrays.stream(Customer.class.getDeclaredFields()).map(Field::getName).toArray(String[]::new);
	}
	
	public Object[] getDetails()
	{
		Customer customer = new Customer();
		Object[] details = {this.getFirstName(),this.getLastname(),this.getEmail_id(),this.getAge(),this.getRole(),this.getDesignation(),this.getPhoneno(),this.passwrd};
		return details;
	}
	public Customer()
	{
	}
	public Customer(JSONObject json)
	{
			this.setEmail_id(json.optString("email_id"));
			this.setPasswrd(json.optString("passwrd"));
			this.setFirstName(json.optString("firstName"));
			this.setLastname(json.optString("lastName"));
			this.setEmail_id(json.optString("email_id"));
			this.setAge(json.optInt("age"));
			this.setDesignation(json.optString("designation"));
			this.setPhoneno(json.optString("phoneno"));
			this.setCustomer_id(json.optInt("customer_id"));
			this.setRole(json.optInt("role"));
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}
	

}
