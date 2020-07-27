import request from './request'
/**
 * @description  获取概览接口
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getOverview(params) {
    let defaultParams = {
        projectId: 132, //项目id
        studioId: 20 //场馆ID
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/baseStation/getOverview/' +queryParams.projectId,);
}

/**
 * @description  获取工单总数 工单列表
 */
export function getTaskList(params) {
    let defaultParams = {
        projectId: 132, //项目id
        studioId: 20, //场馆ID
        userId: 12,  //用户id
        page : 1, //第几页 page不传默认为1
        size : 10 ,//每页显示数  size 不传默认为10 page,size都不传查所有
        createTimeMin : '', 
        createTimeMax : ''
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/task/getTaskList',{'params':queryParams});
}


/**
 * @description  获取故障告警 - 故障告警统计接口
 * @param {number} projectId  项目id
 */
export function getFaultAlarmCountsPandect(params) {
    let defaultParams = {
        projectId: 133, //项目id
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/faultAlarm/getFaultAlarmCountsPandect',{'params':queryParams});
}

/**
 * @description  获取故障告警 新增故障告警接口
 */
export function getAddAlarmList(params) {
    let defaultParams = {
        projectId: 132, //项目id
        count : 20, //获取条数
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/faultAlarm/getAddAlarmList',{'params':queryParams});
}


/**
 * @description  获取故障告警 - 所有故障告警信息列表
 */
export function getAlarmTable(params) {
    let defaultParams = {
        projectId: 132, //项目id
        page : 1, //第几页 page不传默认为1
        size : 10 ,//每页显示数  size 不传默认为10 page,size都不传查所有
        startTimeMin: '', 
        startTimeMax: ''
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/faultAlarm/getAlarmTable',{'params':queryParams});
}

/**
 * @description  获取性能预警 - 性能预警统计接口
 * @param {number} projectId  项目id
 */
export function getPerformanceWarningTypeCounts(params) {
    let defaultParams = {
        projectId: 133, //项目id
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/performanceWarning/getPerformanceWarningTypeCounts',{'params':queryParams});
}

/**
 * @description  获取性能预警 新增性能预警接口-echart
 */
export function getMinutePerformanceAddCounts(params) {
    let defaultParams = {
        projectId: 132, //项目id
        count : 20, //获取条数
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/performanceWarning/getMinutePerformanceAddCounts',{'params':queryParams});
}




/**
 * @description  获取性能预警 - 所有性能预警信息列表
 */
export function getPerformanceList(params) {
    let defaultParams = {
        projectId: 132, //项目id
        page : 1, //第几页 page不传默认为1
        size : 10 ,//每页显示数  size 不传默认为10 page,size都不传查所有
        startTimeMin: '', 
        startTimeMax: ''
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/performanceWarning/getPerformanceList',{'params':queryParams});
}
