/**
 * 面包屑导航组件
 * 支持动态生成导航路径，自动识别当前页面位置
 */
class BreadcrumbNavigation {
    constructor(options = {}) {
        this.options = {
            container: '.breadcrumb-container',
            homeText: '首页',
            homeUrl: '../index.html',
            homeIcon: '🏠',
            separator: '›',
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createBreadcrumb();
        this.generateBreadcrumb();
    }
    
    /**
     * 创建面包屑容器
     */
    createBreadcrumb() {
        // 检查是否已存在面包屑容器
        if (document.querySelector(this.options.container)) {
            return;
        }
        
        const breadcrumbContainer = document.createElement('div');
        breadcrumbContainer.className = 'breadcrumb-container';
        breadcrumbContainer.id = 'breadcrumb-nav';
        
        document.body.appendChild(breadcrumbContainer);
    }
    
    /**
     * 生成面包屑导航
     */
    generateBreadcrumb() {
        const container = document.querySelector(this.options.container);
        if (!container) return;
        
        const breadcrumbs = this.getBreadcrumbData();
        container.innerHTML = this.renderBreadcrumb(breadcrumbs);
    }
    
    /**
     * 获取面包屑数据
     */
    getBreadcrumbData() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        const breadcrumbs = [
            {
                text: this.options.homeText,
                url: this.options.homeUrl,
                icon: this.options.homeIcon,
                type: 'home'
            }
        ];
        
        // 过滤掉项目目录名，只保留模块和页面
        const relevantSegments = this.filterRelevantSegments(pathSegments);
        
        // 确保有相关的模块段
        if (relevantSegments.length >= 2) {
            const moduleSegment = relevantSegments[0]; // 第一个应该是模块目录
            const pageSegment = relevantSegments[1];   // 第二个应该是页面文件
            
            if (this.isModuleDirectory(moduleSegment) && pageSegment.includes('.')) {
                const fileName = pageSegment.split('.')[0];
                
                if (this.isModuleHomePage(fileName)) {
                    // 模块主页：只显示模块名
                    const moduleName = this.getModuleName(fileName);
                    breadcrumbs.push({
                        text: moduleName,
                        url: `${pageSegment}`,
                        icon: this.getModuleIcon(fileName),
                        type: 'module',
                        isActive: true
                    });
                } else {
                    // 子页面：显示模块名 + 页面名
                    const moduleName = fileName.split('-')[0];
                    const pageName = this.getPageName(fileName);
                    
                    // 添加模块名
                    breadcrumbs.push({
                        text: this.getModuleName(moduleName),
                        url: `${moduleSegment}.html`,
                        icon: this.getModuleIcon(moduleName),
                        type: 'module',
                        isActive: false
                    });
                    
                    // 添加页面名
                    breadcrumbs.push({
                        text: pageName,
                        url: `${pageSegment}`,
                        icon: this.getPageIcon(fileName),
                        type: 'page',
                        isActive: true
                    });
                }
            }
        }
        
        return breadcrumbs;
    }
    
    /**
     * 过滤相关路径段，移除项目目录名
     */
    filterRelevantSegments(pathSegments) {
        // 项目目录名列表（需要过滤掉的）
        const projectDirs = ['a_hr_project', 'hr_project', 'project'];
        
        // 过滤掉项目目录名，只保留模块和页面
        return pathSegments.filter(segment => {
            // 如果是项目目录名，则过滤掉
            if (projectDirs.includes(segment)) {
                return false;
            }
            
            // 如果是模块目录或页面文件，则保留
            return this.isModuleDirectory(segment) || this.isPageFile(segment);
        });
    }
    
    /**
     * 判断是否为模块目录
     */
    isModuleDirectory(segment) {
        const modules = ['Zwgl', 'Zjgl', 'Rzgl', 'Rcgl', 'Pxgl', 'Jxgl'];
        return modules.includes(segment);
    }
    
    /**
     * 判断是否为页面文件
     */
    isPageFile(segment) {
        return segment.includes('.html') || segment.includes('.htm');
    }
    
    /**
     * 判断是否为模块主页
     */
    isModuleHomePage(fileName) {
        const moduleHomePages = ['Zwgl', 'Zjgl', 'Rzgl', 'Rcgl', 'Pxgl', 'Jxgl'];
        return moduleHomePages.includes(fileName);
    }
    

    
    /**
     * 获取模块名称
     */
    getModuleName(modulePath) {
        const moduleNames = {
            'Zwgl': '职位管理',
            'Zjgl': '职级管理',
            'Rzgl': '认证管理',
            'Rcgl': '人才管理',
            'Pxgl': '培训管理',
            'Jxgl': '绩效管理'
        };
        
        return moduleNames[modulePath] || modulePath;
    }
    
    /**
     * 获取页面名称
     */
    getPageName(fileName) {
        const pageNames = {
            'Zwgl': '职位管理',
            'Zwgl-page1': '职位竞聘流程',
            'Zwgl-page2': '职位调整流程',
            'Zwgl-page3': '试岗考评',
            'Zjgl': '职级管理',
            'Zjgl-page1': '聘任后个人职级的套入',
            'Zjgl-page2': '标准化职级晋升',
            'Zjgl-page3': '大带宽职级晋升',
            'Rzgl': '认证管理',
            'Rzgl-page1': '认证报名',
            'Rzgl-page2': '组织开始',
            'Rzgl-page3': '认证成绩',
            'Pxgl': '培训管理',
            'Pxgl-page1': '制定计划',
            'Pxgl-page2': '培训开展',
            'Pxgl-page3': '需求收集',
            'Pxgl-page4': '内训开展',
            'Jxgl': '绩效管理',
            'Rcgl': '人才管理',
            'Rcgl-page1': '人才选聘',
            'Rcgl-page2': '履职管理'
        };
        
        return pageNames[fileName] || fileName;
    }
    
    /**
     * 获取模块图标
     */
    getModuleIcon(modulePath) {
        const moduleIcons = {
            'Zwgl': '💼',
            'Zjgl': '⭐',
            'Rzgl': '🔐',
            'Rcgl': '👥',
            'Pxgl': '📚',
            'Jxgl': '📊'
        };
        
        return moduleIcons[modulePath] || '📁';
    }
    
    /**
     * 获取页面图标
     */
    getPageIcon(fileName) {
        const pageIcons = {
            'Zwgl-page1': '🎯',
            'Zwgl-page2': '🔄',
            'Zwgl-page3': '📋',
            'Zjgl-page1': '📈',
            'Zjgl-page2': '⚙️',
            'Zjgl-page3': '🔄',
            'Pxgl-page1': '📅',
            'Pxgl-page2': '🎓',
            'Pxgl-page3': '📊',
            'Pxgl-page4': '📁',
            'Rzgl-page1': '📝',
            'Rzgl-page2': '🚀',
            'Rzgl-page3': '📊',
            'Rcgl-page1': '👥',
            'Rcgl-page2': '📋'
        };
        
        return pageIcons[fileName] || '📄';
    }
    
    /**
     * 渲染面包屑HTML
     */
    renderBreadcrumb(breadcrumbs) {
        let html = '';
        
        breadcrumbs.forEach((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isActive = item.isActive || isLast;
            
            html += `
                <a href="${item.url}" class="breadcrumb-item ${isActive ? 'active' : ''}" title="${item.text}">
                    <span class="breadcrumb-icon breadcrumb-${item.type}">${item.icon}</span>
                    <span class="breadcrumb-text">${item.text}</span>
                </a>
            `;
            
            if (!isLast) {
                html += `<span class="breadcrumb-separator">${this.options.separator}</span>`;
            }
        });
        
        return html;
    }
    
    /**
     * 手动设置面包屑数据
     */
    setBreadcrumb(breadcrumbs) {
        const container = document.querySelector(this.options.container);
        if (!container) return;
        
        container.innerHTML = this.renderBreadcrumb(breadcrumbs);
    }
    
    /**
     * 更新面包屑
     */
    update() {
        this.generateBreadcrumb();
    }
    
    /**
     * 销毁面包屑
     */
    destroy() {
        const container = document.querySelector(this.options.container);
        if (container) {
            container.remove();
        }
    }
}

/**
 * 自动初始化面包屑导航
 */
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在子页面中，并且是模块页面
    const currentPath = window.location.pathname;
    const isModulePage = /\/[A-Z][a-z]{3}\//.test(currentPath); // 匹配模块目录如 /Zwgl/
    
    if (isModulePage) {
        window.breadcrumbNav = new BreadcrumbNavigation();
    }
});

/**
 * 页面切换时更新面包屑
 */
window.addEventListener('popstate', function() {
    if (window.breadcrumbNav) {
        window.breadcrumbNav.update();
    }
});

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreadcrumbNavigation;
} 