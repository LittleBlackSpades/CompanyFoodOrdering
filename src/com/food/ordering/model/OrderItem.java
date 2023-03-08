package com.food.ordering.model;

import java.lang.reflect.Field;
import java.util.Arrays;

import org.json.JSONException;
import org.json.JSONObject;

public class OrderItem {
	
	private int orderitem_id;
	private int order_id;
	private int item_quantity;
	private int fooditem_id;
	
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	public int getItem_quantity() {
		return item_quantity;
	}
	public void setItem_quantity(int item_quantity) {
		this.item_quantity = item_quantity;
	}
	public int getFooditem_id() {
		return fooditem_id;
	}
	public void setFooditem_id(int fooditem_id) {
		this.fooditem_id = fooditem_id;
	}
	public static String[] returnDetails()
	{
		return Arrays.stream(OrderItem.class.getDeclaredFields()).map(Field::getName).toArray(String[]::new);
		
	}
	public Object[] getDetails()
	{
		Object[] details = {this.getOrder_id(),this.getItem_quantity(),this.getFooditem_id()};
		return details;
	}
	
	public OrderItem()
	{
		
	}
	public OrderItem(JSONObject json)
	{
		try {
			this.setFooditem_id(json.getInt("fooditem_id"));
			this.setItem_quantity(json.getInt("item_quantity"));
			this.setOrder_id(json.getInt("order_id"));
			this.orderitem_id = json.getInt("orderitem_id");
		}
		catch(JSONException e)
		{
			e.printStackTrace();
		}
	}
	public int getOrderitem_id() {
		return orderitem_id;
	}
	public void setOrderitem_id(int orderitem_id) {
		this.orderitem_id = orderitem_id;
	}

}
