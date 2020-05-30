import axios from 'axios'
import { USERS_API } from '../config/constant'

export const fetchUsers = async () => {
    return axios.get(`${USERS_API}`)
        .then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
            return []
        })
}

export const deleteUser = async (id: any) => {
    return axios.delete(`${USERS_API}/${id}`)
        .then(response => {
            return response.status
        }).catch(error => {
            console.log(error)
            return []
        })
}
