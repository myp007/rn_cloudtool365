/**  
 * @Title: ArchivesMapper.java
 * @Package: com.bbsoft.api.mapper
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.mapper;

import java.util.List;
import java.util.Map;

/**
 * ClassName: ArchivesMapper 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
public interface ArchivesMapper {
	
	public int getArcListCount(Map<String,Object> map);
	
	public List<Map<String,Object>> getArcList(Map<String,Object> map);

	public Map<String,Object> getArcById(Integer id);
	
	public List<Map<String,Object>> getBannerPic(String type);
}
