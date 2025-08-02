/**
 * 面包屑导航调试版本
 * 用于测试和验证面包屑逻辑
 */
class BreadcrumbNavigationDebug extends BreadcrumbNavigation {
    constructor(options = {}) {
        super(options);
        this.debug = true;
    }
    
    getBreadcrumbData() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        console.log('🔍 调试信息:');
        console.log('当前路径:', currentPath);
        console.log('路径段:', pathSegments);
        
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
        console.log('相关段:', relevantSegments);
        
        // 确保有相关的模块段
        if (relevantSegments.length >= 2) {
            const moduleSegment = relevantSegments[0]; // 第一个应该是模块目录
            const pageSegment = relevantSegments[1];   // 第二个应该是页面文件
            console.log('模块段:', moduleSegment, '页面段:', pageSegment);
            
            if (this.isModuleDirectory(moduleSegment) && pageSegment.includes('.')) {
                const fileName = pageSegment.split('.')[0];
                console.log('文件名:', fileName);
                
                if (this.isModuleHomePage(fileName)) {
                    // 模块主页：只显示模块名
                    const moduleName = this.getModuleName(fileName);
                    console.log('模块主页:', moduleName);
                    breadcrumbs.push({
                        text: moduleName,
                        url: `${moduleSegment}/${pageSegment}`,
                        icon: this.getModuleIcon(fileName),
                        type: 'module',
                        isActive: true
                    });
                } else {
                    // 子页面：显示模块名 + 页面名
                    const moduleName = fileName.split('-')[0];
                    const pageName = this.getPageName(fileName);
                    console.log('子页面 - 模块:', moduleName, '页面:', pageName);
                    
                    // 添加模块名
                    breadcrumbs.push({
                        text: this.getModuleName(moduleName),
                        url: `${moduleSegment}/${moduleName}.html`,
                        icon: this.getModuleIcon(moduleName),
                        type: 'module',
                        isActive: false
                    });
                    
                    // 添加页面名
                    breadcrumbs.push({
                        text: pageName,
                        url: `${moduleSegment}/${pageSegment}`,
                        icon: this.getPageIcon(fileName),
                        type: 'page',
                        isActive: true
                    });
                }
            } else {
                console.log('不是有效的模块页面');
            }
        } else {
            console.log('相关段数量不足，不是模块页面');
        }
        
        console.log('最终面包屑:', breadcrumbs);
        return breadcrumbs;
    }
}

// 在测试页面中使用调试版本
if (window.location.pathname.includes('test-breadcrumb.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        window.breadcrumbNav = new BreadcrumbNavigationDebug();
    });
} 