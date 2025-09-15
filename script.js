// Global createLightbox function - moved outside DOMContentLoaded
function createLightbox(src, alt) {
    // 关闭任何现有的灯箱
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        document.body.removeChild(existingLightbox);
    }
    // 创建灯箱覆盖层
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        cursor: pointer;
    `;

    // 创建图片
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    `;

    // 创建关闭按钮
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 3001;
    `;

    // 创建标题
    const caption = document.createElement('div');
    caption.textContent = alt;
    caption.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 16px;
        text-align: center;
        background: rgba(0, 0, 0, 0.7);
        padding: 10px 20px;
        border-radius: 20px;
    `;

    // 组装灯箱
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(caption);
    document.body.appendChild(lightbox);

    // 关闭功能
    function closeLightbox() {
        document.body.removeChild(lightbox);
    }

    lightbox.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// 平滑滚动导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 为导航链接添加平滑滚动
    const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 根据滚动位置为导航链接添加活动状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.navigation a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 淡入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.section, .life-stage-section, .timeline-item, .photo-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 照片点击事件 - 使用事件委托
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.photo-item')) {
            createLightbox(e.target.src, e.target.alt);
        }
    });
});

// Music Player Functionality
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("memorial-music");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const playIcon = document.getElementById("play-icon");
    const volumeSlider = document.getElementById("volume-slider");
    
    if (audio && playPauseBtn && playIcon && volumeSlider) {
        // Set initial volume
        audio.autoplay = true;
        audio.loop = true;
        audio.volume = 0.5;
        
        // Auto-play music when page loads
        setTimeout(() => {
            audio.muted = false;
            audio.play().catch(e => {
                console.log("Autoplay blocked:", e);
                // If autoplay is blocked, show play button
                playIcon.textContent = "▶️";
            });
        }, 1000);
        
        // Play/Pause functionality
        playPauseBtn.addEventListener("click", function() {
            if (audio.paused) {
                audio.play();
                playIcon.textContent = "⏸️";
            } else {
                audio.pause();
                playIcon.textContent = "▶️";
            }
        });
        
        // Volume control
        volumeSlider.addEventListener("input", function() {
            audio.volume = this.value / 100;
        });
        
        // Update play/pause icon when audio ends
        audio.addEventListener("ended", function() {
            playIcon.textContent = "▶️";
        });
        
        // Error handling
        audio.addEventListener("error", function() {
            console.error("Audio loading error:", audio.error);
            playIcon.textContent = "❌";
        });
    }
});

// 移动端导航栏优化 - 完整显示/隐藏
document.addEventListener("DOMContentLoaded", function() {
    const navigation = document.querySelector(".navigation");
    
    if (navigation && window.innerWidth <= 768) {
        // 添加固定导航栏类
        navigation.classList.add("fixed");
        
        // 监听滚动事件
        let lastScrollTop = 0;
        window.addEventListener("scroll", function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 向下滚动时完全隐藏导航栏
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navigation.classList.add("hidden");
            } else {
                // 向上滚动时完全显示导航栏
                navigation.classList.remove("hidden");
            }
            
            lastScrollTop = scrollTop;
        });
        
        // 添加过渡效果
        // Transition handled by CSS
    }
});

// 移动端导航栏完整隐藏/显示功能
document.addEventListener("DOMContentLoaded", function() {
    const navigation = document.querySelector(".navigation");
    
    if (navigation && window.innerWidth <= 768) {
        let lastScrollTop = 0;
        let ticking = false;
        
        function updateNavigation() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // 向下滚动 - 隐藏导航栏
                navigation.style.transform = "translateY(-100%)";
                navigation.style.opacity = "0";
                navigation.style.visibility = "hidden";
            } else {
                // 向上滚动 - 显示导航栏
                navigation.style.transform = "translateY(0)";
                navigation.style.opacity = "1";
                navigation.style.visibility = "visible";
            }
            
            lastScrollTop = scrollTop;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        }
        
        window.addEventListener("scroll", requestTick, { passive: true });
        
        // 确保初始状态正确
        navigation.style.transition = "all 0.3s ease-in-out";
        navigation.style.transform = "translateY(0)";
        navigation.style.opacity = "1";
        navigation.style.visibility = "visible";
    }
});

// 移动端音乐按钮功能
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("memorial-music");
    const mobileMusicBtn = document.getElementById("mobile-music-btn");
    const mobileMusicIcon = document.getElementById("mobile-music-icon");
    
    if (audio && mobileMusicBtn && mobileMusicIcon && window.innerWidth <= 768) {
        // 设置初始音量
        audio.volume = 0.5;
        
        // 移动端音乐按钮点击事件
        mobileMusicBtn.addEventListener("click", function() {
            if (audio.paused) {
                audio.play();
                mobileMusicIcon.textContent = "⏸️";
            } else {
                audio.pause();
                mobileMusicIcon.textContent = "▶️";
            }
        });
        
        // 更新播放/暂停图标
        audio.addEventListener("ended", function() {
            mobileMusicIcon.textContent = "▶️";
        });
        
        // 错误处理
        audio.addEventListener("error", function() {
            console.error("Audio loading error:", audio.error);
            mobileMusicIcon.textContent = "❌";
        });
        
        // 自动播放尝试
        setTimeout(() => {
            audio.muted = false;
            audio.play().catch(e => {
                console.log("Autoplay blocked:", e);
                mobileMusicIcon.textContent = "▶️";
            });
        }, 1000);
    }
});
