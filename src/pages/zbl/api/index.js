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