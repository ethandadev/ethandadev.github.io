/**
 * settings.js - Core Settings Engine
 *
 * Programming Course Enrollment Website
 * Supports dark/light theme modes and English/Chinese language switching.
 *
 * This file MUST be loaded BEFORE app.js and dashboard.js in all HTML pages.
 * No external dependencies required.
 */

// =============================================================================
// 1. Translation Dictionary
// =============================================================================

const translations = {
    zh: {
        // Nav
        'nav.home': '首页',
        'nav.courses': '课程中心',
        'nav.dashboard': '我的课程',
        'nav.about': '关于我们',

        // Hero
        'hero.title': '掌握编程技能，开启无限可能',
        'hero.subtitle': '从零基础到专业开发者，我们提供最前沿的编程课程，助您在数字时代脱颖而出。加入数万名学员，一起用代码改变世界！',
        'hero.cta': '浏览课程',

        // Courses section
        'courses.title': '精选课程',
        'courses.subtitle': '为您精心挑选的热门编程课程，由业界资深讲师授课',
        'courses.enroll': '立即报名',
        'courses.enrolled': '人已报名',

        // Course names
        'course.python': 'Python 编程入门',
        'course.java': 'Java 高级开发',
        'course.frontend': '前端开发实战',
        'course.dsa': '数据结构与算法',
        'course.ai': '人工智能基础',
        'course.fullstack': 'Web 全栈开发',
        'course.react': 'React 框架精讲',
        'course.data': '数据分析与可视化',
        'course.go': 'Go 语言实战',
        'course.ml': '机器学习进阶',
        'course.cpp': 'C++ 系统编程',
        'course.sql': 'SQL 数据库入门',

        // Difficulty tags
        'level.beginner': '入门',
        'level.intermediate': '中级',
        'level.advanced': '高级',

        // Features section
        'features.title': '为什么选择我们',
        'features.subtitle': '我们致力于为每一位学员提供最优质的编程学习体验',
        'feature.teachers.title': '专业师资',
        'feature.teachers.desc': '所有讲师均来自一线互联网企业，拥有丰富的实战经验',
        'feature.projects.title': '实战项目',
        'feature.projects.desc': '每门课程都包含真实项目实践，学以致用',
        'feature.lifetime.title': '终身学习',
        'feature.lifetime.desc': '一次购买，永久访问课程内容及后续更新',
        'feature.career.title': '就业保障',
        'feature.career.desc': '提供就业指导和推荐，助力职业发展',

        // Stats
        'stats.students': '学员',
        'stats.courses': '课程',
        'stats.rating': '好评率',
        'stats.partners': '合作企业',

        // Footer
        'footer.about': '编程学院是国内领先的在线编程教育平台，致力于为学员提供高质量、体系化的编程课程，帮助每一位学习者实现技术梦想。',
        'footer.quicklinks': '快速链接',
        'footer.contact': '联系我们',
        'footer.follow': '关注我们',
        'footer.subscribe.label': '订阅我们的最新动态',
        'footer.subscribe.placeholder': '请输入您的邮箱',
        'footer.subscribe.btn': '订阅',
        'footer.home': '首页',
        'footer.courses': '课程中心',
        'footer.path': '学习路径',
        'footer.team': '师资团队',
        'footer.faq': '常见问题',
        'footer.email': '📧 邮箱：contact@codingacademy.cn',
        'footer.phone': '📞 电话：400-888-9999',
        'footer.address': '📍 地址：北京市海淀区中关村科技园',
        'footer.hours': '🕐 工作时间：周一至周五 9:00 - 18:00',
        'footer.copyright': '© 2024 编程学院 版权所有 | 京ICP备XXXXXXXX号-1 | 京公网安备XXXXXXXXXXXXXX号',

        // Courses page
        'coursespage.title': '课程中心',
        'coursespage.subtitle': '探索我们的精品课程，找到适合你的学习路径',
        'filter.search': '搜索课程...',
        'filter.allcategory': '全部分类',
        'filter.programming': '编程语言',
        'filter.frontend': '前端开发',
        'filter.backend': '后端开发',
        'filter.datascience': '数据科学',
        'filter.ai': '人工智能',
        'filter.alllevel': '全部难度',
        'filter.beginner': '入门',
        'filter.intermediate': '中级',
        'filter.advanced': '高级',
        'filter.defaultsort': '默认排序',
        'filter.newest': '最新发布',
        'filter.priceasc': '价格从低到高',
        'filter.pricedesc': '价格从高到低',
        'filter.ratingfirst': '好评优先',
        'pagination.prev': '上一页',
        'pagination.next': '下一页',

        // Dashboard page
        'dashboard.title': '我的课程',
        'dashboard.subtitle': '管理您的学习进度，查看已报名的课程',
        'dashboard.enrolled': '已报名课程',
        'dashboard.hours': '学习时长',
        'dashboard.completed': '完成课程',
        'dashboard.certs': '获得证书',
        'dashboard.unit.courses': '门',
        'dashboard.unit.hours': '小时',
        'dashboard.unit.certs': '个',
        'dashboard.enrolledtitle': '已报名课程',
        'dashboard.empty.icon': '📚',
        'dashboard.empty.title': '您还没有报名任何课程',
        'dashboard.empty.subtitle': '快去课程中心看看吧',
        'dashboard.empty.btn': '去选课',
        'dashboard.continue': '继续学习',
        'dashboard.progress': '学习进度',
        'dashboard.enrolldate': '报名时间',
        'dashboard.paid': '支付金额',

        // About page
        'about.title': '关于我们',
        'about.subtitle': '了解编程学院的故事、使命与愿景',
        'about.story.title': '我们的故事',
        'about.story.p1': '编程学院成立于2018年，由一群热爱编程教育的工程师创立。我们相信，编程不仅是一项技能，更是一种思维方式。通过高质量的课程内容和创新的教学方法，我们已经帮助超过50,000名学员实现了他们的技术梦想。',
        'about.story.p2': '我们的课程涵盖从入门到高级的各个层次，包括Python、Java、前端开发、人工智能等热门方向。每一门课程都经过精心设计，结合理论讲解与实战项目，确保学员能够学以致用。',
        'about.stats.students': '学员人数',
        'about.stats.courses': '精品课程',
        'about.stats.rating': '好评率',
        'about.stats.years': '教学经验',
        'about.mission.title': '我们的使命',
        'about.mission.mission': '使命',
        'about.mission.mission.desc': '让每个人都能通过编程实现自己的创意和梦想',
        'about.mission.vision': '愿景',
        'about.mission.vision.desc': '成为全球最受信赖的在线编程教育平台',
        'about.mission.values': '价值观',
        'about.mission.values.desc': '专业、创新、包容、共赢',
        'about.team.title': '核心团队',
        'about.team.zhang.name': '张明',
        'about.team.zhang.role': '创始人兼CEO',
        'about.team.zhang.bio': '前阿里巴巴高级工程师，10年编程教育经验',
        'about.team.li.name': '李华',
        'about.team.li.role': '技术总监',
        'about.team.li.bio': '前腾讯技术专家，精通Java和分布式系统',
        'about.team.wang.name': '王芳',
        'about.team.wang.role': '教学总监',
        'about.team.wang.bio': '北京大学计算机博士，专注前端技术研究',
        'about.team.chen.name': '陈伟',
        'about.team.chen.role': '课程设计师',
        'about.team.chen.bio': '前百度算法工程师，ACM金牌获得者',
        'about.contact.title': '联系我们',
        'about.contact.email': 'contact@codingacademy.cn',
        'about.contact.phone': '400-888-9999',
        'about.contact.address': '北京市海淀区中关村科技园',
        'about.contact.form.name': '姓名',
        'about.contact.form.name.placeholder': '请输入您的姓名',
        'about.contact.form.email': '邮箱',
        'about.contact.form.email.placeholder': '请输入您的邮箱',
        'about.contact.form.message': '留言',
        'about.contact.form.message.placeholder': '请输入您的留言内容...',
        'about.contact.form.submit': '提交',

        // Settings panel
        'settings.title': '设置',
        'settings.theme': '主题模式',
        'settings.theme.light': '浅色',
        'settings.theme.dark': '深色',
        'settings.theme.auto': '跟随系统',
        'settings.lang': '语言',
        'settings.lang.zh': '中文',
        'settings.lang.en': 'English',

        // Modal / Enrollment
        'modal.title': '课程报名',
        'modal.name': '姓名',
        'modal.name.placeholder': '请输入您的姓名',
        'modal.phone': '手机号',
        'modal.phone.placeholder': '请输入您的手机号',
        'modal.email': '邮箱',
        'modal.email.placeholder': '请输入您的邮箱',
        'modal.level': '学习基础',
        'modal.level.placeholder': '请选择您的编程基础',
        'modal.level.zero': '零基础',
        'modal.level.beginner': '有一定基础',
        'modal.level.intermediate': '中级水平',
        'modal.level.advanced': '高级水平',
        'modal.price': '课程费用：',
        'modal.submit': '确认报名',
        'modal.success.title': '报名成功！',
        'modal.success.msg1': '恭喜您成功报名',
        'modal.success.msg2': '我们将在24小时内通过邮件发送课程详情',
        'modal.success.ok': '确定',

        // Toast messages
        'toast.subscribe.success': '订阅成功！感谢您的关注',
        'toast.subscribe.error': '请输入有效的邮箱地址',
        'toast.enroll.success': '报名成功！欢迎加入编程学院',
        'toast.name.required': '请输入您的姓名',
        'toast.phone.required': '请输入您的手机号',
        'toast.phone.invalid': '请输入有效的手机号码',
        'toast.email.required': '请输入您的邮箱',
        'toast.email.invalid': '请输入有效的邮箱地址',
        'toast.level.required': '请选择您的编程基础',
    },

    en: {
        // Nav
        'nav.home': 'Home',
        'nav.courses': 'Courses',
        'nav.dashboard': 'My Courses',
        'nav.about': 'About Us',

        // Hero
        'hero.title': 'Master Programming, Unlock Possibilities',
        'hero.subtitle': 'From beginner to professional developer, we offer cutting-edge programming courses to help you stand out in the digital age. Join tens of thousands of students and change the world with code!',
        'hero.cta': 'Browse Courses',

        // Courses section
        'courses.title': 'Featured Courses',
        'courses.subtitle': 'Handpicked popular programming courses taught by industry experts',
        'courses.enroll': 'Enroll Now',
        'courses.enrolled': 'enrolled',

        // Course names
        'course.python': 'Python for Beginners',
        'course.java': 'Advanced Java Development',
        'course.frontend': 'Frontend Development',
        'course.dsa': 'Data Structures & Algorithms',
        'course.ai': 'AI Fundamentals',
        'course.fullstack': 'Full-Stack Web Dev',
        'course.react': 'React Framework Mastery',
        'course.data': 'Data Analysis & Visualization',
        'course.go': 'Go Language in Practice',
        'course.ml': 'Advanced Machine Learning',
        'course.cpp': 'C++ Systems Programming',
        'course.sql': 'SQL Database Basics',

        // Difficulty tags
        'level.beginner': 'Beginner',
        'level.intermediate': 'Intermediate',
        'level.advanced': 'Advanced',

        // Features section
        'features.title': 'Why Choose Us',
        'features.subtitle': 'We are committed to providing the best programming learning experience',
        'feature.teachers.title': 'Expert Instructors',
        'feature.teachers.desc': 'All instructors come from top tech companies with rich practical experience',
        'feature.projects.title': 'Real Projects',
        'feature.projects.desc': 'Every course includes hands-on real-world project practice',
        'feature.lifetime.title': 'Lifetime Access',
        'feature.lifetime.desc': 'Buy once, access course content and future updates forever',
        'feature.career.title': 'Career Support',
        'feature.career.desc': 'Career guidance and job recommendations to boost your career',

        // Stats
        'stats.students': 'Students',
        'stats.courses': 'Courses',
        'stats.rating': 'Satisfaction',
        'stats.partners': 'Partners',

        // Footer
        'footer.about': 'Coding Academy is a leading online programming education platform, dedicated to providing high-quality, systematic programming courses to help every learner achieve their tech dreams.',
        'footer.quicklinks': 'Quick Links',
        'footer.contact': 'Contact Us',
        'footer.follow': 'Follow Us',
        'footer.subscribe.label': 'Subscribe to our newsletter',
        'footer.subscribe.placeholder': 'Enter your email',
        'footer.subscribe.btn': 'Subscribe',
        'footer.home': 'Home',
        'footer.courses': 'Courses',
        'footer.path': 'Learning Paths',
        'footer.team': 'Instructors',
        'footer.faq': 'FAQ',
        'footer.email': '📧 Email: contact@codingacademy.cn',
        'footer.phone': '📞 Phone: 400-888-9999',
        'footer.address': '📍 Address: Zhongguancun Tech Park, Beijing',
        'footer.hours': '🕐 Hours: Mon-Fri 9:00 - 18:00',
        'footer.copyright': '© 2024 Coding Academy. All rights reserved.',

        // Courses page
        'coursespage.title': 'Course Catalog',
        'coursespage.subtitle': 'Explore our premium courses and find your learning path',
        'filter.search': 'Search courses...',
        'filter.allcategory': 'All Categories',
        'filter.programming': 'Programming',
        'filter.frontend': 'Frontend',
        'filter.backend': 'Backend',
        'filter.datascience': 'Data Science',
        'filter.ai': 'AI',
        'filter.alllevel': 'All Levels',
        'filter.beginner': 'Beginner',
        'filter.intermediate': 'Intermediate',
        'filter.advanced': 'Advanced',
        'filter.defaultsort': 'Default Sort',
        'filter.newest': 'Newest',
        'filter.priceasc': 'Price: Low to High',
        'filter.pricedesc': 'Price: High to Low',
        'filter.ratingfirst': 'Top Rated',
        'pagination.prev': 'Previous',
        'pagination.next': 'Next',

        // Dashboard page
        'dashboard.title': 'My Courses',
        'dashboard.subtitle': 'Manage your learning progress and enrolled courses',
        'dashboard.enrolled': 'Enrolled Courses',
        'dashboard.hours': 'Study Hours',
        'dashboard.completed': 'Completed',
        'dashboard.certs': 'Certificates',
        'dashboard.unit.courses': '',
        'dashboard.unit.hours': 'hrs',
        'dashboard.unit.certs': '',
        'dashboard.enrolledtitle': 'Enrolled Courses',
        'dashboard.empty.icon': '📚',
        'dashboard.empty.title': "You haven't enrolled in any courses yet",
        'dashboard.empty.subtitle': 'Check out our course catalog',
        'dashboard.empty.btn': 'Browse Courses',
        'dashboard.continue': 'Continue',
        'dashboard.progress': 'Progress',
        'dashboard.enrolldate': 'Enrolled',
        'dashboard.paid': 'Paid',

        // About page
        'about.title': 'About Us',
        'about.subtitle': 'Learn about our story, mission, and vision',
        'about.story.title': 'Our Story',
        'about.story.p1': 'Coding Academy was founded in 2018 by a group of engineers passionate about programming education. We believe that programming is not just a skill, but a way of thinking. Through high-quality course content and innovative teaching methods, we have helped over 50,000 students achieve their tech dreams.',
        'about.story.p2': 'Our courses cover all levels from beginner to advanced, including Python, Java, frontend development, AI, and more. Every course is carefully designed, combining theory with hands-on projects to ensure practical learning.',
        'about.stats.students': 'Students',
        'about.stats.courses': 'Courses',
        'about.stats.rating': 'Satisfaction',
        'about.stats.years': 'Years Experience',
        'about.mission.title': 'Our Mission',
        'about.mission.mission': 'Mission',
        'about.mission.mission.desc': 'Empower everyone to realize their creativity and dreams through programming',
        'about.mission.vision': 'Vision',
        'about.mission.vision.desc': 'Become the most trusted online programming education platform globally',
        'about.mission.values': 'Values',
        'about.mission.values.desc': 'Professional, Innovative, Inclusive, Win-Win',
        'about.team.title': 'Core Team',
        'about.team.zhang.name': 'Ming Zhang',
        'about.team.zhang.role': 'Founder & CEO',
        'about.team.zhang.bio': 'Former senior engineer at Alibaba, 10 years in programming education',
        'about.team.li.name': 'Hua Li',
        'about.team.li.role': 'CTO',
        'about.team.li.bio': 'Former tech lead at Tencent, expert in Java and distributed systems',
        'about.team.wang.name': 'Fang Wang',
        'about.team.wang.role': 'Director of Education',
        'about.team.wang.bio': 'PhD in CS from Peking University, frontend technology researcher',
        'about.team.chen.name': 'Wei Chen',
        'about.team.chen.role': 'Course Designer',
        'about.team.chen.bio': 'Former algorithm engineer at Baidu, ACM gold medalist',
        'about.contact.title': 'Contact Us',
        'about.contact.email': 'contact@codingacademy.cn',
        'about.contact.phone': '400-888-9999',
        'about.contact.address': 'Zhongguancun Tech Park, Beijing',
        'about.contact.form.name': 'Name',
        'about.contact.form.name.placeholder': 'Enter your name',
        'about.contact.form.email': 'Email',
        'about.contact.form.email.placeholder': 'Enter your email',
        'about.contact.form.message': 'Message',
        'about.contact.form.message.placeholder': 'Enter your message...',
        'about.contact.form.submit': 'Submit',

        // Settings panel
        'settings.title': 'Settings',
        'settings.theme': 'Theme',
        'settings.theme.light': 'Light',
        'settings.theme.dark': 'Dark',
        'settings.theme.auto': 'System',
        'settings.lang': 'Language',
        'settings.lang.zh': '中文',
        'settings.lang.en': 'English',

        // Modal / Enrollment
        'modal.title': 'Course Enrollment',
        'modal.name': 'Name',
        'modal.name.placeholder': 'Enter your name',
        'modal.phone': 'Phone',
        'modal.phone.placeholder': 'Enter your phone number',
        'modal.email': 'Email',
        'modal.email.placeholder': 'Enter your email',
        'modal.level': 'Experience Level',
        'modal.level.placeholder': 'Select your programming level',
        'modal.level.zero': 'Complete Beginner',
        'modal.level.beginner': 'Some Experience',
        'modal.level.intermediate': 'Intermediate',
        'modal.level.advanced': 'Advanced',
        'modal.price': 'Course Fee: ',
        'modal.submit': 'Confirm Enrollment',
        'modal.success.title': 'Enrollment Successful!',
        'modal.success.msg1': 'You have successfully enrolled in',
        'modal.success.msg2': 'Course details will be sent to your email within 24 hours',
        'modal.success.ok': 'OK',

        // Toast messages
        'toast.subscribe.success': 'Subscribed! Thank you for following us',
        'toast.subscribe.error': 'Please enter a valid email address',
        'toast.enroll.success': 'Enrollment successful! Welcome to Coding Academy',
        'toast.name.required': 'Please enter your name',
        'toast.phone.required': 'Please enter your phone number',
        'toast.phone.invalid': 'Please enter a valid phone number',
        'toast.email.required': 'Please enter your email',
        'toast.email.invalid': 'Please enter a valid email address',
        'toast.level.required': 'Please select your experience level',
    }
};


// =============================================================================
// 2. Settings Manager Class
// =============================================================================

class SettingsManager {
    /**
     * Initializes the SettingsManager by loading persisted settings
     * and applying them immediately.
     */
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    /**
     * Returns the default settings object.
     * @returns {{ theme: string, lang: string }}
     */
    getDefaults() {
        return { theme: 'light', lang: 'zh' };
    }

    /**
     * Loads settings from localStorage, merging with defaults as a fallback.
     * @returns {{ theme: string, lang: string }}
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('siteSettings');
            return saved ? { ...this.getDefaults(), ...JSON.parse(saved) } : this.getDefaults();
        } catch {
            return this.getDefaults();
        }
    }

    /**
     * Persists the current settings object to localStorage.
     */
    saveSettings() {
        try {
            localStorage.setItem('siteSettings', JSON.stringify(this.settings));
        } catch {
            // Silently ignore storage errors (e.g. private browsing quota)
        }
    }

    /**
     * Initialization entry point.
     * Applies the theme immediately (before DOM ready) to prevent flash,
     * then waits for DOM ready to apply language and build the UI panel.
     */
    init() {
        // Theme can be applied before DOM is ready (sets attribute on <html>)
        this.applyTheme(this.settings.theme);

        // Language & panel creation require a ready DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.applyLanguage(this.settings.lang);
                this.createSettingsPanel();
                this.createSettingsToggle();
            });
        } else {
            this.applyLanguage(this.settings.lang);
            this.createSettingsPanel();
            this.createSettingsToggle();
        }
    }

    // -------------------------------------------------------------------------
    // Theme
    // -------------------------------------------------------------------------

    /**
     * Applies the given theme ('light', 'dark', or 'auto') by setting the
     * `data-theme` attribute on the document root element.
     * @param {'light'|'dark'|'auto'} theme
     */
    applyTheme(theme) {
        this.settings.theme = theme;
        const root = document.documentElement;

        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            root.setAttribute('data-theme', theme);
        }

        this.saveSettings();
        this.updateSettingsPanel();
    }

    // -------------------------------------------------------------------------
    // Language / i18n
    // -------------------------------------------------------------------------

    /**
     * Applies the given language ('zh' or 'en') by:
     *   1. Updating `lang` on <html>
     *   2. Translating every element with `data-i18n` or `data-i18n-placeholder`
     *   3. Setting the document title based on the current page
     * @param {'zh'|'en'} lang
     */
    applyLanguage(lang) {
        this.settings.lang = lang;
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        const dict = translations[lang];
        if (!dict) return;

        // Update all elements with data-i18n attribute (textContent)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) {
                el.placeholder = dict[key];
            }
        });

        // Update the page <title> based on the current HTML file
        const page = window.location.pathname.split('/').pop() || 'index.html';
        const titles = {
            zh: {
                'index.html': '编程学院 - 专业编程课程在线学习平台',
                'courses.html': '课程中心 - 编程学院',
                'dashboard.html': '我的课程 - 编程学院',
                'about.html': '关于我们 - 编程学院',
            },
            en: {
                'index.html': 'Coding Academy - Professional Online Programming Courses',
                'courses.html': 'Course Catalog - Coding Academy',
                'dashboard.html': 'My Courses - Coding Academy',
                'about.html': 'About Us - Coding Academy',
            }
        };
        if (titles[lang] && titles[lang][page]) {
            document.title = titles[lang][page];
        }

        this.saveSettings();
        this.updateSettingsPanel();
    }

    /**
     * Translation helper – returns the translated string for the given key
     * in the currently active language, or the key itself as a fallback.
     * @param {string} key
     * @returns {string}
     */
    t(key) {
        const dict = translations[this.settings.lang];
        return (dict && dict[key]) || key;
    }

    // -------------------------------------------------------------------------
    // Settings UI – Toggle Button
    // -------------------------------------------------------------------------

    /**
     * Creates the floating gear button in the bottom-right corner of the page.
     * Clicking it toggles the settings panel open/closed.
     */
    createSettingsToggle() {
        if (document.getElementById('settingsToggle')) return;

        const btn = document.createElement('button');
        btn.id = 'settingsToggle';
        btn.className = 'settings-toggle';
        btn.setAttribute('aria-label', 'Settings');
        btn.innerHTML = '⚙️';
        btn.addEventListener('click', () => this.togglePanel());
        document.body.appendChild(btn);
    }

    // -------------------------------------------------------------------------
    // Settings UI – Slide-out Panel
    // -------------------------------------------------------------------------

    /**
     * Creates the settings slide-out panel containing theme and language options.
     * Attaches all necessary event listeners for interaction.
     */
    createSettingsPanel() {
        if (document.getElementById('settingsPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'settingsPanel';
        panel.className = 'settings-panel';

        panel.innerHTML = `
            <div class="settings-panel-header">
                <h3 data-i18n="settings.title">${this.t('settings.title')}</h3>
                <button class="settings-panel-close" aria-label="Close">&times;</button>
            </div>
            <div class="settings-panel-body">
                <div class="settings-group">
                    <label class="settings-label" data-i18n="settings.theme">${this.t('settings.theme')}</label>
                    <div class="settings-options theme-options">
                        <button class="settings-option-btn" data-theme="light">
                            <span class="option-icon">☀️</span>
                            <span data-i18n="settings.theme.light">${this.t('settings.theme.light')}</span>
                        </button>
                        <button class="settings-option-btn" data-theme="dark">
                            <span class="option-icon">🌙</span>
                            <span data-i18n="settings.theme.dark">${this.t('settings.theme.dark')}</span>
                        </button>
                        <button class="settings-option-btn" data-theme="auto">
                            <span class="option-icon">💻</span>
                            <span data-i18n="settings.theme.auto">${this.t('settings.theme.auto')}</span>
                        </button>
                    </div>
                </div>
                <div class="settings-group">
                    <label class="settings-label" data-i18n="settings.lang">${this.t('settings.lang')}</label>
                    <div class="settings-options lang-options">
                        <button class="settings-option-btn" data-lang="zh">
                            <span class="option-icon">🇨🇳</span>
                            <span data-i18n="settings.lang.zh">${this.t('settings.lang.zh')}</span>
                        </button>
                        <button class="settings-option-btn" data-lang="en">
                            <span class="option-icon">🇺🇸</span>
                            <span data-i18n="settings.lang.en">${this.t('settings.lang.en')}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Close button handler
        panel.querySelector('.settings-panel-close').addEventListener('click', () => this.togglePanel(false));

        // Theme option buttons
        panel.querySelectorAll('[data-theme]').forEach(btn => {
            btn.addEventListener('click', () => this.applyTheme(btn.dataset.theme));
        });

        // Language option buttons
        panel.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => this.applyLanguage(btn.dataset.lang));
        });

        // Click outside the panel to close it
        document.addEventListener('click', (e) => {
            if (panel.classList.contains('open') &&
                !panel.contains(e.target) &&
                e.target.id !== 'settingsToggle') {
                this.togglePanel(false);
            }
        });

        // React to OS-level theme changes when in 'auto' mode
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.settings.theme === 'auto') {
                this.applyTheme('auto');
            }
        });

        // Set initial active states
        this.updateSettingsPanel();
    }

    /**
     * Toggles the settings panel open or closed.
     * @param {boolean} [forceState] - If provided, forces the panel open (true) or closed (false).
     */
    togglePanel(forceState) {
        const panel = document.getElementById('settingsPanel');
        if (!panel) return;

        if (typeof forceState === 'boolean') {
            panel.classList.toggle('open', forceState);
        } else {
            panel.classList.toggle('open');
        }
    }

    /**
     * Synchronises the active/highlighted state of all buttons inside the
     * settings panel to reflect the current settings values.
     */
    updateSettingsPanel() {
        const panel = document.getElementById('settingsPanel');
        if (!panel) return;

        // Highlight the currently selected theme button
        panel.querySelectorAll('[data-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === this.settings.theme);
        });

        // Highlight the currently selected language button
        panel.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.settings.lang);
        });
    }
}


// =============================================================================
// 3. Initialize – expose globally so app.js / dashboard.js can access it
// =============================================================================

const settingsManager = new SettingsManager();
window.settingsManager = settingsManager;
