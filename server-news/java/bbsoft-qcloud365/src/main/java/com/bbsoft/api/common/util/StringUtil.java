package com.bbsoft.api.common.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.json.JSONArray;

import com.bbsoft.api.common.MsgeData;

/**
 * 字符串工具类
 * ClassName: StringUtil 
 * @Description: 字符串工具类
 */

public class StringUtil {
	public static final String ZERO = "0";
	public static final String spot = ".";
	public static final String RESULT = "result";

	
	/**
	 * 新增操作
	 */
	public static final String ADD= "ADD";
	
	/**
	 * 删除操作
	 */
	public static final String DELETE= "DELETE";
	
	/**
	 * 修改操作
	 */
	public static final String UPDATE= "UPDATE";

	/**
	 * 删除状态
	 */
	public static final String STATUS_DELETE= "DELETE";
	
	/**
	 * 使用状态
	 */
	public static final String STATUS_ACTIVE= "ACTIVE";
	
	/**
	 * 判断一个字符是否是中文
	 * @Description: 
	 * @param: @param c 需要校验的字节码
	 * @param: @return   
	 * @return: boolean  
	 * @throws
	 */
	public static boolean isChinese(char c) {
	      return c >= 0x4E00 &&  c <= 0x9FA5;// 根据字节码判断
	}
	/**
	 * 判断一个字符串是否含有中文
	 * @Description: 
	 * @param: @param str 需要校验的字符串
	 * @param: @return   
	 * @return: boolean  
	 * @throws
	 */
	public static boolean isChinese(String str) {
	    if (str == null) return false;
	    for (char c : str.toCharArray()) {
	        if (isChinese(c)) return true;// 有一个中文字符就返回
	    }
	    return false;
	}
	
	/**
	 * 校验格式是否为邮箱
	 * @param str 
	 * @return
	 */
	public static boolean checkMail(String str){
		if(str != null && str.indexOf(".")>0 && str.indexOf("@") > 0 && str.length() - str.indexOf(".") > 1 && str.indexOf(".")-str.indexOf("@")>1){
			return true;
		}
		return false;
	}
	/**
	 * 校验格式是否为手机号
	 * @param str
	 * @return
	 */
	public static boolean checkPhone(String str){
		if(str != null && str.length() == 11){
			Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9])|(14[7])|(17[7]))\\d{8}$");
			Matcher m = p.matcher(str);
			return m.matches();
		}
		return false;
	}
	
	/**
	 * 是否为空
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		if(str == null || "".equals(str)){
			return true;
		}
		return false;
	}
	/**
	 * 是否不为空
	 * @param str
	 * @return true：不为空  false：为空
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}
	/**
	 * 是否位数字
	 * @param str
	 * @return
	 */
	public static boolean isInteger(String str) {
		if(str != null){
			Pattern p = Pattern.compile("^\\d+$");
			Matcher m = p.matcher(str);
			return m.matches();
		}
		return false;
	}
	/**
	 * 高级字符串替换
	 * @param str
	 * @param map
	 * @return
	 */
	public static String replace(String str, Map<Object, Object> map){
		for (Object key:map.keySet()) {
			str = str.replace(key.toString(), map.get(key).toString());
		}
		return str;
	}
	
	/**
	 * 将字符串转字符串数组
	 * @param str 需要转换的字符串
	 * @param splitChar 分割符
	 * @return
	 */
	public static String[] strConvertArray(String str, String splitChar){
		if(!StringUtil.isEmpty(str)){
			if(!isEmpty(splitChar) && str.indexOf(splitChar) != -1){
				return str.split(splitChar);
			}else{
				return new String[]{str};
			}
		}
		return new String[]{};
	}
	
	/**
	 * 将String转换成list<Integer>
	 * @param str 字符串
	 * @param splitChar 分隔符
	 * @return
	 */
	public static List<Integer> strConvertList(String str, String splitChar) {
		String strNub[] = strConvertArray(str, splitChar);
		List<Integer> listIds = new ArrayList<Integer>();
		if(strNub != null && strNub.length > 0){
			for (int i = 0; i < strNub.length; i++) {
				listIds.add(Integer.valueOf(strNub[i].trim()));
			}
		}
		return listIds;
	}
	
	/**
	 * 将String转换成list<long>
	 * @param str 字符串
	 * @param splitChar 分隔符
	 * @return 
	 */
	public static List<Long> strCntList(String str,String splitChar){
		String strNub[]=strConvertArray(str, splitChar);
		List<Long> listIds=new ArrayList<Long>();
		if(strNub != null && strNub.length > 0){
			for(int i=0;i<strNub.length;i++){
	           listIds.add(Long.valueOf(strNub[i].trim()));		
			}
		}
		return listIds; 
	}
	
	/**
	 * 将字符串转成list集合
	 * @param str 需要转换的字符串
	 * @param object 需要转换的list集合类型
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes", "deprecation" })
	public static List<Object> StrConvertList(String str, Class clazz){
		if(str != null){
			JSONArray jsonArray = JSONArray.fromObject(str);
			List<Object> list =  JSONArray.toList(jsonArray, clazz);
			return list;
		}
		return new ArrayList<Object>();
	}	
	
	/**
	 * 字符串按指定长度截取并替换
	 * @Description: 字符串按指定长度截取并替换
	 * @param str 原字符串
	 * @param length 截取长度
	 * @param param 被截取部分替换的字符串
	 * @return   
	 * @return String  
	 * @throws
	 */
	public static String strSplitReplace(String str,Integer length,String param){
		if (isEmpty(str) || length == null || length > str.length()) return str;
		
		str = str.substring(0,length);
		if (isNotEmpty(param)) {
			str = str + param;
		}
		
		return str;
	}
	
	public static String covertFullImg(String url){
		if(StringUtil.isEmpty(url)) 
			return "";
		if(url.indexOf("http://") != -1 || url.indexOf("https://") != -1){
			return url;
		}
		return MsgeData.ATTACHMENT_URL.getMsg() + url;
	}
	
	/**
	 * 
	 * @Description:  生成Token
	 * @param: @return   
	 * @return: String  
	 * @throws
	 * @author: VULCAN
	 * @date: 2016-12-30
	 */
	public static String getToken() {
		String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(30);
		for (int i = 0; i < 30; i++)
			sb.append(AB.charAt(rnd.nextInt(AB.length())));
		return sb.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(getToken());
	}
	
}
