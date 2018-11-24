let partten = /^1[34578]\d{9}$/;
module.exports = {
  phoneTest(val){
    return partten.test(val);
  }
}