import request from './request'
import { MessageBox, Message } from 'element-ui'

/**
 * @description  获取概览接口
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID （不传场馆ID返回全网信息）
 */
export function getOverview(params) {
    let urlParams = params.studioId ? params.projectId + '/' + params.studioId : params.projectId
    return request.get('/baseStation/getOverview/' + urlParams).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取小区 -  4g/语音感知 - 左侧列表（kpi）
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getHourNewKpi(params) {
    return request.post('/baseStation/getHourNewKpi?projectId=' + params.projectId + '&type=' + params.type).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取小区 -  所有图表通用接口 - 名称
 * @param {number} projectId  项目id
 * @param {number} kpiType //指标类型(1:4G 2:5G 3:数据感知 4：语音感知)不传查所有类型
 */
export function getKpiList(params) {
    let kpiTypeUrl = params.kpiType ? '&kpiType=' + params.kpiType : '';
    return request.post('/baseStation/getKpiList?projectId=' + params.projectId + kpiTypeUrl).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取小区 -  所有图表通用接口 - 数据
 * @param {number} projectId  项目id
 * @param {} kpiIdList  // 指标编号 ，由逗号隔开
 * @param {} kpiType  // 指标类型, (1:4G  2: 5G  3:数据感知 4:Votle语音)
 */
export function getEchartData(params) {
    return request.get('/baseStation/getEchartData/' + params.projectId + '/' + params.kpiType + '/' + params.kpiIdList).then((resp) => {
        if (resp.code !== 1000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}


/**
 * @description  获取故障告警 - 故障告警统计接口
 * @param {number} projectId  项目id
 */
export function getFaultAlarmCountsPandect(params) {
    return request.post('/faultAlarm/getFaultAlarmCountsPandect?projectId=' + params.projectId).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取故障告警 新增故障告警接口
 * @param {number} projectId:133,  //项目id 
 * @param {number} count : 17，  //获取条数
 */
export function getAddAlarmList(params) {
    return request.get('/faultAlarm/getAddAlarmList' + '/' + params.projectId + '/' + params.count).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}


/**
 * @description  获取故障告警 - 所有故障告警信息列表
 * @param {number} projectId:1,  //项目id  
 * @param {number} page : 1, //第几页      page不传默认为1
 * @param {number} size : 10 ,//每页显示数  size 不传默认为10    page,size都不传查所有
 * @param {string} startTimeMin : YY-MM-dd HH:mm:ss   ,开始时间最小值
 * @param {string} startTimeMax : YY-MM-dd HH:mm:ss   ,开始时间最大值
 */
export function getAlarmTable(params) {
    return request.post('/faultAlarm/getAlarmTable?projectId=' + params.projectId).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取性能预警 - 性能预警统计接口
 * @param {number} projectId  项目id
 */
export function getPerformanceWarningTypeCounts(params) {
    return request.post('/performanceWarning/getPerformanceWarningTypeCounts?projectId=' + params.projectId).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取性能预警 新增性能预警接口-echart
 * @param {number} projectId:133,  //项目id 
 * @param {number} count : 17，  //获取条数
 */
export function getMinutePerformanceAddCounts(params) {
    return request.post('/performanceWarning/getMinutePerformanceAddCounts?projectId=' + params.projectId + '&count=' + params.count).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}

/**
 * @description  获取性能预警 - 所有性能预警信息列表
 * 
 * @param {number} projectId:1,  //项目id  
 * @param {number} page : 1, //第几页      page不传默认为1
 * @param {number} size : 10 ,//每页显示数  size 不传默认为10    page,size都不传查所有
 * @param {string} startTimeMin : YY-MM-dd HH:mm:ss   ,开始时间最小值
 * @param {string} startTimeMax : YY-MM-dd HH:mm:ss   ,开始时间最大值
 */
export function getPerformanceList(params) {
    return request.post('/performanceWarning/getPerformanceList?projectId=' + params.projectId).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}


/**
 * @description  获取工单总数 工单列表
 * @param {number} projectId:1,  //项目id  
 * @param {number} userId: ,  //用户id
 * @param {number} page : 1, //第几页      page不传默认为1
 * @param {number} size : 10 ,//每页显示数  size 不传默认为10    page,size都不传查所有
 * @param {string} createTimeMin : YY-MM-dd HH:mm:ss   ,创建时间最小值
 * @param {string} createTimeMax : YY-MM-dd HH:mm:ss   ,创建时间最大值
 */
export function getTaskList(params) {
    return request.post('/workTask/getTaskList?projectId=' + params.projectId).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}


/**
 * @description  获取到岗人员数 - 场馆重保人员列表
 * @param {number}projectId:1,  //项目id   
 * @param {number}page : 1, //第几页
 * @param {number}size : 10 ,//每页显示数
 */
export function getUsers(params) {
    return request.post('/onDutyperson/getOnDutypersonList?projectId=' + params.projectId
        + '&page=' + params.page
        + '&size=' + params.size
    ).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}
/**
 * @description  获取到岗人员数 - 场馆重保人员列表
 * @param {number}projectId:1,  //项目id   
 * @param {number}floor : 1F, //(楼层  1F 2F 3F)
 * @param {number}zhibiao : 35 ,//指标ID
 */
export function getFloorKpiValue(params) {
    return request.post('/baseStation/getFloorKpiValue?projectId=' + params.projectId
        + '&floor=' + params.floor
        + '&zhibiao=' + params.zhibiao
    ).then((resp) => {
        if (resp.code !== 10000) {
            // Message({
            //     message: resp.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
        }
        return resp
    });
}





