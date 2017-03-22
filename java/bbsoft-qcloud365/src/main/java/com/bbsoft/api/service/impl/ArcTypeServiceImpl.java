/**  
 * @Title: ArcTypeServiceImpl.java
 * @Package: com.bbsoft.api.service
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bbsoft.api.common.util.BeanToMapUtil;
import com.bbsoft.api.common.util.PageUtil;
import com.bbsoft.api.mapper.ArcTypeMapper;
import com.bbsoft.api.service.ArcTypeServiceI;

/**
 * ClassName: ArcTypeServiceImpl 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
@Service
public class ArcTypeServiceImpl implements ArcTypeServiceI {
	
	@Autowired
	private ArcTypeMapper arcTypeMapper;

	@SuppressWarnings("rawtypes")
	public PageUtil<Map> getArcTypeList(Integer pageNum, Integer pageSize) {
		Integer total = arcTypeMapper.getArcTypeListCount();
		PageUtil<Map> page = new PageUtil<Map>(pageNum, pageSize, total);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("startPage", page.getStartItem()==null?1:page.getStartItem());
		map.put("pageSize", pageSize==null?20:pageSize);
		List<Map<String,Object>> list = arcTypeMapper.getArcTypeList(map);
		page.setItems(BeanToMapUtil.convertList(list, false));
		return page;
	}

}
