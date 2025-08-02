/**
 * 职级管理系统 - JavaScript交互功能 (简化版本)
 * 主要功能: 导航激活状态管理、页面动画
 */

// ============================================
// 页面加载完成后初始化
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航激活状态
    initNavigation();
    // 初始化页面动画
    initAnimations();
    console.log('职级管理系统初始化完成');
});

// ============================================
// 导航菜单交互功能
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 页面加载时高亮当前页面对应的导航项
    highlightCurrentPage();
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有active类
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
            
            // 如果链接指向当前页面，阻止默认跳转
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === window.location.pathname.split('/').pop()) {
                e.preventDefault();
            }
        });
    });
}

// ============================================
// 高亮当前页面对应的导航项
// ============================================
function highlightCurrentPage() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPagePath = window.location.pathname.split('/').pop(); // 获取当前页面的文件名
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // 如果链接的href和当前页面的文件名匹配，则添加active类
        if (linkHref === currentPagePath) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 初始化页面动画效果
// ============================================
function initAnimations() {
    // 为职级管理卡片添加进入动画
    const jobSections = document.querySelectorAll('.job-section');
    
    // 使用Intersection Observer实现滚动触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                // 一旦动画触发，可以取消观察，避免重复触发
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // 当元素10%可见时触发
    });
    
    // 初始化卡片状态并观察
    jobSections.forEach((section, index) => {
        section.style.transform = 'translateY(30px)';
        section.style.opacity = '0';
        section.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(section);
    });
}

// ============================================
// 工具函数 - 防抖处理
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 响应式处理 - 窗口大小变化时的适配
// ============================================
window.addEventListener('resize', debounce(function() {
    // 检查是否为移动端
    const isMobile = window.innerWidth <= 576;
    const isTablet = window.innerWidth <= 992;
    
    // 根据屏幕尺寸调整布局
    if (isMobile) {
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-layout');
    } else {
        document.body.classList.remove('tablet-layout');
    }
}, 250));