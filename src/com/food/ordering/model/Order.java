package com.food.ordering.model;

import java.lang.reflect.Field;
import java.util.Arrays;

import org.json.JSONException;
import org.json.JSONObject;

public class Order {

	private int order_id;
	private float amount;
	private int customer_id;
	private long created_time;
	private long modified_time;
	
	
	public int getOrder_id() {
		return order_id;
	}
	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}
	
	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public static String[] returnDetails()
	{
		String[] colms = Arrays.stream(Order.class.getDeclaredFields()).map(Field::getName).toArray(String[]::new);
		return Arrays.copyOfRange(colms, 0, 3);
	}
	public Object[] getDetails()
	{
		Object[] details = {this.getAmount(),this.getCustomer_id(),this.getCreated_time()};
		return details;
	}
	public long getCreated_time() {
		return created_time;
	}
	public void setCreated_time(long created_time) {
		this.created_time = created_time;
	}
	public long getModified_time() {
		return modified_time;
	}
	public void setModified_time(long modified_time) {
		this.modified_time = modified_time;
	}
	
	
	public Order() {}
	
	public Order(JSONObject json)
	{
		try {
			this.setCustomer_id(json.getInt("customer_id"));
			this.setAmount(json.getLong("amount"));
			this.setOrder_id(json.getInt("order_id"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	
}
