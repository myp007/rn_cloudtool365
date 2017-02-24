package com.bbsoft.api.controller;

import com.bbsoft.api.common.Json;

/**
 * 
 * ClassName: BaseApi 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2016-12-29
 */
public class BaseApi {
	
	protected Json getSuccessObj() {
		Json json = new Json();
		json.setErrorMsg("操作成功");
		json.setErrorCode("0");
		json.setSuccess(true);
		json.setResults("{}");
		return json;
	}

	protected Json getSuccessObj(String msg) {
		Json json = new Json();
		json.setErrorMsg(msg);
		json.setErrorCode("0");
		json.setSuccess(true);
		json.setResults("{}");
		return json;
	}

	protected Json getSuccessObj(String code, String msg) {
		Json json = new Json();
		json.setErrorMsg(msg);
		json.setErrorCode(code);
		json.setSuccess(true);
		json.setResults("{}");
		return json;
	}

	protected Json getFailedObj() {
		Json json = new Json();
		json.setErrorMsg("操作失败");
		json.setErrorCode("-1");
		json.setSuccess(false);
		json.setResults("{}");
		return json;
	}

	protected Json getFailedObj(String msg) {
		Json json = new Json();
		json.setErrorMsg(msg);
		json.setErrorCode("-1");
		json.setSuccess(false);
		json.setResults("{}");
		return json;
	}

	protected Json getFailedObj(String code, String msg) {
		Json json = new Json();
		json.setErrorMsg(msg);
		json.setErrorCode(code);
		json.setSuccess(false);
		json.setResults("{}");
		return json;
	}
}
