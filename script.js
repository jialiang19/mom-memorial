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
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.navigation a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }

    // 滚动时更新活动导航
    window.addEventListener('scroll', updateActiveNav);

    // 元素淡入动画
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

    // 观察元素进行淡入动画
    const animateElements = document.querySelectorAll('.memory-card, .photo-item, .timeline-item, .tribute-card, .life-stage-section');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 照片画廊灯箱功能 - 现在通过事件委托处理动态加载的照片
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.photo-item')) {
            createLightbox(e.target.src, e.target.alt);
        }
    });

    function createLightbox(src, alt) {
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
            z-index: 1000;
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
            border-radius: 10px;
        `;

        // 创建关闭按钮
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 1001;
        `;

        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        // 关闭灯箱
        function closeLightbox() {
            document.body.removeChild(lightbox);
        }

        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);

        // 按ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // 为英雄区域添加视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // 打字机效果（可选）
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 如果需要为标题添加打字效果，取消下面的注释
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 150);
    // }
});
// Music Player Functionality
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("memorial-music");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const playIcon = document.getElementById("play-icon");
    const volumeSlider = document.getElementById("volume-slider");
    
    if (audio && playPauseBtn && playIcon && volumeSlider) {
        // Set initial volume
        audio.volume = 0.5;
        
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
        
        // Update play icon when audio ends
        audio.addEventListener("ended", function() {
            playIcon.textContent = "▶️";
        });
        
        // Handle audio loading errors
        audio.addEventListener("error", function() {
            console.log("Audio file could not be loaded");
            playPauseBtn.style.display = "none";
        });
    }
});
