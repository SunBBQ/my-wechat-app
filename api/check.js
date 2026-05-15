// api/check.js
module.exports = (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;

  // 简单起见，这里直接返回 echostr 完成验证
  // 在正式生产环境，建议按照微信文档进行 sha1 签名校验
  if (echostr) {
    return res.status(200).send(echostr);
  }

  res.status(200).send('Hello WeChat!');
};