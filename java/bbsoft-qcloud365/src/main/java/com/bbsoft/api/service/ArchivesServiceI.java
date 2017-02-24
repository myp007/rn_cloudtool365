/**  
 * @Title: Archives.java
 * @Package: com.bbsoft.api.service
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.service;

import java.util.List;
import java.util.Map;

import com.bbsoft.api.common.util.PageUtil;

/**
 * ClassName: Archives 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
public interface ArchivesServiceI {
	
	public PageUtil<Map> getArcList(Integer typeId,Integer pageNum, Integer pageSize);
	
	public Map<String,Object>getArcById(Integer id);
	
	public List<Map<String,Object>> getBannerPic(String type);

}
