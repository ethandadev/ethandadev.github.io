/**
 * 编程学院 - 我的课程仪表盘
 * 管理已报名课程、学习进度和统计数据
 */

// ==================== 工具函数 ====================

/**
 * 格式化日期为中文格式：YYYY年MM月DD日
 * @param {string} dateStr - 日期字符串
 * @returns {string} 格式化后的中文日期
 */
const formatDateChinese = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        // 如果日期无效，返回当前日期
        const now = new Date();
        return `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, '0')}月${String(now.getDate()).padStart(2, '0')}日`;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
};

/**
 * 生成一个合理范围内的随机学习时长
 * @param {number} enrollmentCount - 报名课程数量
 * @returns {number} 随机学习时长（小时）
 */
const generateStudyHours = (enrollmentCount) => {
    if (enrollmentCount === 0) return 0;
    // 每门课程平均 5-20 小时的学习时长
    const minHours = enrollmentCount * 5;
    const maxHours = enrollmentCount * 20;
    return Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours;
};

/**
 * 生成随机学习进度（0-30%）
 * @returns {number} 随机进度百分比
 */
const generateRandomProgress = () => {
    return Math.floor(Math.random() * 31); // 0 到 30
};

// ==================== Toast 通知系统 ====================

/**
 * 显示 Toast 通知
 * @param {string} message - 通知消息内容
 * @param {string} type - 通知类型：'success' | 'error' | 'info'
 * @param {number} duration - 显示时长（毫秒），默认 3000
 */
const showToast = (message, type = 'info', duration = 3000) => {
    // 获取或创建 toast 容器
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // 根据类型选择图标
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    const icon = icons[type] || icons.info;

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="关闭通知">&times;</button>
    `;

    // 添加关闭按钮事件
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('toast-hide');
        toast.addEventListener('animationend', () => toast.remove());
    });

    // 插入到容器中
    toastContainer.appendChild(toast);

    // 触发显示动画
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });

    // 自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('toast-hide');
            toast.addEventListener('animationend', () => {
                if (toast.parentNode) toast.remove();
            });
        }
    }, duration);
};

// ==================== 导航栏功能 ====================

/**
 * 初始化移动端菜单切换
 */
const initMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        // 切换按钮图标
        const isOpen = navLinks.classList.contains('nav-open');
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
    });

    // 点击导航链接后自动关闭菜单
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-label', '打开菜单');
        });
    });
};

/**
 * 初始化导航栏滚动效果
 * 滚动时添加阴影和背景变化
 */
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    // 使用节流优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 页面加载时也检查一次
    handleScroll();
};

// ==================== 仪表盘核心功能 ====================

/**
 * 从 localStorage 加载报名数据
 * @returns {Array} 报名课程数组
 */
const loadEnrollments = () => {
    try {
        const data = localStorage.getItem('enrollments');
        if (!data) return [];
        const enrollments = JSON.parse(data);
        return Array.isArray(enrollments) ? enrollments : [];
    } catch (error) {
        console.error('读取报名数据失败：', error);
        return [];
    }
};

/**
 * 更新统计卡片数据
 * @param {Array} enrollments - 报名课程数组
 */
const updateStats = (enrollments) => {
    const enrolledCountEl = document.getElementById('enrolledCount');
    const studyHoursEl = document.getElementById('studyHours');
    const completedCountEl = document.getElementById('completedCount');
    const certCountEl = document.getElementById('certCount');

    const count = enrollments.length;

    // 使用动画递增效果更新数字
    animateCounter(enrolledCountEl, count);
    animateCounter(studyHoursEl, generateStudyHours(count));
    animateCounter(completedCountEl, 0);
    animateCounter(certCountEl, 0);
};

/**
 * 数字递增动画效果
 * @param {HTMLElement} element - 目标元素
 * @param {number} target - 目标数值
 */
const animateCounter = (element, target) => {
    if (!element) return;

    if (target === 0) {
        element.textContent = '0';
        return;
    }

    const duration = 800; // 动画持续时间（毫秒）
    const startTime = performance.now();
    const startValue = 0;

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数让动画更自然
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    };

    requestAnimationFrame(update);
};

/**
 * 创建单个课程卡片
 * @param {Object} enrollment - 报名数据对象
 * @param {number} index - 索引
 * @returns {HTMLElement} 课程卡片元素
 */
const createCourseCard = (enrollment, index) => {
    const card = document.createElement('div');
    card.className = 'enrolled-course-card';

    // 生成随机进度
    const progress = generateRandomProgress();

    // 格式化报名日期
    const enrollDate = formatDateChinese(enrollment.date || enrollment.enrollDate || new Date().toISOString());

    // 获取课程信息
    const courseName = enrollment.courseName || enrollment.name || '未知课程';
    const price = enrollment.price != null ? enrollment.price : '免费';
    const priceDisplay = typeof price === 'number' ? `¥${price}` : (price === 0 ? '免费' : price);

    // 根据进度确定状态文字
    let statusText = '学习中';
    let statusClass = 'status-learning';
    if (progress === 0) {
        statusText = '未开始';
        statusClass = 'status-not-started';
    }

    card.innerHTML = `
        <div class="enrolled-course-info">
            <div class="enrolled-course-header">
                <h3 class="enrolled-course-name">${courseName}</h3>
                <span class="enrolled-course-status ${statusClass}">${statusText}</span>
            </div>
            <div class="enrolled-course-meta">
                <span class="meta-item">📅 报名时间：${enrollDate}</span>
                <span class="meta-item">💰 支付金额：${priceDisplay}</span>
            </div>
            <div class="enrolled-course-progress">
                <div class="progress-header">
                    <span class="progress-label">学习进度</span>
                    <span class="progress-value">${progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%" data-progress="${progress}"></div>
                </div>
            </div>
        </div>
        <div class="enrolled-course-actions">
            <button class="btn btn-primary btn-continue" data-index="${index}">继续学习</button>
        </div>
    `;

    // 点击"继续学习"按钮
    const continueBtn = card.querySelector('.btn-continue');
    continueBtn.addEventListener('click', () => {
        showToast(`正在进入「${courseName}」课程...`, 'info');
    });

    return card;
};

/**
 * 渲染已报名课程列表
 * @param {Array} enrollments - 报名课程数组
 */
const renderEnrollments = (enrollments) => {
    const coursesContainer = document.getElementById('enrolledCourses');
    const emptyState = document.getElementById('emptyState');

    if (!coursesContainer || !emptyState) return;

    if (enrollments.length === 0) {
        // 没有报名课程，显示空状态
        coursesContainer.style.display = 'none';
        emptyState.style.display = 'flex';
        return;
    }

    // 有报名课程，显示列表，隐藏空状态
    coursesContainer.style.display = 'block';
    emptyState.style.display = 'none';

    // 清空容器
    coursesContainer.innerHTML = '';

    // 创建并插入每个课程卡片
    enrollments.forEach((enrollment, index) => {
        const card = createCourseCard(enrollment, index);
        coursesContainer.appendChild(card);
    });

    // 延迟触发进度条动画
    requestAnimationFrame(() => {
        setTimeout(() => {
            const progressFills = coursesContainer.querySelectorAll('.progress-fill');
            progressFills.forEach((fill) => {
                const targetProgress = fill.getAttribute('data-progress');
                fill.style.width = `${targetProgress}%`;
            });
        }, 100);
    });
};

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航栏功能
    initMobileMenu();
    initNavbarScroll();

    // 加载报名数据
    const enrollments = loadEnrollments();

    // 更新统计数据
    updateStats(enrollments);

    // 渲染课程列表
    renderEnrollments(enrollments);

    // 如果有报名数据，显示欢迎通知
    if (enrollments.length > 0) {
        setTimeout(() => {
            showToast(`欢迎回来！您已报名 ${enrollments.length} 门课程，继续加油！`, 'success');
        }, 500);
    }
});
