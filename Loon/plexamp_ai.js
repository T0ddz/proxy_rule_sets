/**
 * Plexamp AI 适配脚本
 * 作用：修改目标 Host 并在 Body 中强制指定模型为 GLM-4.7
 */

let body;
try {
    body = JSON.parse($request.body);
} catch (e) {
    console.log("Plexamp AI: 解析 Body 失败");
    $done({});
}

// 1. 修改模型名称
body.model = "GLM-4.7";

// 2. 替换 URL 为三方服务地址
const newUrl = $request.url.replace("api.openai.com", "coding-plan-endpoint.kuaecloud.net");

// 3. 这里的 $done 会将修改后的请求发往新地址
$done({
    url: newUrl,
    body: JSON.stringify(body)
});
