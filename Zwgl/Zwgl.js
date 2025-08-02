document.addEventListener('DOMContentLoaded', function() {
    // 高亮当前页面导航项
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'Zwgl.html';
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        // 添加点击效果
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 添加导航项悬停效果
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // 添加卡片悬停效果
    const workflowSections = document.querySelectorAll('.workflow-section');
    workflowSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.12)';
            this.querySelector('.section-icon').style.transform = 'scale(1.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            this.querySelector('.section-icon').style.transform = 'scale(1)';
        });
    });
    
    // 返回上一级功能（修复版）
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            history.back();
        });
    }
});