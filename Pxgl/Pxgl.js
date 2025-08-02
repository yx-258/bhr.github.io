document.addEventListener('DOMContentLoaded', () => {
    // 获取当前页面的文件名，例如 "Pxgl-page1.html"
    const currentFileName = window.location.pathname.split('/').pop();

    // 导航链接活跃状态高亮
    // 遍历所有导航链接（包括一级和二级）
    document.querySelectorAll('.nav-link').forEach(link => {
        // 清除所有 active 状态，确保每次只高亮当前页面
        link.classList.remove('active');

        // 如果链接的 href 属性与当前文件名匹配，则高亮
        if (link.getAttribute('href') === currentFileName) {
            link.classList.add('active'); // 高亮当前点击的二级导航链接

            // 额外：如果二级导航被高亮，则其对应的一级导航也应该被高亮
            const parentLi = link.closest('.nav-item');
            if (parentLi && parentLi.parentNode.classList.contains('submenu')) { // 确保是二级导航项
                const topLevelNavItem = parentLi.closest('.nav-menu > .nav-item');
                if (topLevelNavItem) {
                    const topLevelNavLink = topLevelNavItem.querySelector('.nav-link');
                    if (topLevelNavLink) {
                        topLevelNavLink.classList.add('active');
                    }
                }
            }
        }
    });

    // 为一级导航添加点击阻止默认行为（因为它们不再用于页面跳转，只是父级分类）
    // 如果你希望一级导航点击后没有任何视觉反馈，这行可以不加。
    // 如果希望点击一级导航时也有一个高亮效果（但无跳转），可以给它加 active 类
    document.querySelectorAll('.nav-menu > .nav-item > .nav-link').forEach(firstLevelLink => {
        if (firstLevelLink.getAttribute('href') === '#') { // 如果一级导航链接是 #
            firstLevelLink.addEventListener('click', function(e) {
                e.preventDefault(); // 阻止默认的链接跳转行为
            });
        }
    });
});