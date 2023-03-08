package com.food.ordering.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import com.food.ordering.model.*;


public class CustomerDao {
	
	public static Connection toconnect()
	{
		String url = "jdbc:postgresql://localhost:5432/foodordering";
		Connection conn = null;
		
		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(url,"postgres", "123");
		    } 
		catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		    }
		return conn;
		
	}
	
	public static int insert(Customer customer) throws SQLException
	{
	   Connection connection = CustomerDao.toconnect();
	   String INSERT_QUERY;
		int result =0;
		try {
			INSERT_QUERY= QueryGenerator.insertQuery(Customer.returnDetails(), "customer","");
			System.out.println(INSERT_QUERY);
					PreparedStatement preparedstat = connection.prepareStatement(INSERT_QUERY);
					for(int i=1;i<9;i++) {
					preparedstat.setObject(i,customer.getDetails()[i-1]);
					}
					result = preparedstat.executeUpdate();
					System.out.println(result);
			
		}
		catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return result;
	}
	
	
	
	
	public static int update(Customer customer)throws SQLException
	{
		Connection connection =toconnect();
		String UPDATE_QUERY;
		int result =0;
		try
		{
			UPDATE_QUERY = QueryGenerator.updateQuery(Customer.returnDetails(),"customer","CUSTOMER_ID = ");
			PreparedStatement preparedstat = connection.prepareStatement(UPDATE_QUERY);
			System.out.println(UPDATE_QUERY);
			for(int i=1;i<9;i++) {
				preparedstat.setObject(i,customer.getDetails()[i-1]);
				}
			preparedstat.setObject(9,customer.getCustomer_id());
			result = preparedstat.executeUpdate();
			System.out.println(result);
		}
		catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return result;
	}
	
	
	
	public static  int delete(Customer customer)throws SQLException
	{
		Connection connection =toconnect();
		String DELETE_QUERY;
		int result =0;
		try
		{
			DELETE_QUERY = QueryGenerator.deleteQuery("customer","customer_id=?");
			System.out.println(DELETE_QUERY);
			PreparedStatement preparedstat = connection.prepareStatement(DELETE_QUERY);
			preparedstat.setObject(1,customer.getCustomer_id());
			result = preparedstat.executeUpdate();
			System.out.println(result);
			
		}
		catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		System.out.println(result);
		return result;
	}
	
	public static JSONArray select(Customer customer) throws SQLException
	{
		Connection connection =toconnect();
		String SELECT_QUERY;
		try
		{
			PreparedStatement preparedstat;
			if(customer.getEmail_id()!= null) {
			SELECT_QUERY = QueryGenerator.selectQuery("customer", " * "," where email_id =? and passwrd=? ");
			preparedstat = connection.prepareStatement(SELECT_QUERY);
			preparedstat.setString(1, customer.getEmail_id());
			preparedstat.setString(2, customer.getPasswrd());
			}
			else {
				SELECT_QUERY = QueryGenerator.selectQuery("customer", " * ","");
				preparedstat = connection.prepareStatement(SELECT_QUERY);	
			}
			
			ResultSet rs =preparedstat.executeQuery(); 
			JSONArray jsonArray = new JSONArray();
			while (rs.next()) {

				int columns = rs.getMetaData().getColumnCount();
				JSONObject obj = new JSONObject();

				for (int i = 0; i < columns; i++)
					obj.put(rs.getMetaData().getColumnLabel(i + 1).toLowerCase(), rs.getObject(i + 1));
				jsonArray.put(obj);
			}
			return jsonArray;
		}
		catch (SQLException | JSONException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return null;
		
		
		
	}
	

}
