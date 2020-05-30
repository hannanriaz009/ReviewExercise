import axios from 'axios'
import { POST_API } from '../config/constant'

export const fetchPosts = async () => {
    return axios.get(`${POST_API}`)
        .then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
            return []
        })
}

export const deletePost = async (id: any) => {
    return axios.delete(`${POST_API}/${id}`)
        .then(response => {
            return response.status
        }).catch(error => {
            console.log(error)
            return []
        })
}
export const addPost = async (id: any, title: any, body: any) => {
    return axios.post(`${POST_API}`, {
        title: title,
        body: body,
        userId: id
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
        return []
    })
}
export const updatePost = async (id: any, title: any, body: any) => {
    return axios.post(`${POST_API}`, {
        title: title,
        body: body,
        userId: id
    }).then(response => {
        return response.data
    }).catch(error => {
        console.log(error)
        return []
    })
}