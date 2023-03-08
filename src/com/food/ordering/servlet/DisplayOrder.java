package com.food.ordering.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.OrderDao;
import com.food.ordering.model.Order;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class DisplayOrder {

	public static void viewOrder(HttpServletRequest req, HttpServletResponse res) {
		JSONArray json;
		PrintWriter out;
		try {
//			String collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
//			JSONObject jsonobj = new JSONObject(collect);
	
			out = res.getWriter();
			json = OrderDao.join();
	        res.setContentType("application/json");
	        res.setCharacterEncoding("UTF-8");
	        out.print(json);
	        out.flush();
		} catch (SQLException  |JSONException |IOException e) {
			e.printStackTrace();
		} 
		 
		
	}

}
