let partten = /^1[34578]\d{9}$/;
// import axios from "axios"
module.exports = {
  // 校验手机号
  phoneTest(val) {
    return partten.test(val);
  },
  // 检验身份证
  idCardTest(val) {
    return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(val);
  },
  // 检测银行卡
  // checkBankno(bankno) {
  //   
  //   return false;
  // }
}
