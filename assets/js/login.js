$(function(){
  var {form ,layer} = layui;
  $('#link_reg').on('click',function(){
    $('.login_box').hide();
    $('.reg_box').show();
  })
  $('#link_login').on('click',function(){
    $('.login_box').show();
    $('.reg_box').hide();
  })
  form.verify({
    pwd: [ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
    repwd:function(value){
      var pwd = $('.reg_box [name = password]').val();
      if(pwd!==value){
        return '两次密码不一致！'
      }
    }
  });
  //注册
  $('#form_reg').on('submit',function(e){
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/api/reguser',
      data:{
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password').val()
      },
      success:function(res){
        if(res.status!==0){
          return layer.msg('用户名被占用，请更换其他用户名！')
        }
        layer.msg('注册成功！')
        $('#link_login').click()
      }
    })
  })
  //登录
  $('#form_login').on('submit',function(e){
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/api/login',
      data:{
        username:$('#form_login [name=username]').val(),
        password:$('#form_login [name=password').val()
      },
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })
  })
})