$(function() {
    var { form, layer } = layui;
    getUserInfo();
    // 退出
    $('#logout').on('click', function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });

    })

});
// 获取用户登录信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',

        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first)
    }
}