import http from '../utils/http';
import config from '../config';

const prefix = `${config.getUrl('service')}/Erp/Shop/Upc`;

export async function get(params) {
	return http.autoError.get(`${prefix}/GetUpcApply`, params);
}
