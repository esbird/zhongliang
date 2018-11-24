// import Vue from 'vue'
import {md5} from './md5.js'

export default (UserID,token)=>{
	
	

	let timestamp = (new Date()).valueOf();

	let signature = md5(timestamp+token);
	return {id:UserID,timestamp,signature};
}