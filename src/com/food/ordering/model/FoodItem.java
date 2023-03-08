package com.food.ordering.model;

import java.lang.reflect.Field;
import java.util.Arrays;

import org.json.JSONException;
import org.json.JSONObject;

public class FoodItem {
	
	private int fooditem_id;
	private String fooditem_name;
	private String foodCategory_name;
	private String item_desc;
	private float unit_price;
	private int avail_quantity;
	private String fooditem_pic;
	private int max_allowed_quanity;
	
	
	public String getItem_desc() {
		return item_desc;
	}
	public void setItem_desc(String item_desc) {
		this.item_desc = item_desc;
	}
	public int getFooditem_id() {
		return fooditem_id;
	}
	public void setFooditem_id(int fooditem_id) {
		this.fooditem_id = fooditem_id;
	}
	public String getFooditem_name() {
		return fooditem_name;
	}
	public void setFooditem_name(String fooditem_name) {
		this.fooditem_name = fooditem_name;
	}
	public float getUnit_price() {
		return unit_price;
	}
	public void setUnit_price(float unit_price) {
		this.unit_price = unit_price;
	}
	public int getMax_allowed_quantity() {
		return max_allowed_quanity;
	}
	public void setMax_allowed_quantity(int max_allowed_quantity) {
		this.max_allowed_quanity = max_allowed_quantity;
	}
	public String getFooditem_pics() {
		return fooditem_pic;
	}
	public void setFooditem_pics(String fooditem_pics) {
		this.fooditem_pic = fooditem_pics;
	}
	public int getAvail_quantity() {
		return avail_quantity;
	}
	public void setAvail_quantity(int avail_quanity) {
		this.avail_quantity = avail_quanity;
	}
	public static String[] returnDetails()
	{
		return Arrays.stream(FoodItem.class.getDeclaredFields()).map(Field::getName).toArray(String[]::new);
		
	}
	public Object[] getDetails()
	{
		Object[] details = {this.getFooditem_name(),this.getFoodCategory_name(),this.getItem_desc(),this.getUnit_price(),this.getAvail_quantity(),this.getFooditem_pics(),this.getMax_allowed_quantity()};
		return details;
	}
	
	public FoodItem(JSONObject json)
	{

			this.setFooditem_name(json.optString("fooditem_name"));
			this.setFoodCategory_name(json.optString("foodcategory_name"));
			this.setUnit_price(json.optLong("unit_price"));
			this.setFooditem_id(json.optInt("fooditem_id"));
			this.setItem_desc(json.optString("item_desc"));
			this.setFooditem_pics(json.optString("fooditem_pic"));
			this.setMax_allowed_quantity(json.optInt("max_allowed_quanity"));
			this.setAvail_quantity(json.optInt("avail_quantity"));
				
	}
	public FoodItem()
	{
		
	}
	public String getFoodCategory_name() {
		return this.foodCategory_name;
	}
	public void setFoodCategory_name(String foodCategory_name) {
		this.foodCategory_name = foodCategory_name;
	}
}
