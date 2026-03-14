/**
 * ============================================
 * 编程学院 - 主要交互脚本
 * ============================================
 * 功能模块：
 * 1. 移动端菜单切换
 * 2. 平滑滚动导航
 * 3. 导航栏滚动效果
 * 4. 滚动进入动画
 * 5. 课程报名弹窗系统
 * 6. 报名数据本地存储
 * 7. 统计数字动画
 * 8. 邮件订阅功能
 * 9. Toast 通知系统
 * 10. 英雄区域粒子效果
 * ============================================
 */

// 翻译辅助函数，安全调用 settingsManager
function t(key) {
  return window.settingsManager ? window.settingsManager.t(key) : key;
}

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // 1. 移动端菜单切换
  // ============================================

  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    // 点击汉堡按钮，切换菜单展开/收起状态
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // 点击导航链接后自动收起菜单（移动端体验优化）
    const navLinkItems = navLinks.querySelectorAll(".nav-link");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ============================================
  // 2. 平滑滚动导航
  // ============================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navbar = document.querySelector(".navbar");

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // 忽略仅为 "#" 的空锚点链接
      if (href === "#") return;

      e.preventDefault();
      const targetSection = document.querySelector(href);

      if (targetSection) {
        // 计算导航栏高度作为偏移量，避免内容被固定导航栏遮挡
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // 3. 导航栏滚动效果
  // ============================================

  if (navbar) {
    const handleNavbarScroll = () => {
      // 当页面向下滚动超过 50px 时，为导航栏添加更实的背景色
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    // 初始加载时也检查一次（处理页面刷新后已经滚动的情况）
    handleNavbarScroll();
    window.addEventListener("scroll", handleNavbarScroll);
  }

  // ============================================
  // 4. 滚动进入动画（IntersectionObserver）
  // ============================================

  const animateElements = document.querySelectorAll(
    ".course-card, .feature-card, .stat-item",
  );

  if (animateElements.length > 0) {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入可视区域时添加动画类
            entry.target.classList.add("animate");
            // 动画只播放一次，之后取消观察
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 元素显示 10% 即触发
        rootMargin: "0px 0px -50px 0px", // 底部留出 50px 缓冲
      },
    );

    // 为每个元素设置交错延迟，实现依次进入的视觉效果
    animateElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
      scrollObserver.observe(el);
    });
  }

  // ============================================
  // 5. 课程报名弹窗系统
  // ============================================

  const enrollButtons = document.querySelectorAll(".btn-enroll");

  enrollButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // 从最近的课程卡片中获取课程名称和价格
      const courseCard = e.target.closest(".course-card");
      if (!courseCard) return;

      const courseName =
        courseCard.querySelector(".course-title")?.textContent || "未知课程";
      const coursePrice =
        courseCard.querySelector(".course-price")?.textContent || "¥0";

      // 创建并显示报名弹窗
      showEnrollModal(courseName, coursePrice);
    });
  });

  /**
   * 显示报名弹窗
   * @param {string} courseName - 课程名称
   * @param {string} price - 课程价格
   */
  function showEnrollModal(courseName, price) {
    // 创建弹窗遮罩层
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay active";

    modalOverlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${t("modal.title")} - ${courseName}</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="enrollForm">
                        <div class="form-group">
                            <label>${t("modal.name")}</label>
                            <input type="text" id="enrollName" placeholder="${t("modal.name.placeholder")}" required>
                        </div>
                        <div class="form-group">
                            <label>${t("modal.phone")}</label>
                            <input type="tel" id="enrollPhone" placeholder="${t("modal.phone.placeholder")}" required>
                        </div>
                        <div class="form-group">
                            <label>${t("modal.email")}</label>
                            <input type="email" id="enrollEmail" placeholder="${t("modal.email.placeholder")}" required>
                        </div>
                        <div class="form-group">
                            <label>${t("modal.level")}</label>
                            <select id="enrollLevel">
                                <option value="">${t("modal.level.placeholder")}</option>
                                <option value="zero">${t("modal.level.zero")}</option>
                                <option value="beginner">${t("modal.level.beginner")}</option>
                                <option value="intermediate">${t("modal.level.intermediate")}</option>
                                <option value="advanced">${t("modal.level.advanced")}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <p class="enroll-price">${t("modal.price")}<strong>${price}</strong></p>
                        </div>
                        <button type="submit" class="btn btn-submit">${t("modal.submit")}</button>
                    </form>
                    <div class="modal-success" style="display:none;">
                        <div class="success-icon">✅</div>
                        <h3>${t("modal.success.title")}</h3>
                        <p>${t("modal.success.msg1")} <strong>${courseName}</strong></p>
                        <p>${t("modal.success.msg2")}</p>
                        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">${t("modal.success.ok")}</button>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modalOverlay);

    // --- 弹窗关闭逻辑 ---

    // 点击关闭按钮关闭弹窗
    const closeBtn = modalOverlay.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modalOverlay.remove();
    });

    // 点击遮罩层背景关闭弹窗（点击弹窗本身不关闭）
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.remove();
      }
    });

    // --- 表单提交逻辑 ---

    const enrollForm = modalOverlay.querySelector("#enrollForm");
    enrollForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = modalOverlay.querySelector("#enrollName").value.trim();
      const phone = modalOverlay.querySelector("#enrollPhone").value.trim();
      const email = modalOverlay.querySelector("#enrollEmail").value.trim();
      const level = modalOverlay.querySelector("#enrollLevel").value;

      // 表单验证
      if (!name) {
        showToast(t("toast.name.required"), "error");
        return;
      }

      if (!phone) {
        showToast(t("toast.phone.required"), "error");
        return;
      }

      // 验证手机号格式（中国大陆手机号）
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        showToast(t("toast.phone.invalid"), "error");
        return;
      }

      if (!email) {
        showToast(t("toast.email.required"), "error");
        return;
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast(t("toast.email.invalid"), "error");
        return;
      }

      if (!level) {
        showToast(t("toast.level.required"), "error");
        return;
      }

      // 保存报名信息到本地存储
      const enrollment = {
        name,
        phone,
        email,
        level,
        courseName,
        price,
        date: new Date().toISOString(),
      };
      saveEnrollment(enrollment);

      // 隐藏表单，显示成功提示
      enrollForm.style.display = "none";
      const successMsg = modalOverlay.querySelector(".modal-success");
      successMsg.style.display = "block";

      showToast(t("toast.enroll.success"), "success");
    });
  }

  // ============================================
  // 6. 报名数据本地存储
  // ============================================

  /**
   * 保存单条报名记录到 localStorage
   * @param {Object} enrollment - 报名信息对象
   */
  function saveEnrollment(enrollment) {
    const enrollments = getEnrollments();
    enrollments.push(enrollment);
    try {
      localStorage.setItem("enrollments", JSON.stringify(enrollments));
    } catch (e) {
      console.warn("本地存储写入失败：", e);
    }
  }

  /**
   * 获取所有报名记录
   * @returns {Array} 报名记录数组
   */
  function getEnrollments() {
    try {
      const data = localStorage.getItem("enrollments");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("本地存储读取失败：", e);
      return [];
    }
  }

  // 将获取报名记录的方法挂载到全局，方便外部调用和调试
  window.getEnrollments = getEnrollments;

  // ============================================
  // 7. 统计数字动画
  // ============================================

  const statsSection = document.querySelector(".stats-section");
  let statsAnimated = false; // 标记是否已经播放过动画，避免重复触发

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // 统计区域显示 30% 时触发
      },
    );

    statsObserver.observe(statsSection);
  }

  /**
   * 数字递增动画
   * 使用 easeOutQuart 缓动函数，让数字从快到慢自然递增
   */
  function animateCounters() {
    const statNumbers = document.querySelectorAll(".stat-number");
    const duration = 2000; // 动画持续 2 秒

    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      if (isNaN(target)) return;

      const startTime = performance.now();

      // 缓动函数：easeOutQuart - 开头快，结尾慢
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 进度值 0~1
        const easedProgress = easeOutQuart(progress);

        const currentValue = Math.floor(easedProgress * target);

        // 格式化数字：大于等于 1000 时添加千分位逗号
        const formattedValue = currentValue.toLocaleString("zh-CN");

        // 保留原始文本中的后缀（如 "+", "%"）
        const originalText = el.textContent;
        const suffix = originalText.replace(/[\d,\.]+/, "").trim();
        el.textContent = formattedValue + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ============================================
  // 8. 邮件订阅功能
  // ============================================

  const subscribeBtn = document.querySelector(".btn-subscribe");
  const newsletterInput = document.querySelector(".newsletter-input");

  if (subscribeBtn && newsletterInput) {
    subscribeBtn.addEventListener("click", () => {
      const email = newsletterInput.value.trim();

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        showToast(t("toast.subscribe.error"), "error");
        return;
      }

      // 订阅成功
      showToast(t("toast.subscribe.success"), "success");
      newsletterInput.value = ""; // 清空输入框
    });

    // 支持按回车键提交订阅
    newsletterInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        subscribeBtn.click();
      }
    });
  }

  // ============================================
  // 9. Toast 通知系统
  // ============================================

  /**
   * 显示 Toast 通知消息
   * @param {string} message - 通知内容
   * @param {string} type - 通知类型：'success' 或 'error'
   */
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // 根据类型选择图标
    const icon = type === "success" ? "✅" : "❌";

    toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

    // 基础样式 - 固定定位在页面右上角
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "14px 24px",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      zIndex: "10000",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      transform: "translateX(120%)",
      transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      maxWidth: "380px",
      lineHeight: "1.4",
    });

    // 根据类型设置背景色
    toast.style.background =
      type === "success"
        ? "linear-gradient(135deg, #00c853, #009624)"
        : "linear-gradient(135deg, #ff5252, #d32f2f)";

    document.body.appendChild(toast);

    // 处理多个 Toast 堆叠显示（依次向下排列）
    const existingToasts = document.querySelectorAll(".toast");
    const offset = (existingToasts.length - 1) * 70;
    toast.style.top = `${20 + offset}px`;

    // 滑入动画（下一帧触发，确保 CSS transition 生效）
    requestAnimationFrame(() => {
      toast.style.transform = "translateX(0)";
    });

    // 3 秒后自动滑出并移除
    setTimeout(() => {
      toast.style.transform = "translateX(120%)";
      // 等待滑出动画完成后移除 DOM 元素
      toast.addEventListener(
        "transitionend",
        () => {
          toast.remove();
        },
        { once: true },
      );
    }, 3000);
  }

  // 将 showToast 挂载到全局，方便其他模块调用
  window.showToast = showToast;

  // ============================================
  // 10. 英雄区域粒子效果
  // ============================================

  const heroSection = document.querySelector(".hero");

  if (heroSection) {
    /**
     * 创建浮动粒子效果
     * 在英雄区域随机生成小圆点，模拟科技感粒子飘动
     */
    function createParticles() {
      const particleCount = 30; // 粒子数量

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "hero-particle";

        // 随机位置
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        // 随机大小（2px ~ 6px）
        const size = Math.random() * 4 + 2;

        // 随机动画持续时间（3s ~ 8s），让每个粒子速度不同
        const animDuration = Math.random() * 5 + 3;

        // 随机动画延迟，避免所有粒子同步运动
        const animDelay = Math.random() * 5;

        // 随机透明度（0.2 ~ 0.7）
        const opacity = Math.random() * 0.5 + 0.2;

        Object.assign(particle.style, {
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: `rgba(255, 255, 255, ${opacity})`,
          pointerEvents: "none",
          animation: `particleFloat ${animDuration}s ease-in-out ${animDelay}s infinite`,
        });

        heroSection.appendChild(particle);
      }
    }

    // 注入粒子浮动关键帧动画样式
    function injectParticleStyles() {
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translateY(-35px) translateX(-10px);
                        opacity: 0.5;
                    }
                    75% {
                        transform: translateY(-15px) translateX(15px);
                        opacity: 0.8;
                    }
                }

                .hero {
                    position: relative;
                    overflow: hidden;
                }

                .hero-particle {
                    will-change: transform, opacity;
                }
            `;
      document.head.appendChild(styleSheet);
    }

    // 确保英雄区域有相对定位（粒子需要绝对定位参考）
    const heroPosition = getComputedStyle(heroSection).position;
    if (heroPosition === "static") {
      heroSection.style.position = "relative";
    }
    heroSection.style.overflow = "hidden";

    injectParticleStyles();
    createParticles();
  }

  // ============================================
  // 初始化完成日志
  // ============================================
  console.log("🚀 编程学院网站脚本加载完成");
});
