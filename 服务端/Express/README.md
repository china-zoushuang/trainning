# http 请求

## 请求报文格式

### 1. 请求行

- #### 请求方法：get, post...
- #### 请求 url
- #### 协议: HTTP1.1 / HTTP2

### 2. 请求头

- #### User-Agent：浏览器类型
- #### Accept-Language：客户端可接受的自然语言;
- #### Accept-Encoding：客户端可接受的编码压缩格式;
- #### Accept-Charset：可接受的应答的字符集;
- #### Accept-Range：Bytes: 可接受的 range 单位为字节
- #### Host：请求的主机名，允许多个域名同处一个 IP 地址，即虚拟主机;
- #### Connection：连接方式(close 或 keepalive);
- #### Cookie

### 3. 空行：发送回车符和换行符，通知服务器以下不再有请求头

### 4. 请求体：出现在 POST 请求中，例如表单提交的场景，包含 Content-type, Content-length

## 响应报文格式

### 1. 状态头

- #### Status Code：状态码

### 2. 响应头

- #### Location：重定向地址
- #### Connection: 连接方式

---

# 访问静态文件

```js
express.static(绝对路径);
```
