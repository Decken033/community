// src/utils/common.ts

export default {
    getAssetImage(imgSrc: string, baseUrl: string) {
        // console.log('baseUrl', baseUrl);
        // console.log('new URL(imgSrc, baseUrl).href', new URL(imgSrc, baseUrl).href);
        // console.log('import.meta.url', import.meta.url);
        // console.log('new URL(imgSrc, import.meta.url).href', new URL(imgSrc, import.meta.url).href);

        // 正则匹配函数调用者文件的路径
        const regExp1 = /at Proxy.getAssetImage \((.+)\)/g;
        // 正则命中目标
        let target: RegExpExecArray | null;
        try {
            // 抛出错误，获取函数调用栈信息
            throw new Error();
        } catch (err) {
            // 匹配函数调用者文件的路径
            target = regExp1.exec(err?.stack);
            // console.log('err.stack', err?.stack);
            // console.log(target?.[1]);
        }

        if (target?.[1]) {
            // 用户没有传入第二个参数，就使用自动获取的路径
            baseUrl = baseUrl || target?.[1];
        }

        if (!baseUrl) {
            // 用户没有传入第二个参数，且获取函数调用者文件的路径失败
            throw new Error('请传入第二个参数 import.meta.url');
        }
        // 返回处理后的资源路径
        return new URL(imgSrc, baseUrl).href;
    }
}