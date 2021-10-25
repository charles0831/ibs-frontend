import axios from 'axios';
import authHeader from './auth-header';
import storage from '../utils/storage';
class Job {
    getInfo = () => {
        return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/job/info`, {
            headers: authHeader(storage.getStorage('token')),
        })
        .then(response => {
            if (response.data.code === 401)
                storage.removeStorage('token');
            return response.data;
        }).catch(error => {
            return error;
        })
    }

    getDateStr = (year, month, day) => {
        if (parseInt(month) < 10) {
            month = '0' + month;
        }
        if (parseInt(day) < 10) {
            day = '0' + day;
        }

        return year + '-' + month + '-' + day + ' 00:00:00';
    }

    getChartData = (id_chart_type, id_section, id_occupation, id_province, id_cluster, fromDate, toDate) => {
        return axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/job/get_chart_data`, {
            id_chart_type: id_chart_type,
            id_section: id_section,
            id_occupation: id_occupation,
            id_province: id_province,
            id_cluster: id_cluster,
            fromDate: fromDate,
            toDate: toDate,
            fromDateStr: this.getDateStr(fromDate.year, fromDate.month + 1, 1),
            toDateStr: this.getDateStr(toDate.year, toDate.month + 1, 28),
            fromYearStr: this.getDateStr(fromDate.year, 1, 1),
            toYearStr: this.getDateStr(fromDate.year, 12, 31),
        }, {
            headers: authHeader(storage.getStorage('token'))
        })
        .then(response => {
            if (response.data.code === 401)
                storage.removeStorage('token');
            return response.data;
        }).catch(error => {
            return error;
        })
    }
}
export default new Job();