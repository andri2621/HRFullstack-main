import config from '../../../config/ConfigClient'
import axios from 'axios';

const path = `emps`

const list = async (signal) => {
    try {
        let response = await axios.get(`${config.apiUrl}/${path}`, {
            signal: signal,
        })
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (data) => {
    try {
        let response = await axios.post(`${config.apiUrl}/v1/upload`, 
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
      return await response.data
    } catch(err) {
        return await err.message
    } 
  }

  const update = async (data) => {
    const employee_id = parseInt(data.employee_id);
    try {
        let response = await axios.put(`${config.apiUrl}/${path}/${employee_id}`,
        region,
        {
            headers: {
                'Content-Type': 'application/json'
              }
        })
      return await response.data
    } catch(err) {
        return await err.message
    } 
  }

  const remove = async (data) => {
    const employee_id = parseInt(data.employee_id);
    try {
        let response = await axios.delete(`${config.apiUrl}/${path}/${employee_id}`)
      return await response.data
    } catch(err) {
        return await err.message
    } 
  }

export {
    list,
    create,
    update,
    remove
}