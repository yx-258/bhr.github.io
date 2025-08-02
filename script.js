// 页面脚本文件

// 登录功能
function login() {
    // 保存登录状态到 sessionStorage
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // 隐藏登录界面
    document.getElementById('loginSection').classList.add('hide');
    
    // 显示主页面
    const mainContent = document.getElementById('mainContent');
    mainContent.classList.add('show');
    
    // 添加淡入效果
    setTimeout(() => {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        requestAnimationFrame(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        });
    }, 100);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 页面加载时的初始化
document.addEventListener('DOMContentLoaded', function () {
    // 检查是否已经登录过
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn) {
        // 如果已经登录，直接显示主页面，隐藏登录界面
        document.getElementById('loginSection').classList.add('hide');
        document.getElementById('mainContent').classList.add('show');
    }
    
    // 延迟一帧后开始淡入
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });
});
