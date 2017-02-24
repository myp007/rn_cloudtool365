package com.bbsoft.api.interceptor;

import com.bbsoft.api.common.MsgeData;

/**
 * 业务异常
 * ClassName: ServiceException 
 * @Description: 
 */

public class ServiceException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	private String code;
	private String message;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	public ServiceException(String code)
	{
		MsgeData[] messages = MsgeData.values();
		if(messages != null && messages.length > 0){
			for(int i = 0; i < messages.length; i++){
				if(code.equals(messages[i].getCode())){
					this.message = messages[i].getMsg();
					break;
				}
			}
		}
		this.code = code;
	}

	public ServiceException(String code, String message)
	{
		this.code = code;
		this.message = message;
	}
}
