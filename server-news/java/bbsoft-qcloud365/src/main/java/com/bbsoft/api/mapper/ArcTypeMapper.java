/**  
 * @Title: ArcTypeMapper.java
 * @Package: com.bbsoft.api.mapper
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.mapper;

import java.util.List;
import java.util.Map;

/**
 * ClassName: ArcTypeMapper 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
public interface ArcTypeMapper {
	
	public int getArcTypeListCount();
	
	public List<Map<String,Object>> getArcTypeList(Map<String,Object> map);

}
