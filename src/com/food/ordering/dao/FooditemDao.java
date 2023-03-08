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

public class FooditemDao {

	public static Connection toconnect() {
		String url = "jdbc:postgresql://localhost:5432/foodordering";
		Connection conn = null;

		try {
			Class.forName("org.postgresql.Driver");
			conn = DriverManager.getConnection(url, "postgres", "123");
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		}
		return conn;

	}

	public static int insert(FoodItem fooditem) throws SQLException {
		Connection connection = toconnect();
		String INSERT_QUERY;
		int result = 0;
		try {
			INSERT_QUERY = QueryGenerator.insertQuery(FoodItem.returnDetails(), "fooditem","");
			PreparedStatement preparedstat = connection.prepareStatement(INSERT_QUERY);
			for (int i = 1; i < 8; i++) {
				preparedstat.setObject(i, fooditem.getDetails()[i - 1]);
			}
			result = preparedstat.executeUpdate();

		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return result;
	}

	public static int update(FoodItem fooditem) throws SQLException {
		Connection connection = toconnect();
		String UPDATE_QUERY;
		int result = 0;
		try {
			UPDATE_QUERY = QueryGenerator.updateQuery(FoodItem.returnDetails(), "fooditem", "FOODITEM_ID =  ");
			PreparedStatement preparedstat = connection.prepareStatement(UPDATE_QUERY);
			for (int i = 1; i <8; i++) {
				preparedstat.setObject(i, fooditem.getDetails()[i-1]);
			}
			preparedstat.setObject(8, fooditem.getFooditem_id());
			result = preparedstat.executeUpdate();
			System.out.println();
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return result;
	}

	public static int delete(FoodItem fooditem) throws SQLException {
		Connection connection = toconnect();
		String DELETE_QUERY;
		int result = 0;
		try {
			PreparedStatement preparedstat;
			if(fooditem.getFoodCategory_name()== null) {
			DELETE_QUERY = QueryGenerator.deleteQuery("fooditem", "fooditem_id= ?");
			preparedstat = connection.prepareStatement(DELETE_QUERY);
			preparedstat.setObject(1, fooditem.getFooditem_id());
			}
			else {
				DELETE_QUERY = QueryGenerator.deleteQuery("fooditem", "foodcategory_name= ?");
				preparedstat = connection.prepareStatement(DELETE_QUERY);
				preparedstat.setObject(1, fooditem.getFoodCategory_name());
			}
			
			result = preparedstat.executeUpdate();
			System.out.println();                

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return result;
	}

	public static JSONArray select(FoodItem fooditem) throws SQLException, JSONException {
		Connection connection = toconnect();
		String SELECT_QUERY;

		try {
			if(fooditem.getFoodCategory_name() == null)
				{
				SELECT_QUERY = QueryGenerator.selectQuery("fooditem ", " * ", "");
				}
			else {
				SELECT_QUERY = QueryGenerator.selectQuery("fooditem ", " DISTINCT foodcategory_name ", "");
			}
			
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
			ResultSet rs = preparedstat.executeQuery();
			//boolean result = rs.next();
			JSONArray jsonArray = new JSONArray();
			while (rs.next()) {

				int columns = rs.getMetaData().getColumnCount();
				JSONObject obj = new JSONObject();

				for (int i = 0; i < columns; i++)
					obj.put(rs.getMetaData().getColumnLabel(i + 1).toLowerCase(), rs.getObject(i + 1));
				jsonArray.put(obj);
			}
			return jsonArray;

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return null;

	}
	public static JSONArray selectCategory(FoodItem fooditem) throws SQLException, JSONException {
		Connection connection = toconnect();
		String SELECT_QUERY;

		try {
			SELECT_QUERY = QueryGenerator.selectQuery("fooditem ", " * ", " where foodcategory_name =?");
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
			preparedstat.setObject(1, fooditem.getFoodCategory_name());
			ResultSet rs = preparedstat.executeQuery();
			JSONArray jsonArray = new JSONArray();
			while (rs.next()) {

				int columns = rs.getMetaData().getColumnCount();
				JSONObject obj = new JSONObject();

				for (int i = 0; i < columns; i++)
					obj.put(rs.getMetaData().getColumnLabel(i + 1).toLowerCase(), rs.getObject(i + 1));
				jsonArray.put(obj);
			}
			return jsonArray;

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return null;
	}
	public static JSONObject selectFoodByID(FoodItem fooditem) throws SQLException, JSONException {
		Connection connection = toconnect();
		String SELECT_QUERY;

		try {
			SELECT_QUERY = QueryGenerator.selectQuery("fooditem ", " * ", " where fooditem_id =?");
			PreparedStatement preparedstat = connection.prepareStatement(SELECT_QUERY);
			preparedstat.setObject(1, fooditem.getFooditem_id());
			ResultSet rs = preparedstat.executeQuery();
			JSONObject obj = new JSONObject();
			while (rs.next()) {

				int columns = rs.getMetaData().getColumnCount();
				

				for (int i = 0; i < columns; i++)
					obj.put(rs.getMetaData().getColumnLabel(i + 1).toLowerCase(), rs.getObject(i + 1));
			
			}
			return obj;

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
			System.exit(0);
		} finally {
			connection.close();
		}
		return null;
	}
	
	
	
	
}
