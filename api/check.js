// api/check.js
const crypto = require('crypto');

module.exports = (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;

  // 1. 这里填入你在微信后台定义的那个 Token
  const TOKEN = 'mytoken123';

  // 2. 将 token、timestamp、nonce 三个参数进行字典序排序
  const array = [TOKEN, timestamp, nonce].sort();

  // 3. 将三个参数字符串拼接成一个字符串进行 sha1 加密
  const tempStr = array.join('');
  const hashCode = crypto.createHash('sha1').update(tempStr).digest('hex');

  // 4. 开发者获得加密后的字符串可与 signature 对比，确认请求来自微信
  if (hashCode === signature) {
    // 校验成功，原样返回 echostr
    return res.status(200).send(echostr);
  } else {
    // 校验失败
    return res.status(403).send('Invalid signature');
  }
};