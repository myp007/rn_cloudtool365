package com.bbsoft.api.common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 时间工具类
 * ClassName: DateUtils 
 * @Description: 时间工具类
 * @author: VANCUL
 * @date: 2016年7月13日
 */
public class DateUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);
	
	public static String GLOBAL_DATE_PATTERN="yyyy-MM-dd";
	public static String GLOBAL_TIME_PATTERN="yyyy-MM-dd HH:mm:ss";
	public static String GLOBAL_MINUTES_PATTERN="yyyy-MM-dd HH:mm";
	public static String CN_DATE_PATTERN="yyyy年MM月dd号";
	public static String CN_TIME_PATTERN="yyyy年MM月dd号 HH:mm:ss";
	public static String CN_MDTIME_PATTERN="MM月dd号 HH:mm:ss";
	private static long milliSecond=0;
	
	/**
	 * 字符串转日期
	 * @Description: 字符串转日期
	 * @param: @param str 被格式化字符串
	 * @param: @param pattern 格式化字符,不传入pattern时,本方法采用GLOBAL_TIME_PATTERN格式化
	 * @param: @return   
	 * @return: Date  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static Date formatStringToDate(String str,String...pattern) {
//		logger.debug("formatStringToDate == " + str);
		Date date = null;
		if(str==null||str.trim().equals("")){
			return date;
		}
		if(pattern.length==0){			
			pattern=new String[1];
			pattern[0]=GLOBAL_TIME_PATTERN;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(pattern[0]);
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * 日期转字符串
	 * @Description: 日期转字符串
	 * @param: @param date 被格式化日期
	 * @param: @param pattern 格式化字符,不传入pattern时,本方法采用GLOBAL_TIME_PATTERN格式化
	 * @param: @return   
	 * @return: String  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static String formatDateToString(Date date, String... pattern) {
		try {
			if(date==null){
				return "";
			}
			if(pattern.length==0){			
				pattern=new String[1];
				pattern[0]=GLOBAL_TIME_PATTERN;
			}			
			SimpleDateFormat sdf = new SimpleDateFormat(pattern[0]);
			return sdf.format(date).toString();
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}
	
	/**
	 * 取得现在的日期及时间
	 * @Description: 取得现在的日期及时间
	 * @param: @param formatLayout 格式化 如：yyyy-MM-dd HH:mm:ss
	 * @param: @return   
	 * @return: String  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static  String getCurrentDate(String formatLayout) {
		java.text.SimpleDateFormat sdf;
		if (formatLayout == null || formatLayout.length() <= 0)
			sdf = new java.text.SimpleDateFormat(GLOBAL_TIME_PATTERN);
		else
			sdf = new java.text.SimpleDateFormat(formatLayout);

		return (sdf.format(new java.util.Date()));
	}
	
	/**
	 * 根据传过来的Str和格式,格式化str到Date
	 * @Description: 根据传过来的Str和格式,格式化str到Date
	 * @param: @param str 日期
	 * @param: @param formatLayout 转换格式 如：yyyy-MM-dd HH:mm:ss
	 * @param: @return   
	 * @return: Date  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static Date strToDate(String str,String formatLayout){
		if (str == null || str.trim().length() < 1)
			return null;
		SimpleDateFormat df = new SimpleDateFormat(formatLayout);
		Date date = null;
		try {
			date = df.parse(str);
		} catch (ParseException e) {
			return null;
		}
		return date;
	}
	
	
	/**
	 * 根据转过来的date和时间格式，把date转化为指点格式的字符串
	 * @Description: 根据转过来的date和时间格式，把date转化为指点格式的字符串
	 * @param: @param date 需要转换的时间
	 * @param: @param dateStr 需要转换的时间格式
	 * @param: @return   
	 * @return: String  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static String datetoStr(Date date,String dateStr){
		if(date==null){
			return  null;
		}else{
			return new SimpleDateFormat(dateStr).format(date);
		}
	}
	 /**
	 * 将dateFormat格式的time转成toDateFormat格式的时间，返回
	 * @param time           时间
	 * @param dateFormat     time 格式 yyyy-MM-dd
	 * @param toDateFormat   期望转成的格式 yyyyMMdd
	 * @return
	 */
	
	/**
	 * 将dateFormat格式的time转成toDateFormat格式的时间返回
	 * @Description: 将dateFormat格式的time转成toDateFormat格式的时间返回
	 * @param: @param time 需要转换的时间
	 * @param: @param dateFormat 当前时间格式
	 * @param: @param toDateFormat 需要转换的时间格式
	 * @param: @return   
	 * @return: String  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static String formatStrDate(String time,String dateFormat,String toDateFormat){
		if(null!=time&&!"".equals(time.trim())){
			time = time.trim();
			try {
				SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
				Date date = sdf.parse(time);
				sdf = new SimpleDateFormat(toDateFormat);
				time = sdf.format(date);
			} catch (Exception e) {
				if(time.length()>10){
					time=time.substring(0,10);
				}
			}
		}else{
			time = "";
		}
		return time;
			
	}
	
	/**
	 * 获取当前时间
	 * @Description: 获取当前时间
	 * @param: @return   
	 * @return: Date  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
	public static Date getCurrentDate(){
		return new Date(System.currentTimeMillis());
	}
	
	/**
	 * 将时间置为23时59分钟59秒  
	 * @Description: 将时间置为23时59分钟59秒 
	 * @param: @param date 需要设置的时间
	 * @param: @return   
	 * @return: Date  
	 * @throws
	 * @author: VANCUL
	 * @date: 2016年7月13日
	 */
    public static Date setFullPassDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.HOUR_OF_DAY, 23);  
        calendar.set(Calendar.MINUTE, 59);  
        calendar.set(Calendar.SECOND, 59);  
        return calendar.getTime();  
    }  
	
    /**
     * 将时间后退2小时
     * @Description: 将时间后退2小时
     * @param: @param date 需要设置的时间
     * @param: @return   
     * @return: Date  
     * @throws
     * @author: VANCUL
     * @date: 2016年7月13日
     */
    public static Date getFallBack2Hour(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY) - 2);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
	
    
    /**
     * 将时间精确到小时
     * @Description: 将时间精确到小时
     * @param: @param date 需要设置的时间
     * @param: @return   
     * @return: Date  
     * @throws
     * @author: VANCUL
     * @date: 2016年7月13日
     */
    public static Date getTimeHour(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
    
    /** 
     * 获取两个时间间隔的天数 
     * @param date 
     * @return 
     */  
    public static long getDiffDays(Date startDate, Date endDate) {  
        long difftime = endDate.getTime() - startDate.getTime();  
        return difftime / (24L * 60L * 60L * 1000L);  
    }  
    
    /** 
     * 对比时间的大小(结束时间是否大于等于开始时间)
     * @param date 
     * @return 
     */  
    public static Boolean compareTime(Date startDate, Date endDate) {  
    	Boolean  result=false;
    	if(endDate.getTime()>=startDate.getTime()){
    		result=true;
    	}
    	return result;  
    }  
      
  
    /** 
     * 根据日期获取当天起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfCurrentDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    public static Date getStartYesterday(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, -1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期获取下一天起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一周后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextSevenDay(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, 7);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一周后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfMonth(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /** 
     * 根据日期当前日期顺延一月后的起始时间 
     *  
     *  
     * @param date 
     * @return 
     */  
    public static Date getStartDateOfNextMonth(Date date) {  
        Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);  
        calendar.add(Calendar.MONTH, 1);  
        calendar.set(Calendar.DAY_OF_MONTH, 1);  
        calendar.set(Calendar.HOUR_OF_DAY, 0);  
        calendar.set(Calendar.MINUTE, 0);  
        calendar.set(Calendar.SECOND, 0);  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }  
  
    /**
     * 获取一天的时间区域
     * 例如：2015-09-08 02:00:00， 2015-09-08 04:00:00， 2015-09-08 06:00:00  
     * @param date 当前时间
     * @return
     */
    public static List<Date> getStaticByDateDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfCurrentDay(date);  
        Date nextday = getStartDateOfNextDay(date);  
        int step = 2;  
        dates.add(startdate);  
        for (int i = 1; i < 12; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.HOUR_OF_DAY, i * step);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
  
   /**
    * 获取一周的时间区域
    * @param date 当前时间
    * 例如：2015-09-08 00:00:00， 2015-09-09 00:00:00， 2015-09-10 00:00:00
    * @return
    */
    public static List<Date> getStaticByWeekDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfCurrentDay(date);  
        Date nextday = getStartDateOfNextSevenDay(date);  
        dates.add(startdate);  
        for (int i = 1; i < 7; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
  
    /**
     * 获取一周之内时间区域List<String> 
     * @param date
     * 例如：[09-08, 09-09, 09-10, 09-11, 09-12, 09-13, 09-14]
     * @return
     */
    public static List<String> getStaticByWeekLabel(Date date) {  
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd");  
        List<String> dates = new ArrayList<String>();  
        Date startdate = getStartDateOfCurrentDay(date);  
//        Date nextday = getStartDateOfNextSevenDay(date);  
        dates.add(dateFormat.format(startdate));  
        for (int i = 1; i < 7; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(dateFormat.format(calendar.getTime()));  
        }  
        return dates;  
    }  
  
    /**
     * 获取指定时间月之内的时间区域
     * @param date 当前时间
     * @return
     */
    public static List<Date> getStaticByMonthDateArea(Date date) {  
        List<Date> dates = new ArrayList<Date>();  
        Date startdate = getStartDateOfMonth(date);  
        Date nextday = getStartDateOfNextMonth(date);  
        long daydiff = getDiffDays(startdate, nextday);  
        dates.add(startdate);  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(nextday);  
        return dates;  
    }  
      
    /**
     * 获取两个时间的时间区域（整天计算）
     * @param startDate 开始时间
     * @param endDate 结束时间
     * @return
     */
    public static List<Date> getStaticBySE(Date startDate,Date endDate)  
    {  
        List<Date> dates = new ArrayList<Date>();  
          
        long daydiff = getDiffDays(startDate, endDate);  
        dates.add(startDate);  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startDate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(calendar.getTime());  
        }  
        dates.add(endDate);  
        return dates;  
    }  
  
    /**
     * 获取指定时间的日区间
     * @param date 当前时间
     * 例如：[01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] 
     * @return
     */
    public static List<String> getStaticByMonthLabel(Date date) {  
        DateFormat dateFormat = new SimpleDateFormat("dd");  
        List<String> dates = new ArrayList<String>();  
        Date startdate = getStartDateOfMonth(date);  
        Date nextday = getStartDateOfNextMonth(date);  
        long daydiff = getDiffDays(startdate, nextday);  
        dates.add(dateFormat.format(startdate));  
        for (int i = 1; i < daydiff; i++) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(startdate);  
            calendar.add(Calendar.DAY_OF_MONTH, i);  
            dates.add(dateFormat.format(calendar.getTime()));  
        }  
        return dates;  
    }  
    
    /**
     * 格式化日期
     * @param format 格式
     * @param date 需要格式化的日期
     * @return
     */
    public static String formatDate(String format, Date date) {  
        DateFormat dateFormat = new SimpleDateFormat(format);  
        return dateFormat.format(date);  
    }
    
    /**
     * 将long类型的时间转换成String 类型
     */
    public static String longToString(Long time){
    	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	String dateString = formatter.format(new Date(time));
    	return dateString;
    }
    
    /**
     * 获取指定后几天的随机时间
     * @Description: 
     * @param: @param date 当前时间
     * @param: @param day 后几天
     * @param: @return   
     * @return: Date  
     * @throws
     * @author: VANCUL
     * @date: 2016年11月5日
     */
    public static Date getNextDayByRandom(Date date, int day, int hour) {  
        Calendar calendar = Calendar.getInstance();
        Random random = new Random();
        calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, day);  
        if(hour == 0){
        	calendar.set(Calendar.HOUR_OF_DAY, random.nextInt(23));  
        }else{
        	calendar.set(Calendar.HOUR_OF_DAY, hour);
        }
        calendar.set(Calendar.MINUTE, random.nextInt(59));  
        calendar.set(Calendar.SECOND, random.nextInt(59));  
        calendar.set(Calendar.MILLISECOND, 0);  
        return calendar.getTime();  
    }
    
    public static Date formatLongToDate(Long date, String pattern){
    	if(StringUtil.isEmpty(pattern)){
    		pattern = GLOBAL_TIME_PATTERN;
    	}
    	SimpleDateFormat df = new SimpleDateFormat(pattern);
    	String resDate = df.format(date);
    	return formatStringToDate(resDate);
    }
    
    public static Date getNextDay(Date date, int day){
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTime(date);  
        calendar.add(Calendar.DAY_OF_MONTH, day);
        return calendar.getTime();
    }
    
    /**
	 * 返回毫秒   milliSecond
	 * @return long
	 */
	public synchronized static String getMilliSecond(){
		return getMilliSecond(null);
	}
	
	/**
	 * 返回毫秒   milliSecond
	 * @param date 如果为null则重新创建一个新Date
	 * @return long
	 */
	public synchronized static String getMilliSecond(Date date){
		long milliSecond=0;
		milliSecond=System.currentTimeMillis();
		while(DateUtil.milliSecond == milliSecond){
			if(date==null){
				milliSecond=System.currentTimeMillis();
			}else{
				milliSecond = date.getTime();
			}
		}
		DateUtil.milliSecond = milliSecond;
		return milliSecond+"";
	}
    
    
    public static void main(String[] args) {
//    	String time=formatStrDate("2016-08-17 08:59", GLOBAL_MINUTES_PATTERN, GLOBAL_TIME_PATTERN);
//    	System.out.println(formatDateToString(getNextDayByRandom(formatStringToDate("2016-02-17 08:59:00"), 13, 0)));
//		List<String> dates = DateUtil.getStaticByMonthLabel(new Date());
//		System.out.println(dates);
		

//		System.out.println(System.currentTimeMillis());
//    	Long d = new Date().getTime();
    	System.out.println(DateUtil.formatDateToString(DateUtil.formatLongToDate(1484025556000L, "yyyy-MM-dd HH:mm:ss")));
	}
    
}
