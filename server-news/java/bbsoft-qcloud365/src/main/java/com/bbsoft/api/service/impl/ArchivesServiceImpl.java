/**  
 * @Title: ArchivesServiceImpl.java
 * @Package: com.bbsoft.api.service.impl
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bbsoft.api.common.util.BeanToMapUtil;
import com.bbsoft.api.common.util.DateUtil;
import com.bbsoft.api.common.util.PageUtil;
import com.bbsoft.api.common.util.StringUtil;
import com.bbsoft.api.mapper.ArchivesMapper;
import com.bbsoft.api.service.ArchivesServiceI;

/**
 * ClassName: ArchivesServiceImpl 
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
@Service
public class ArchivesServiceImpl implements ArchivesServiceI{
	
	@Autowired
	private ArchivesMapper archivesMapper;
	
	@Override
	public PageUtil<Map> getArcList(Integer typeId, Integer pageNum,
			Integer pageSize) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("typeId", typeId);
		Integer total = archivesMapper.getArcListCount(map);
		PageUtil<Map> page = new PageUtil<Map>(pageNum, pageSize, total);
		map.put("startPage", page.getStartItem()==null?1:page.getStartItem());
		map.put("pageSize", pageSize==null?20:pageSize);
		List<Map<String,Object>> list = archivesMapper.getArcList(map);
		for(int i=0;i<list.size();i++){
			String litpic = list.get(i).get("litpic")==null?"":list.get(i).get("litpic").toString();
			String pubDate = list.get(i).get("pubDate")==null?"":list.get(i).get("pubDate").toString();
			if(StringUtils.isNotEmpty(litpic)){
				list.get(i).put("litpic", StringUtil.covertFullImg(litpic));
			}
			if(StringUtils.isNotEmpty(pubDate)){
				String strDate = DateUtil.formatDateToString(DateUtil.formatLongToDate((Long.parseLong(pubDate)*1000), "yyyy-MM-dd HH:mm:ss"));
				list.get(i).put("pubDate", strDate);
			}
		}
		page.setItems(BeanToMapUtil.convertList(list, false));
		return page;
	}

	@Override
	public Map<String, Object> getArcById(Integer id) {
		Map<String,Object> map = archivesMapper.getArcById(id);
		if(map!=null){
			String litpic = map.get("litpic")==null?"":map.get("litpic").toString();
			String pubDate = map.get("pubDate")==null?"":map.get("pubDate").toString();
			if(StringUtils.isNotEmpty(litpic)){
				map.put("litpic", StringUtil.covertFullImg(litpic));
			}
			if(StringUtils.isNotEmpty(pubDate)){
				String strDate = DateUtil.formatDateToString(DateUtil.formatLongToDate((Long.parseLong(pubDate)*1000), "yyyy-MM-dd HH:mm:ss"));
				map.put("pubDate", strDate);
			}
		}
		return map;
	}

	@Override
	public List<Map<String, Object>> getBannerPic(String type) {
		List<Map<String,Object>> listMap = archivesMapper.getBannerPic(type);
		for (int i = 0; i < listMap.size(); i++) {
			String litpic = listMap.get(i).get("litpic")==null?"":listMap.get(i).get("litpic").toString();
			if(StringUtils.isNotEmpty(litpic)){
				listMap.get(i).put("litpic", StringUtil.covertFullImg(litpic));
			}
		}
		return listMap;
	}

}
