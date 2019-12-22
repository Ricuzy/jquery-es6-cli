import axios from 'axios'

const baseCreateParams = {
    timeout: 1000,
    baseURL: ''
}

const baseRequestInterceptor = res => {}

const baseResponseInterceptor = res => res.data

function createBaseAxiosInstance(
    axiosConfig = baseCreateParams,
    requestInterceptor = baseRequestInterceptor,
    responseInterceptor = baseResponseInterceptor
) {
    const axioInstance = axios.create(axiosConfig)

    axioInstance.interceptors.request.use(res => {
        requestInterceptor.call(null, res)
    })

    axioInstance.interceptors.response.use(res => {
        responseInterceptor.call(null, res)
    })

    return axioInstance
}

export default createBaseAxiosInstance
