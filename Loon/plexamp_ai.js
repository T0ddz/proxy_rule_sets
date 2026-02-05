/**
 * Plexamp AI 适配脚本 (修正版)
 * 作用：修改目标 Host、Body 模型参数，并强制修正 HTTP Host Header
 */

// 1. 解析 Body
let body;
try {
    body = JSON.parse($request.body);
} catch (e) {
    $done({}); // 如果解析失败，直接放行（虽然通常会失败）
}

// 2. 修改模型名称
body.model = "GLM-4.7";

// 3. 定义新的 Host
const targetHost = "coding-plan-endpoint.kuaecloud.net";

// 4. 替换 URL
const newUrl = $request.url.replace("api.openai.com", targetHost);

// 5. 【关键】修改 Host Header
// Loon 的 headers 对象可能是 Key-Value 形式，建议处理一下大小写兼容
let headers = $request.headers;
headers["Host"] = targetHost;
headers["host"] = targetHost; // 为了保险，兼容部分小写处理的网关

// 6. 发送修改后的请求
$done({
    url: newUrl,
    headers: headers, // 必须把修改后的 headers 传回去
    body: JSON.stringify(body)
});
