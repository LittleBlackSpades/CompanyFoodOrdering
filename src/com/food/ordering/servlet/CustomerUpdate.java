package com.food.ordering.servlet;

import java.io.IOException;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.CustomerDao;
import com.food.ordering.model.Customer;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomerUpdate {
	public static void profileUpdate(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{
		
		try {
			String collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			JSONObject json = new JSONObject(collect);
			Customer employee = new Customer(json);
			int result = CustomerDao.update(employee);
			if(result==1)
			{
				req.setAttribute("Notification", "SUCCESSFULLY UPDATED !!");
			}
		   }
		  catch(Exception e)
		  {
			req.setAttribute("Notification", "PLS TRY AGAIN !!");
			e.printStackTrace();
		  }
		RequestDispatcher dispatcher = req.getRequestDispatcher("Home.jsp");
		dispatcher.forward(req, res);
		
	}

}
