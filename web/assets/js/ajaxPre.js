// 每次发起$.ajax或$.post或$.get请求之前，都会先调用$.ajaxPrefilter
// $.ajaxPrefilter的options 参数时 $.ajax或$.post或$.get的对象
$.ajaxPrefilter(function(options) {
    if (options.url.startsWith('/my')) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }

        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.msg === '身份认证失败') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    }

    options.url = 'http://127.0.0.1:3007' + options.url
})
/* 这段代码是一个jQuery的AJAX预过滤器。它的作用是，在所有的AJAX请求发送之前，对请求进行一些预处理操作。

首先，代码通过options.url.startsWith('/my')判断请求的URL是否以/my开头。如果是，说明这个请求是属于自己的用户相关接口。

接下来，代码设置了请求头Authorization，使用了localStorage中存储的令牌（token），或者一个空字符串。这是为了在发送请求时携带身份认证信息。

然后，代码设置了一个options.complete回调函数。当请求完成后，这个回调会被触发。在回调函数中，代码判断响应的JSON数据中的status和msg，以判断身份认证是否失败。如果失败，代码会删除localStorage中的令牌，
并将页面重定向到登录页面/login.html。

最后，代码将请求的URL修改为http://127.0.0.1:3007加上原始的URL。这是为了将请求转发到本地的服务器。

 */