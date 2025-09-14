// 照片配置 - 动态生成所有照片配置
const photoConfig = {
    // 各阶段照片信息
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

// 动态生成照片配置
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

// 动态加载照片的函数
function loadPhotos() {
    // 生成照片配置
    generatePhotoConfig();
    
    // 加载少年时期照片
    loadPhotosForStage('childhood');
    
    // 加载青年时期照片  
    loadPhotosForStage('youth');
    
    // 加载中年-中国照片
    loadPhotosForStage('middle-china');
    
    // 加载中年-美国照片
    loadPhotosForStage('middle-usa');
}

// 为特定阶段加载照片
function loadPhotosForStage(stage) {
    const stageData = photoConfig.stages[stage];
    const container = document.getElementById(stage + '-photos');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // 创建照片信息
    const infoDiv = document.createElement('div');
    infoDiv.className = 'photo-info';
    infoDiv.innerHTML = `
        <p class="photo-count">${stageData.title} - ${stageData.count} 张照片</p>
        <p class="photo-note">点击照片查看大图</p>
    `;
    container.appendChild(infoDiv);
    
    // 创建照片网格
    const gridDiv = document.createElement('div');
    gridDiv.className = 'photo-grid';
    container.appendChild(gridDiv);
    
    // 添加所有照片
    for (let i = 0; i < stageData.photos.length; i++) {
        const photoItem = createPhotoItem(stageData.photos[i]);
        gridDiv.appendChild(photoItem);
    }
}

// 创建照片元素的函数
function createPhotoItem(photo) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    
    photoItem.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}" onerror="this.style.display='none'">
        <div class="photo-caption">${photo.caption}</div>
    `;
    
    // 添加点击事件用于灯箱
    const img = photoItem.querySelector('img');
    img.addEventListener('click', function() {
        createLightbox(this.src, this.alt);
    });
    
    return photoItem;
}

// 页面加载完成后加载照片
document.addEventListener('DOMContentLoaded', function() {
    loadPhotos();
});