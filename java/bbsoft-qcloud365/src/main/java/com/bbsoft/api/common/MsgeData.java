package com.bbsoft.api.common;


/**
 * 错误码和提示消息配置类
 * ClassName: MessageConfig 
 * @Description: 应用的错误码和提示消息
 */
public enum MsgeData {
	/*** 域名 */
	ATTACHMENT_URL("https://www.cloudtool365.com","https://www.cloudtool365.com"),
	
	/*** 服务器异常 */
	SYSTEM_10100("-10100", "服务器异常"),
	/*** 签名错误*/
	SYSTEM_10101("-10101", "签名错误"),
	/*** 用户信息会话失效*/
	SYSTEM_10102("-10102", "用户会话信息失效"),
	/*** ID错误*/
	SYSTEM_10103("-10103", "ID错误"),
	/*** 参数错误*/
	SYSTEM_10104("-10104", "参数错误"),
	/*** 信息不存在*/
	SYSTEM_10105("-10105", "信息不存在"),
	/*** 访问接口出错*/
	SYSTEM_10106("-10106", "访问接口出错"),
	/** token已失效，请重新登陆！！*/
	SYSTEM_10107("-10107","token已失效，请重新登陆！"),
	
	/*****************************后台错误编码*************************/
	/**id为空！**/
	QCLOUD365_1000020401("-1000020401","id为空！"),
	
	/*****************************前台错误编码结束**********************/
	
	/*** 数据转换异常*/
	SYSTEM_10108("10108", "数据转换异常");
	
	
	private String code;
	private String msg;

	private MsgeData(String code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public String  getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}
	public String getMsgResult(){
		return this.code + "," + this.msg;
	}
	
	public String getMsg(String string) {
		return string != null? msg + ":[" + string + "]" : msg;
	}
}
