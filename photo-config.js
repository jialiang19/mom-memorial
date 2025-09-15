// 模态画廊系统 - 主页面10张照片，点击查看全部
const photoConfig = {
    stages: {
        childhood: {
            title: "少年时期",
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

// 生成照片配置
function generatePhotoConfig() {
    // 生成少年时期照片配置
    for (let i = 1; i <= 37; i++) {
        photoConfig.stages.childhood.photos.push({
            src: `images/childhood${i}.jpg`,
            caption: `少年时期 - 照片${i}`
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
    
    // 延迟加载确保DOM完全准备好
    setTimeout(() => {
        loadPhotosForStage('childhood');
        loadPhotosForStage('youth');
        loadPhotosForStage('middle-china');
        loadPhotosForStage('middle-usa');
    }, 100);
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
    
    // 每个阶段显示8张照片
    const displayCount = Math.min(8, stageData.photos.length);
    console.log(`Loading ${displayCount} photos for ${stage}`);
    
    for (let i = 0; i < displayCount; i++) {
        const photoItem = createPhotoItem(stageData.photos[i]);
        gridDiv.appendChild(photoItem);
    }
}

// 创建照片元素
function createPhotoItem(photo) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    img.style.cssText = `
        width: 100%;
        height: 300px;
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
    
    // 点击事件 - 修复模态照片点击
    photoItem.addEventListener('click', function(e) {
        console.log('Image clicked:', photo.src);
        e.preventDefault();
        if (typeof createLightbox === 'function') {
            createLightbox(this.src, this.alt);
        } else {
            console.error('createLightbox function not available');
        }
    });
    
    return photoItem;
}

// 打开模态画廊
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
    `;
    
    // 创建头部
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 20px;
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
    title.style.cssText = 'margin: 0; font-size: 24px;';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        padding: 5px 10px;
    `;
    closeBtn.onclick = () => document.body.removeChild(modal);
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // 创建照片网格
    const galleryGrid = document.createElement('div');
    galleryGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 20px;
        max-width: 1200px;
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

// 创建模态照片元素
function createModalPhotoItem(photo, index) {
    const photoItem = document.createElement('div');
    photoItem.style.cssText = `
        background: white;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s ease;
    `;
    
    photoItem.onmouseover = () => photoItem.style.transform = 'scale(1.05)';
    photoItem.onmouseout = () => photoItem.style.transform = 'scale(1)';
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.caption;
    img.style.cssText = `
        width: 100%;
        height: 250px;
        object-fit: contain;
        display: block;
    `;
    
    const caption = document.createElement('div');
    caption.textContent = photo.caption;
    caption.style.cssText = `
        padding: 10px;
        font-size: 12px;
        color: #333;
        text-align: center;
    `;
    
    photoItem.appendChild(img);
    photoItem.appendChild(caption);
    
    // 点击事件 - 修复模态照片点击
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
