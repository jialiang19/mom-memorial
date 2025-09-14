# 照片文件夹 - 灵活照片系统

此文件夹包含按人生阶段组织的照片。现在支持**无限数量**的照片！

## 🎯 灵活照片系统特点：

- **无限制数量**: 每个阶段可以添加任意数量的照片
- **自动布局**: 照片自动排列成响应式网格
- **简单管理**: 只需在 `photo-config.js` 中添加照片信息
- **错误处理**: 缺失的照片会自动隐藏，不影响布局

## 📁 照片文件命名建议：

### 主肖像照：
- `mother-main.jpeg` - 主肖像照片

### 青年时期照片：
- `youth1.jpg`, `youth2.jpg`, `youth3.jpg`... (无限制)
- 建议命名：`youth_graduation.jpg`, `youth_friends.jpg` 等

### 中年时期照片：
- `middle1.jpg`, `middle2.jpg`, `middle3.jpg`... (无限制)
- 建议命名：`middle_family.jpg`, `middle_work.jpg` 等

### 老年时期照片：
- `elderly1.jpg`, `elderly2.jpg`, `elderly3.jpg`... (无限制)
- 建议命名：`elderly_grandchildren.jpg`, `elderly_celebration.jpg` 等

## ⚙️ 如何添加照片：

### 方法1: 编辑 photo-config.js 文件
1. 打开 `photo-config.js` 文件
2. 在对应的阶段数组中添加新照片对象：
```javascript
{
    src: "images/your-photo.jpg",
    alt: "照片描述",
    caption: "照片说明"
}
```

### 方法2: 批量添加
只需在 `photo-config.js` 中复制粘贴照片对象，系统会自动处理布局。

## 📐 推荐照片规格：
- **尺寸**: 600x400px 或 4:3 比例
- **格式**: JPG 格式
- **文件大小**: 每个文件控制在 500KB 以下
- **质量**: 高质量但压缩过的照片

## 🔧 技术说明：
- 照片通过 JavaScript 动态加载
- 使用 CSS Grid 自动布局
- 支持响应式设计
- 缺失照片自动隐藏
- 保持灯箱功能

## 💡 使用提示：
1. **组织照片**: 按时间顺序或主题组织照片
2. **命名规范**: 使用有意义的文件名便于管理
3. **测试显示**: 添加照片后刷新页面查看效果
4. **备份**: 保留原始照片的备份