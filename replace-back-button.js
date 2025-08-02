/**
 * 批量替换返回按钮为面包屑导航的脚本
 * 使用方法: node replace-back-button.js
 */

const fs = require('fs');
const path = require('path');

// 需要处理的模块目录
const modules = ['Zwgl', 'Zjgl', 'Rzgl', 'Rcgl', 'Pxgl', 'Jxgl'];

// 需要处理的文件类型
const fileTypes = ['.html'];

/**
 * 递归查找所有HTML文件
 */
function findHtmlFiles(dir) {
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                traverse(fullPath);
            } else if (fileTypes.includes(path.extname(item))) {
                files.push(fullPath);
            }
        }
    }
    
    traverse(dir);
    return files;
}

/**
 * 替换文件中的返回按钮为面包屑导航
 */
function replaceBackButton(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // 替换CSS引用
        if (content.includes('back-button.css')) {
            content = content.replace(/<link[^>]*back-button\.css[^>]*>/g, 
                '<link rel="stylesheet" href="../breadcrumb.css">');
            modified = true;
        }
        
        // 删除返回按钮HTML
        if (content.includes('class="back-button"')) {
            content = content.replace(/<a[^>]*class="back-button"[^>]*>.*?<\/a>/g, '');
            modified = true;
        }
        
        // 添加面包屑JavaScript引用
        if (!content.includes('breadcrumb.js') && !content.includes('index.html')) {
            // 在最后一个script标签之前添加面包屑脚本
            const scriptRegex = /(<script[^>]*>.*?<\/script>)/gs;
            const scripts = content.match(scriptRegex);
            
            if (scripts && scripts.length > 0) {
                const lastScript = scripts[scripts.length - 1];
                const breadcrumbScript = '    <script src="../breadcrumb.js"></script>';
                content = content.replace(lastScript, breadcrumbScript + '\n' + lastScript);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ 已更新: ${filePath}`);
            return true;
        } else {
            console.log(`⏭️  无需更新: ${filePath}`);
            return false;
        }
        
    } catch (error) {
        console.error(`❌ 处理文件失败: ${filePath}`, error.message);
        return false;
    }
}

/**
 * 主函数
 */
function main() {
    console.log('🚀 开始批量替换返回按钮为面包屑导航...\n');
    
    let totalFiles = 0;
    let updatedFiles = 0;
    
    // 处理每个模块目录
    for (const module of modules) {
        const modulePath = path.join(__dirname, module);
        
        if (fs.existsSync(modulePath)) {
            console.log(`📁 处理模块: ${module}`);
            
            const htmlFiles = findHtmlFiles(modulePath);
            totalFiles += htmlFiles.length;
            
            for (const file of htmlFiles) {
                if (replaceBackButton(file)) {
                    updatedFiles++;
                }
            }
            
            console.log(`   找到 ${htmlFiles.length} 个HTML文件\n`);
        } else {
            console.log(`⚠️  模块目录不存在: ${module}\n`);
        }
    }
    
    console.log('📊 处理完成!');
    console.log(`   总文件数: ${totalFiles}`);
    console.log(`   更新文件数: ${updatedFiles}`);
    console.log(`   跳过文件数: ${totalFiles - updatedFiles}`);
    
    console.log('\n📝 下一步操作:');
    console.log('1. 确保 breadcrumb.css 和 breadcrumb.js 文件已创建');
    console.log('2. 测试各个页面的面包屑导航功能');
    console.log('3. 删除不再需要的 back-button.css 文件');
    console.log('4. 根据需要调整面包屑样式和功能');
}

// 运行脚本
if (require.main === module) {
    main();
}

module.exports = { replaceBackButton, findHtmlFiles }; 