import request from './request'

/**
 * @description  获取概览接口
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getTotalList(params) {
    let defaultParams = {
        projectId: 136, 
        studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, defaultParams)
    return request.get('/people/getOverview', {'params':queryParams});
}
/**
 * @description  各时间段人数统计
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 * @param {number} chooseType  时间粒度
 */
export function getPeopleCount(params) {
    let defaultParams = {
        projectId: 132,
        chooseType: 5,
        studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, params)
       return request.get('/people/getPeopleCount', {'params':queryParams});
}

/**
 * @description  终端型号统计
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 */
export function getPhoneModelList(params) {
    let defaultParams = {
        projectId: 132,
        studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, params)
       return request.get('/people/getPhoneModelList', {'params':queryParams});
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
       return request.get('/people/getSex', {'params':queryParams});
}

/**
 * @description  境内/境外/省内人员分布
 * @param {number} projectId  项目id
 * @param {number} studioId  场馆ID
 * @param {number} type  //1:境内 2：境外 3省内
 */
export function getPersonnelDistribution(params) {
    let defaultParams = {
        projectId: 132,
        type:1, 
        studioId: 20 
    }
    let queryParams = Object.assign({}, defaultParams, params)
       return request.get('/people/getPersonnelDistribution', {'params':queryParams});
}