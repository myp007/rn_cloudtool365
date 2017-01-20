/**  
 * @Title: ArcTypeServiceI.java
 * @Package: com.bbsoft.api.service
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.service;

import java.util.Map;

import com.bbsoft.api.common.util.PageUtil;

/**
 * ClassName: ArcTypeServiceI 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
public interface ArcTypeServiceI {
	
	public PageUtil<Map> getArcTypeList(Integer pageNum, Integer pageSize);

}
