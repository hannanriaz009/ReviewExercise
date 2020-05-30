import axios from 'axios'
import { ALBUMS_API } from '../config/constant'

export const fetchAlbums = async () => {
    return axios.get(`${ALBUMS_API}`)
        .then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
            return []
        })
}

export const deleteAlbum = async (id: any) => {
    return axios.delete(`${ALBUMS_API}/${id}`)
        .then(response => {
            return response.status
        }).catch(error => {
            console.log(error)
            return []
        })
}

export const addAlbum = async (id: any, title: any, body: any) => {
    return axios.post(`${ALBUMS_API}`, {
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

export const updateAlbum = async (id: any, title: any, body: any) => {
    return axios.put(`${ALBUMS_API}`, {
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