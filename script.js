// script.js
document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://api.bgm.tv/calendar';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // 检查数据
            // 动态生成星期选项和动画列表等
        })
        .catch(error => console.error('Fetching error:', error));
});
function createWeekdayButtons(data) {
    const weekdaysContainer = document.querySelector('.weekdays');
    data.forEach((day, index) => {
        const button = document.createElement('button');
        button.textContent = day.weekday.cn;
        button.addEventListener('click', () => {
            loadAnimeList(data, index, document.getElementById('scoreFilter').value);
            document.querySelectorAll('.weekdays button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        weekdaysContainer.appendChild(button);
        if(index === 0) button.click(); // 默认加载星期一的数据
    });
}
function loadAnimeList(data, dayIndex, minScore) {
    const animeListContainer = document.querySelector('.anime-list');
    animeListContainer.innerHTML = ''; // 清空现有内容
    data[dayIndex].items.forEach(anime => {
        if (anime.rating && anime.rating.score >= minScore) {
            const item = document.createElement('div');
            item.className = 'anime-item';
            item.innerHTML = `
                <h3>${anime.name_cn || anime.name}</h3>
                <img src="${anime.images.large}" alt="${anime.name}">
                <p>评分：${anime.rating.score}</p>
            `;
            item.addEventListener('click', () => showPopup(anime));
            animeListContainer.appendChild(item);
        }
    });
}
document.getElementById('scoreFilter').addEventListener('change', function() {
    const activeDayButton = document.querySelector('.weekdays button.active');
    activeDayButton.click(); // 触发当前选中的星期按钮的点击事件，重新加载动画列表
});
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.bgm.tv/calendar')
        .then(response => response.json())
        .then(data => {
            createWeekdayButtons(data);
        })
        .catch(error => console.error('Fetching error:', error));
});
function showPopup(anime) {
    // 创建弹窗
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <h2>跳转下载或观看</h2>
        <a href="https://search.bilibili.com/all?keyword=${encodeURIComponent(anime.name_cn)}" target="_blank">bilibili</a>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(anime.name_cn)}" target="_blank">YouTube</a>
         <a href="https://mikanani.me/Home/Search?searchstr=${encodeURIComponent(anime.name_cn)}" target="_blank">蜜柑计划</a>
         <a href="https://dmhy.b168.net/topics/list?keyword=${encodeURIComponent(anime.name_cn)}" target="_blank">动漫花园</a>
        <a href="https://www.anfuns.cc/search.html?wd=${encodeURIComponent(anime.name_cn)}&submit=" target="_blank">AnFuns</a>
         <a href="https://www.mxdm6.com/search/-------------.html?wd=${encodeURIComponent(anime.name_cn)}" target="_blank">MX动漫</a>
         <a href="https://dick.xfani.com/search.html?wd=${encodeURIComponent(anime.name_cn)}" target="_blank">稀饭动漫</a>
        <!-- 添加其他链接 -->
        <button class="close-popup">关闭</button>
    `;
    document.body.appendChild(popup);
    document.getElementById('modalOverlay').style.display = 'block'; // 显示遮罩层

    // 关闭按钮事件处理器
    document.querySelector('.close-popup').addEventListener('click', () => {
        document.body.removeChild(popup);
        document.getElementById('modalOverlay').style.display = 'none'; // 隐藏遮罩层
    });
}

