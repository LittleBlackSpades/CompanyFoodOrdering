package com.food.ordering.servlet;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.*;
import java.net.HttpCookie;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.*;
import com.food.ordering.model.*;


public class BaseServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	{
		String url = req.getRequestURI().toString();
		String[] urlList =url.split("/");
		int len = urlList.length;
		PrintWriter out = res.getWriter();
		if(urlList[len-1].equals("timelogs"))
		{
			DisplayOrder.viewOrder(req,res);
		    	
		}
		else if(urlList[len-1].equals("foodItems"))
		{
			FoodItem fooditem = new FoodItem();
			JSONArray json;
			try {
				json = FooditemDao.select(fooditem);
		        res.setContentType("application/json");
		        res.setCharacterEncoding("UTF-8");
		        out.print(json);
		        out.flush();
			} catch (SQLException  |JSONException e) {
				e.printStackTrace();
			} 
			 
		}
		else if(urlList[len-2].equals("foodCategories"))
		{
			FoodItem foodCategory = new FoodItem();
			foodCategory.setFoodCategory_name(urlList[len-1]);
			try {
				JSONArray json = FooditemDao.selectCategory(foodCategory);
				res.setContentType("application/json");
		        res.setCharacterEncoding("UTF-8");
		        out.print(json);
		        out.flush();
			} catch (JSONException | SQLException e) {
				e.printStackTrace();
			} 
			
		}
		else if(urlList[len-1].equals("foodCategories"))
		{
			FoodItem foodCategory = new FoodItem();
			foodCategory.setFoodCategory_name("1");
			try {
				JSONArray json = FooditemDao.select(foodCategory);
				res.setContentType("application/json");
		        res.setCharacterEncoding("UTF-8");
		        out.print(json);
		        out.flush();
			} catch (JSONException | SQLException e) {
				e.printStackTrace();
			} 
			
		}
		else if(urlList[len-1].equals("customers"))
		{
			Customer customer = new Customer();
			try {
				JSONArray json = CustomerDao.select(customer);
				res.setContentType("application/json");
		        res.setCharacterEncoding("UTF-8");
		        out.print(json);
		        out.flush();
			} catch ( SQLException e) {
				e.printStackTrace();
			} 
			
		}
		
	}
	
	protected void doPost(HttpServletRequest req,HttpServletResponse res) throws ServletException, IOException
	{
		String url = req.getRequestURI().toString();
		String[] urlList= url.split("/");
		int len = urlList.length;
		if(urlList[len-1].equals("orders"))
		{
		    	PlaceOrderHelper.orderPlace(req, res);
		}
		else if(urlList[len-1].equals("register"))
		{
			SignUpHelper.registerAction(req, res);
			
		}
		else if(urlList[len-1].equals("login"))
		{
			LoginHelper.login(req, res);
		}
		else if(urlList[len-2].equals("foodItem")& urlList[len-1].equals("add"))
		{
			AddFoodItemHelper.addFooditem(req,res);
		}
		

	}
	
	 protected void doPut(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException 
	          {
		 	String url = req.getRequestURI().toString();
			String[] urlList= url.split("/");
			int len = urlList.length;
			PrintWriter out = res.getWriter();
			
			if(urlList[len-2].equals("profile") && urlList[len-1].equals("update"))
			{
				CustomerUpdate.profileUpdate(req, res);
				
			}
			else if (urlList[len-3].equals("foodItems") && urlList[len-1].equals("update"))
			{
				
				int id = Integer.parseInt(urlList[len-2]);
				try {
					String collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
					JSONObject json = new JSONObject(collect);
					FoodItem foodItem = new FoodItem(json);
					foodItem.setFooditem_id(id);
					int result = FooditemDao.update(foodItem);
					res.setContentType("application/json");
			        res.setCharacterEncoding("UTF-8");
			        out.print(result);
			        out.flush(); 
					
				   }
				  catch(Exception e)
				  {
					req.setAttribute("Notification", "PLS TRY AGAIN !!");
					e.printStackTrace();
				  }
				
			}
			
	     }
	 
	 protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	 {
		 String url = req.getRequestURI().toString();
			String[] urlList= url.split("/");
			int len = urlList.length;
			
			
			if(urlList[len-2].equals("foodCategories"))
			{
				String foodcategory_name=urlList[len-1];
				FoodItem foodcategory = new FoodItem();
				foodcategory.setFoodCategory_name(foodcategory_name);
			
					int result;
					try {
						result = FooditemDao.delete(foodcategory);
						PrintWriter out = res.getWriter();
				        res.setContentType("application/json");
				        res.setCharacterEncoding("UTF-8");
				        out.print(result);
				        out.flush(); 
					} catch (SQLException e) {
						e.printStackTrace();
					}
					
			    	
			}
			
			
			else if(urlList[len-2].equals("foodItem"))
			{
				//req.setAttribute("id", urlList[len-1]);
				int fooditem_id = Integer.parseInt(urlList[len-1]);
				FoodItem fooditem = new FoodItem();
				fooditem.setFooditem_id(fooditem_id);
				try {
					int result = FooditemDao.delete(fooditem);
					PrintWriter out = res.getWriter();
			        res.setContentType("application/json");
			        res.setCharacterEncoding("UTF-8");
			        out.print(result);
			        out.flush(); 
					
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				 
				
			}
			
	 }
	 
	
	

}
