package com.food.ordering.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.CustomerDao;
import com.food.ordering.model.*;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SignUpHelper {

	public static void registerAction(HttpServletRequest req, HttpServletResponse res) {

		
		try {
			String collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			JSONObject json = new JSONObject(collect);
			Customer employee = new Customer(json);

			int result = CustomerDao.insert(employee);
			PrintWriter out = res.getWriter();
	        res.setContentType("application/json");
	        res.setCharacterEncoding("UTF-8");
	        out.print(result);
	        out.flush(); 
			
		} 
		catch (IOException | SQLException | JSONException e) 
		{
			e.printStackTrace();
		}

		}

	}

