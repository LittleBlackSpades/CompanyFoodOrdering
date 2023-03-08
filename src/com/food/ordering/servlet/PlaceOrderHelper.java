package com.food.ordering.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.food.ordering.dao.FooditemDao;
import com.food.ordering.dao.OrderDao;
import com.food.ordering.dao.OrderItemDao;
import com.food.ordering.model.FoodItem;
import com.food.ordering.model.Order;
import com.food.ordering.model.OrderItem;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class PlaceOrderHelper {
	
	public static void orderPlace(HttpServletRequest req, HttpServletResponse res)
	{
		String collect;
		try {
			collect = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			JSONArray jsonArray = new JSONArray(collect);
			JSONObject store ;
			JSONObject json = jsonArray.getJSONObject(0);
			Order order = new Order(json);
			int orderRes = OrderDao.insert(order);
			int itemRes=0;
			for(int i=0; i<jsonArray.length(); i++) {
			    json = jsonArray.getJSONObject(i);
			    OrderItem orderitem = new  OrderItem(json);
			    int item_quantity = orderitem.getItem_quantity();
			    FoodItem fooditem = new FoodItem(json);
			    store = FooditemDao.selectFoodByID(fooditem);
			    int availQuantity = (store.optInt("avail_quantity"));
			    
			    if(availQuantity-item_quantity>=0) {
			    store.put("avail_quantity", availQuantity-item_quantity);
			    FoodItem foodU = new FoodItem(store);
			    int foodUpdate = FooditemDao.update(foodU);
				orderitem.setOrder_id(orderRes);
				itemRes = OrderItemDao.insert(orderitem);
			    }
			    else {
			    	PrintWriter out = res.getWriter();
			        res.setContentType("application/json");
			        res.setCharacterEncoding("UTF-8");
			        out.print("order cannot be placed");
			    }
			    //String jsonObjectAsString = jsonObject.toString();
			}
		
			if(orderRes>1 && itemRes ==1)
			{
				PrintWriter out = res.getWriter();
		        res.setContentType("application/json");
		        res.setCharacterEncoding("UTF-8");
		        out.print(orderRes);
		        out.flush(); 
			}
				
		} catch (IOException | JSONException | SQLException e) {
			e.printStackTrace();
		}
		
		
		
	}
}
