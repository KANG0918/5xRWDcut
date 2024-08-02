const section = document.querySelector(".slide-section");
const slides = document.querySelectorAll(".slideImg");
const track = document.querySelector(".slide-track");
const navigator = document.querySelector(".slide-buttons-container");
const indicators = document.querySelectorAll(".slide-buttons");
let currentIndex = 0;
let autoSlideInterval;

// 初始化幻燈片設定
function setupSlides() {
    const w = section.offsetWidth; // 照片寬度 
    // slides.forEach((slide, i) => {
    //     slide.style.left = `${i * w}px`;
    // }); // 將照片們橫向擺放
    currentIndex = 0; // 初始化到第一張圖
    moveSlides(currentIndex); // 重新設定目前位置
}

// 移動寬度的函數
const moveSlides = (index) => {
    const w = section.offsetWidth;
    track.style.transform = `translateX(-${index * w}px)`;
};

// 自動移動寬度的函數
let i = 0;
const autoSlides = () => { 
    i = (i + 1) % slides.length; // 使用 slides.length 替代硬編碼的 6
    const w = section.offsetWidth;
    track.style.transform = `translateX(-${i * w}px)`;
};

// 啟動自動輪播
const startAutoSlides = () => {
    autoSlideInterval = setInterval(autoSlides, 5000); // 每 5 秒自動播放
};

// 停止自動輪播
const stopAutoSlides = () => {
    clearInterval(autoSlideInterval);
};

// button 調整
navigator.addEventListener("mouseover", (e) => {
    if (e.target.matches("button")) { // 若按到 button  
        const dot = e.target;
        const dotIndex = Number(dot.dataset.index);  // HTML 裡的 data-index
        moveSlides(dotIndex);
        stopAutoSlides(); // 滑鼠懸停時停止自動輪播
    }
});

// 滑鼠離開按鈕區域時，重新啟動自動輪播
navigator.addEventListener("mouseleave", () => {
    startAutoSlides(); // 重新啟動自動輪播
});

// 視窗調整時重設
window.addEventListener("resize", () => {
    setupSlides(); // 調整視窗大小時重新設定幻燈片
});

setupSlides(); // 初始化
startAutoSlides(); // 啟動自動輪播
