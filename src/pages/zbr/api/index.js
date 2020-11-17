import request from './request'

/**
 * @description  获取概览接口
 * @param {number} projectId  项目id
 */
export function getTotalList(params) {
    let defaultParams = {
        projectId: 132,
    }
    let queryParams = Object.assign({}, defaultParams, defaultParams)
    return request.post('/passengerFlow/getPassengerNums?projectId=' + queryParams.projectId);
}
/**
 * @description  各时间段人数统计
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 * @param {number} chooseType  时间粒度
 */
export function getPeopleCount(params) {
    let defaultParams = {
        projectId: 133,
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.post('/passengerFlow/getPeopleCountingByTime?projectId=' + queryParams.projectId);
}

/**
 * @description  终端型号统计
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getPhoneModelList(params) {
    let defaultParams = {
        projectId: 132,
        // studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.post('/passengerFlow/terminalModelDistribution?projectId=' + queryParams.projectId);
}

/**
 * @description  性别分布
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getSex(params) {
    let defaultParams = {
        projectId: 132,
        studioId: 20
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.get('/people/getSex', { 'params': queryParams });
}

/**
 * @description  境内/境外/省内人员分布
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 * @param {number} type  //1:境内 2：境外 3省内
 */
export function passengerDistribution(params) {
    let defaultParams = {
        projectId: 133,
        type: 1,
        // studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, params)
    return request.post('/passengerFlow/passengerDistribution?projectId=' + queryParams.projectId + '&type=' + queryParams.type);
}