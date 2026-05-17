import { next } from '@vercel/functions';

const wechatUserAgent = /MicroMessenger/i;

const blockedHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>请在微信客户端打开</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f5f5f5;
      color: #1f2329;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    }

    main {
      width: min(360px, calc(100vw - 48px));
      text-align: center;
    }

    img {
      width: 72px;
      height: 72px;
      margin-bottom: 18px;
    }

    h1 {
      margin: 0 0 10px;
      font-size: 22px;
      font-weight: 700;
    }

    p {
      margin: 0;
      color: #646a73;
      font-size: 15px;
      line-height: 1.7;
    }
  </style>
</head>
<body>
  <main>
    <img src="https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico" alt="微信" />
    <h1>请在微信客户端打开</h1>
    <p>当前页面仅支持通过微信访问，请复制链接后在微信中打开。</p>
  </main>
</body>
</html>`;

export const config = {
  matcher: [
    '/((?!api|wechat/check|favicon.ico|.*\\.(?:css|js|map|png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json)$).*)',
  ],
};

export default function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';

  if (wechatUserAgent.test(userAgent)) {
    return next();
  }

  return new Response(blockedHtml, {
    status: 403,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
