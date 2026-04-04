/**
 * Plexamp AI 适配脚本 (最终修正版)
 * 修复：解决重复 Host 头导致的 502 错误
 */

// 1. 解析并修改 Body
let body;
try {
    body = JSON.parse($request.body);
    body.model = "gpt-5.4"; // 强制修改模型
    body.stream = false;
} catch (e) {
    console.log("JSON 解析失败");
    $done({}); 
}

// 2. 定义目标服务信息
const targetHost = "cpa.t0dd.de";
const newUrl = $request.url.replace("api.openai.com", targetHost);

// 3. 处理 Headers (关键步骤)
let headers = $request.headers;

// 遍历并删除所有可能存在的 Host 字段 (兼容不同的大小写)
const keys = Object.keys(headers);
for (let key of keys) {
    if (key.toLowerCase() === 'host') {
        delete headers[key];
    }
}

// 重新设置单一的 Host
headers["Host"] = targetHost;

// 4. 发送请求
$done({
    url: newUrl,
    headers: headers,
    body: JSON.stringify(body)
});
