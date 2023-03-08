package com.food.ordering.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.CustomerDao;
import com.food.ordering.dao.FooditemDao;
import com.food.ordering.model.FoodItem;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class AddFoodItemHelper {

	public static void addFooditem(HttpServletRequest req, HttpServletResponse res) 
	{
		
		try {
			String collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			JSONObject json = new JSONObject(collect);
			FoodItem fooditem = new FoodItem(json);
			int result = FooditemDao.insert(fooditem);
			PrintWriter out = res.getWriter();
	        res.setContentType("application/json");
	        res.setCharacterEncoding("UTF-8");
	        out.print(result);
	        out.flush(); 
			
			
		} catch (IOException | JSONException | SQLException e) {
			e.printStackTrace();
		}
		
	}

}
