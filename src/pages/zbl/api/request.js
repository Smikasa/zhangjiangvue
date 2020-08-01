import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance 创建拦截器
const service = axios.create({
    // baseURL: 'https://www.fastmock.site/mock/886958c08bc9eb06260f7ded327e86d0/api', // url = base url + request url //设置基础URL
    // baseURL:'http://218.77.106.72:1029',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    header:{
        'Content-Type':'application/json'
    }
})

// request interceptor 请求拦截
service.interceptors.request.use(
    config => {
        // do something before request is sent
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        // 根据返回值进行判断
        if (res.code === 5000) {

            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service