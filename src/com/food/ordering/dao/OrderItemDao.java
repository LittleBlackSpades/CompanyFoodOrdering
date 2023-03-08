package com.food.ordering.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.food.ordering.model.*;


public class OrderItemDao
{
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
	
	
	public static int insert(OrderItem orderitem) throws SQLException
	{
		Connection connection =toconnect();
		String INSERT_QUERY;
		int result =0;
		try {
			INSERT_QUERY= QueryGenerator.insertQuery(OrderItem.returnDetails(), "orderitem","");
					PreparedStatement preparedstat = connection.prepareStatement(INSERT_QUERY);
					for(int i=1;i<4;i++) {
					preparedstat.setObject(i,orderitem.getDetails()[i-1]);
					}
					result = preparedstat.executeUpdate();
			
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
	
	
	public static int update(OrderItem orderitem)throws SQLException
	{
		Connection connection =toconnect();
		String UPDATE_QUERY;
		int result =0;
		try
		{
			UPDATE_QUERY = QueryGenerator.updateQuery(OrderItem.returnDetails(),"orderitem","ORDER_ID = ");
			PreparedStatement preparedstat = connection.prepareStatement(UPDATE_QUERY);
			for(int i=1;i<3;i++) {
				preparedstat.setObject(i,orderitem.getDetails()[i]);
				}
			preparedstat.setObject(8,orderitem.getOrder_id());
			result = preparedstat.executeUpdate();
			
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
	
	
	
	public static  int delete(OrderItem orderitem)throws SQLException
	{
		Connection connection =toconnect();
		String DELETE_QUERY;
		int result =0;
		try
		{
			DELETE_QUERY = QueryGenerator.deleteQuery("orderitem","order_id= ? and fooditem_id =?");
			PreparedStatement preparedstat = connection.prepareStatement(DELETE_QUERY);
			preparedstat.setObject(1,orderitem.getOrder_id());
			preparedstat.setObject(2, orderitem.getFooditem_id());
			result = preparedstat.executeUpdate();
			
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
	
	public static JSONArray select(OrderItem orderitem) throws SQLException, JSONException
	{
		Connection connection =toconnect();
		String SELECT_QUERY;
	
		try
		{
			SELECT_QUERY = QueryGenerator.selectQuery("orderitem", "*"," where order_id = ? ");
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
			preparedstat.setObject(1, orderitem.getOrder_id());
			
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
		catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return null;
		
}
//	public static void main(String[] args) throws JSONException
//	{
//		OrderItem o = new OrderItem();
//		o.setFooditem_id(3);
//		o.setItem_quantity(1);
//		o.setOrder_id(2);
//		try {
//			insert(o);
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
	
	
}
