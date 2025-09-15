// 响应式优化版本 - 移动端和桌面端兼容
const photoConfig = {
    stages: {
        childhood: {
            title: "老照片",
            count: 37,
            photos: []
        },
        youth: {
            title: "青年时期",
            count: 89,
            photos: []
        },
        'middle-china': {
            title: "中年时期 - 中国",
            count: 77,
            photos: []
        },
        'middle-usa': {
            title: "中年时期 - 美国",
            count: 50,
            photos: []
        }
    }
};

// 检测移动设备
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 生成照片配置
function generatePhotoConfig() {
    // 生成少年时期照片配置
    for (let i = 1; i <= 37; i++) {
        photoConfig.stages.childhood.photos.push({
            src: `images/childhood${i}.jpg`,
            caption: `老照片 - 照片${i}`
        });
    }
    
    // 生成青年时期照片配置
    for (let i = 1; i <= 89; i++) {
        photoConfig.stages.youth.photos.push({
            src: `images/youth${i}.jpg`,
            caption: `青年时期 - 照片${i}`
        });
    }
    
    // 生成中年-中国照片配置
    for (let i = 1; i <= 77; i++) {
        photoConfig.stages['middle-china'].photos.push({
            src: `images/middlechina${i}.jpg`,
            caption: `中年-中国 - 照片${i}`
        });
    }
    
    // 生成中年-美国照片配置
    for (let i = 1; i <= 50; i++) {
        photoConfig.stages['middle-usa'].photos.push({
            src: `images/middleusa${i}.jpg`,
            caption: `中年-美国 - 照片${i}`
        });
    }
}

// 加载照片
function loadPhotos() {
    generatePhotoConfig();
    
    // 移动端延迟更短
    const delay = isMobile() ? 50 : 100;
    
    setTimeout(() => {
        loadPhotosForStage('childhood');
        loadPhotosForStage('youth');
        loadPhotosForStage('middle-china');
        loadPhotosForStage('middle-usa');
    }, delay);
}

// 为特定阶段加载照片
function loadPhotosForStage(stage) {
    const stageData = photoConfig.stages[stage];
    const container = document.getElementById(stage + '-photos');
    
    if (!container) {
        console.error('Container not found:', stage + '-photos');
        return;
    }
    
    console.log('Loading photos for:', stage, 'Container:', container);
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建照片信息
    const infoDiv = document.createElement('div');
    infoDiv.className = 'photo-info';
    infoDiv.innerHTML = `
        <p class="photo-count">${stageData.title} - ${stageData.photos.length} 张照片</p>
        <p class="photo-note">点击照片查看大图 | <button class="view-all-btn" onclick="openModalGallery('${stage}')">查看全部照片</button></p>
    `;
    container.appendChild(infoDiv);
    
    // 创建照片网格
    const gridDiv = document.createElement('div');
    gridDiv.className = 'photo-grid';
    container.appendChild(gridDiv);
    
    // 移动端显示6张，桌面端显示8张
    const displayCount = isMobile() ? Math.min(6, stageData.photos.length) : Math.min(8, stageData.photos.length);
    console.log(`Loading ${displayCount} photos for ${stage} (mobile: ${isMobile()})`);
    
    for (let i = 0; i < displayCount; i++) {
        const photoItem = createPhotoItem(stageData.photos[i]);
        gridDiv.appendChild(photoItem);
    }
}

// 创建照片元素 - 响应式设计
function createPhotoItem(photo) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    
    // 响应式图片高度
    const imgHeight = isMobile() ? '200px' : '300px';
    img.style.cssText = `
        width: 100%;
        height: ${imgHeight};
        object-fit: contain;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        display: block;
    `;
    
    img.onload = function() {
        console.log('Image loaded successfully:', photo.src);
        this.style.backgroundColor = 'transparent';
    };
    
    img.onerror = function() {
        console.error('Failed to load image:', photo.src);
        this.style.backgroundColor = '#ffcccc';
        this.style.border = '2px solid #ff0000';
    };
    
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = photo.caption;
    
    photoItem.appendChild(img);
    photoItem.appendChild(caption);
    
    // 点击事件
    img.addEventListener('click', function() {
        console.log('Image clicked:', photo.src);
        if (typeof createLightbox === 'function') {
            createLightbox(photo.src, photo.caption);
        } else {
            console.error('createLightbox function not available');
        }
    });
    
    return photoItem;
}

// 打开模态画廊 - 响应式设计
function openModalGallery(stage) {
    const stageData = photoConfig.stages[stage];
    
    // 创建模态背景
    const modal = document.createElement('div');
    modal.className = 'modal-gallery';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `;
    
    // 创建头部
    const header = document.createElement('div');
    header.style.cssText = `
        padding: ${isMobile() ? '15px' : '20px'};
        background: rgba(0, 0, 0, 0.8);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 2001;
    `;
    
    const title = document.createElement('h2');
    title.textContent = `${stageData.title} - 全部 ${stageData.photos.length} 张照片`;
    title.style.cssText = `margin: 0; font-size: ${isMobile() ? '18px' : '24px'};`;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: ${isMobile() ? '24px' : '30px'};
        cursor: pointer;
        padding: 5px 10px;
    `;
    closeBtn.onclick = () => document.body.removeChild(modal);
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // 创建照片网格 - 响应式
    const galleryGrid = document.createElement('div');
    const gridColumns = isMobile() ? 'repeat(auto-fill, minmax(120px, 1fr))' : 'repeat(auto-fill, minmax(200px, 1fr))';
    const gridGap = isMobile() ? '10px' : '15px';
    const gridPadding = isMobile() ? '15px' : '20px';
    
    galleryGrid.style.cssText = `
        display: grid;
        grid-template-columns: ${gridColumns};
        gap: ${gridGap};
        padding: ${gridPadding};
        max-width: 100%;
        margin: 0 auto;
    `;
    
    // 加载所有照片
    stageData.photos.forEach((photo, index) => {
        const photoItem = createModalPhotoItem(photo, index);
        galleryGrid.appendChild(photoItem);
    });
    
    modal.appendChild(header);
    modal.appendChild(galleryGrid);
    document.body.appendChild(modal);
    
    // ESC键关闭
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

// 创建模态照片元素 - 响应式设计
function createModalPhotoItem(photo, index) {
    const photoItem = document.createElement('div');
    photoItem.style.cssText = `
        background: white;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s ease;
    `;
    
    // 只在桌面端添加hover效果
    if (!isMobile()) {
        photoItem.onmouseover = () => photoItem.style.transform = 'scale(1.05)';
        photoItem.onmouseout = () => photoItem.style.transform = 'scale(1)';
    }
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    const imgHeight = isMobile() ? '120px' : '250px';
    img.style.cssText = `
        width: 100%;
        height: ${imgHeight};
        object-fit: contain;
        display: block;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
    `;
    
    const caption = document.createElement('div');
    caption.textContent = photo.caption;
    caption.style.cssText = `
        padding: ${isMobile() ? '5px' : '10px'};
        font-size: ${isMobile() ? '10px' : '12px'};
        color: #333;
        text-align: center;
    `;
    
    photoItem.appendChild(img);
    photoItem.appendChild(caption);
    
    // 点击事件
    photoItem.addEventListener('click', function(e) {
        e.preventDefault();
        if (typeof createLightbox === 'function') {
            createLightbox(photo.src, photo.caption);
        }
    });
    
    return photoItem;
}

// 页面加载完成后加载照片
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting photo loading...');
    loadPhotos();
});
