package com.food.ordering.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.model.Order;
import com.food.ordering.model.OrderItem;

public class OrderDao {

	public static  Connection toconnect()
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
	
	
	public static int insert(Order order) throws SQLException
	{
		Connection connection =toconnect();
		String INSERT_QUERY;
		int result =0;
		try {
			INSERT_QUERY= QueryGenerator.insertQuery(Order.returnDetails(), "orders","Returning order_id");
					PreparedStatement preparedstat = connection.prepareStatement(INSERT_QUERY);
					for(int i=1;i<3;i++) {
					preparedstat.setObject(i,order.getDetails()[i-1]);
					}
					preparedstat.execute();
					ResultSet rs = preparedstat.getResultSet();
					rs.next();
					int key = rs.getInt(1);
					return key;
			
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
	
	
	
	
	public static int update(Order order)throws SQLException
	{
		Connection connection =toconnect();
		String UPDATE_QUERY;
		int result =0;
		try
		{
			UPDATE_QUERY = QueryGenerator.updateQuery(Order.returnDetails(),"orders","ORDER_ID = ");
			PreparedStatement preparedstat = connection.prepareStatement(UPDATE_QUERY);
			for(int i=1;i<3;i++) {
				preparedstat.setObject(i,order.getDetails()[i-1]);
				}
			preparedstat.setObject(3,order.getOrder_id());
//			long epochTime = java.lang.System.currentTimeMillis();
//	        stmt.setObject(5, new java.sql.Date(epochTime));
//			
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
	
	
	
	public static int delete(Order order)throws SQLException
	{
		Connection connection =toconnect();
		String DELETE_QUERY;
		int result =0;
		try
		{
			DELETE_QUERY = QueryGenerator.deleteQuery("orders","order_id=? ");
			PreparedStatement preparedstat = connection.prepareStatement(DELETE_QUERY);
			preparedstat.setObject(1,order.getOrder_id());
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
	
	public static JSONArray select(Order order) throws SQLException, JSONException
	{
		Connection connection =toconnect();
		String SELECT_QUERY;
	
		try
		{
			SELECT_QUERY = QueryGenerator.selectQuery("orders", "*"," where order_id = ?");
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
			preparedstat.setObject(1,order.getOrder_id());
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
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return null;
	
	
		
}
	public static JSONArray join() throws SQLException, JSONException
	{
		Connection connection =toconnect();
		String SELECT_QUERY;
	
		try
		{
			SELECT_QUERY = QueryGenerator.joinQuery("f.fooditem_name,f.foodcategory_name,o.order_id,o.amount,o.customer_id,o.created_time,i.item_quantity from orders o inner join orderitem i using(order_id) inner join fooditem f using(fooditem_id)");
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
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
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
	        System.exit(0);
		}
		finally {
		connection.close();
		}
		return null;
	
	
		
}
	public static void main(String[] args)
	{
		Order o = new Order();
		o.setAmount(56);
		o.setCustomer_id(10);
	
		try {
			System.out.println(insert(o));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
