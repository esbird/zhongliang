import fetch from '../config/fetch'
// import Vue from 'vue'

/**
 * 获取分类
 * ItemParentID   1 会员类型      
    2 贷款会员类型
    10 产品类别

 */

export const getSortList = (data,headers={}) => fetch('/api/Get/Dic',data, "POST",headers);
/**
 * 获取分类父级
 * 传输当前ID 拿到上级的ID继续查询 当拿到顶级 ItemParentID后 结束查询 
    1 会员类型      
    2 贷款会员类型
    10 产品类别 
 */

export const getDicParent = (data,headers={}) => fetch('/api/Get/DicParent',data, "POST",headers);

/**
 * 5.	获取挂牌列表（条件筛选）
 * 排序  0 是升序   1 是降序

 */

export const getGuaPai = (data,headers={}) => fetch('/api/Get/guapai',data, "POST",headers);

/**
 * 	获取挂牌信息

 */

export const getGuaPaiDt = (data,headers={}) => fetch('/api/Get/guapaiDt',data, "POST",headers);

/**
 * 插入挂牌信息（更新一起）

 */

export const postGuaPai = (data,headers={}) => fetch('/api/Post/guapai',data, "POST",headers);
/**
 * 获取用户信息

 */

export const getUserInfo = (data,headers={}) => fetch('/api/Get/UserInfo',data, "POST",headers);
/**
 * 上传图片

 */

export const uploadPic = (data,headers={}) => fetch('/api/Upload/UpLoadFiles',data, "POST",headers);
/**
 * 查询图片

 */

export const getPic = (data,headers={}) => fetch('/api/Get/Photo',data, "POST",headers);

/**
 * 获取用户挂牌

 */

export const getUserGuapai = (data,headers={}) => fetch('/api/Get/Userguapai',data, "POST",headers);

/**
 * 删除用户挂牌

 */

export const delUserGuapai = (data,headers={}) => fetch('/api/Delete/guapai',data, "POST",headers);

/**
 * 申请放款

 */

export const postFangkuan = (data,headers={}) => fetch('/api/Post/fangkuan',data, "POST",headers);

/**
 * 查看放款

 */

export const getFangkuan = (data,headers={}) => fetch('/api/Get/fangkuan',data, "POST",headers);


/**
 * 查看租赁列表

 */

export const getZuLin = (data,headers={}) => fetch('/api/Get/zuping',data, "POST",headers);

/**
 * 增加租赁申请

 */

export const postZuLin = (data,headers={}) => fetch('/api/Post/zuping',data, "POST",headers);

/**
 * 查看租赁信息

 */

export const getZuLinDt = (data,headers={}) => fetch('/api/Get/zupingDt',data, "POST",headers);

/**
 * 申请出库

 */

export const postChuKu = (data,headers={}) => fetch('/api/Post/chuku',data, "POST",headers);
/**
 * 获取出库记录

 */

export const getChuKu = (data,headers={}) => fetch('/api/Get/chuku',data, "POST",headers);
/**
 * 申请贷款

 */

export const postDaikuan = (data,headers={}) => fetch('/api/Post/daikuan',data, "POST",headers);
/**
 * 查询贷款

 */

export const getDaikuan = (data,headers={}) => fetch('/api/Get/daikuan',data, "POST",headers);
/**
 * 获取还款记录

 */

export const getHuankuan = (data,headers={}) => fetch('/api/Get/huankuan',data, "POST",headers);
/**
 * 插入还款

 */

export const postHuankuan = (data,headers={}) => fetch('/api/Post/huankuan',data, "POST",headers);
/**
 * 获取验证码

 */

export const getSendMessage = (data,headers={}) => fetch('/api/Get/SentMessage',data, "POST",headers);
/**
 * 获取openid

 */

export const getOpenId = (data,headers={}) => fetch('/api/Wechat/WxOpenID',data, "POST",headers);
/**
 * 获取微信用户信息

 */

export const getWxUserInfo = (data,headers={}) => fetch('/api/Wechat/WxUser',data, "POST",headers);
/**
 * 登录注册

 */

export const postLogin = (data,headers={}) => fetch('/api/Get/Login',data, "POST",headers);

/**
 * 提交会员升级
 */

export const postUserLevel = (data,headers={}) => fetch('/api/Post/UserLevel',data, "POST",headers);

/**
 * 获取会员升级记录
 */

export const getUserLevel = (data,headers={}) => fetch('/api/Get/UserLevel',data, "POST",headers);

/**
 * 上传身份证信息
 */

export const postUserIdCard = (data,headers={}) => fetch('/api/Post/UserIdCard',data, "POST",headers);

/**
 * 更新亲密联系人
 */

export const postUserGuanxi = (data,headers={}) => fetch('/api/Post/UserGuanxi',data, "POST",headers);

/**
 * 更新余额
 */

export const postUserMoney = (data,headers={}) => fetch('/api/Post/UserMoney',data, "POST",headers);

/**
 * 获取账单列表
 */

export const getMoneyRecord = (data,headers={}) => fetch('/api/Get/UserMoney',data, "POST",headers);

