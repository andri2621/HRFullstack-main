import config from '../../../config/ConfigClient'
import axios from 'axios';

const list = async (signal) => {
    try {
        let response = await axios.get(`${config.apiUrl}/regions`, {
            signal: signal,
        })
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const create = async (region) => {
    try {
        let response = await axios.post(`${config.apiUrl}/regions`, 
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

  const update = async (region) => {
    const region_id = parseInt(region.region_id);
    try {
        let response = await axios.put(`${config.apiUrl}/regions/${region_id}`,
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

  const remove = async (region) => {
    const region_id = parseInt(region.region_id);
    try {
        let response = await axios.delete(`${config.apiUrl}/regions/${region_id}`)
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