/**  
 * @Title: Function10000200.java
 * @Package: com.bbsoft.api.controller.index
 * @Description: TODO
 * @author: VULCAN
 * @date: 2017-1-19
 */
package com.bbsoft.api.controller.index;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bbsoft.api.common.Json;
import com.bbsoft.api.common.MsgeData;
import com.bbsoft.api.common.util.PageUtil;
import com.bbsoft.api.common.util.ResultUtil;
import com.bbsoft.api.controller.BaseApi;
import com.bbsoft.api.interceptor.ServiceException;
import com.bbsoft.api.service.ArcTypeServiceI;
import com.bbsoft.api.service.ArchivesServiceI;

/**
 * ClassName: Function10000200 
 * @Description: 首页接口
 * @author: VULCAN
 * @date: 2017-1-19
 */
@Controller
public class Function10000200 extends BaseApi{
	
	private static final Logger logger = LoggerFactory.getLogger(Function10000200.class);
	
	@Resource
	private ArcTypeServiceI arcTypeService;
	@Resource
	private ArchivesServiceI archivesService;
	
	//文章分类：dede_arctype
	@RequestMapping("/10000201")
	@ResponseBody
	public Json getArcTypeList(Integer pageNum, Integer pageSize){
		logger.info("入参(10000201),pageNum:{},pageSize:{}",pageNum,pageSize);
		Json json = getSuccessObj();
		try {
			PageUtil<Map> page = arcTypeService.getArcTypeList(pageNum,pageSize);
			json.setResults(page);
		} catch (ServiceException e) { 
			logger.error("@@10000201.Exception", e);
			json = getFailedObj(e.getCode(),e.getMessage());
		}
		logger.info("出参(10000201)："+ResultUtil.returnByObj(json));
		return json;
	}
	
	//banner位图片
	@RequestMapping("/10000202")
	@ResponseBody
	public Json getBannerByTypeId(){
		logger.info("入参(10000202):");
		Json json = getSuccessObj();
		try {
			String type = "f";//获取幻灯图片
			List<Map<String,Object>> list = archivesService.getBannerPic(type);
			json.setResults(ResultUtil.returnByList(list));
		} catch (ServiceException e) { 
			logger.error("@@10000202.Exception", e);
			json = getFailedObj(e.getCode(),e.getMessage());
		}
		logger.info("出参(10000202)："+ResultUtil.returnByObj(json));
		return json;
	}
	
	//文章列表
	@RequestMapping("/10000203")
	@ResponseBody
	public Json getArcList(Integer typeId,Integer pageNum, Integer pageSize){
		logger.info("入参(10000203),typeId:{},pageNum:{},pageSize:{}",typeId, pageNum, pageSize);
		Json json = getSuccessObj();
		try {
			if(typeId==null){
				typeId=36;
			} 
			 PageUtil<Map> page = archivesService.getArcList(typeId,pageNum,pageSize);
			 json.setResults(page);
		} catch (ServiceException e) { 
			logger.error("@@10000203.Exception", e);
			json = getFailedObj(e.getCode(),e.getMessage());
		}
		logger.info("出参(10000203)："+ResultUtil.returnByObj(json));
		return json;
	}
	
	//文章详情
	@RequestMapping("/10000204")
	@ResponseBody
	public Json getArcById(Integer id){
		logger.info("入参(10000204),id:{}",id);
		Json json = getSuccessObj();
		try {
			if(id==null){
				json = getFailedObj(MsgeData.QCLOUD365_1000020401.getCode(), MsgeData.QCLOUD365_1000020401.getMsg());
			}else{
				Map<String,Object> map =  archivesService.getArcById(id);
				json.setResults(ResultUtil.returnByObj(map));
			} 
		} catch (ServiceException e) { 
			logger.error("@@10000204.Exception", e);
			json = getFailedObj(e.getCode(),e.getMessage());
		}
		logger.info("出参(10000204)："+ResultUtil.returnByObj(json));
		return json;
	}
	
}
