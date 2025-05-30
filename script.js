// 租屋資料庫（模擬資料）
const rentalProperties = [
    {
        id: 1,
        title: "溫馨雅房 - 近中大後門",
        price: 8500,
        distance: 350,
        type: "套房",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        description: "位於中大後門附近，步行5分鐘即可到校。房間採光良好，附基本家具，適合學生居住。",
        position: { x: 25, y: 30 },
        reviews: [
            {
                author: "小明",
                rating: 4,
                text: "房東很好，環境乾淨，推薦！",
                date: "2024-11-15"
            },
            {
                author: "小華",
                rating: 5,
                text: "地點超方便，走路就能到學校",
                date: "2024-11-10"
            }
        ]
    },
    {
        id: 2,
        title: "學生公寓 - 中豐路",
        price: 12000,
        distance: 800,
        type: "1房1廳",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
        description: "全新裝潢學生公寓，提供完整生活機能，包含洗衣機、冰箱、網路等設備。",
        position: { x: 60, y: 45 },
        reviews: [
            {
                author: "阿美",
                rating: 5,
                text: "設備齊全，管理很好！",
                date: "2024-11-12"
            }
        ]
    },
    {
        id: 3,
        title: "經濟實惠雅房",
        price: 6500,
        distance: 1200,
        type: "雅房",
        rating: 3.8,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
        description: "價格親民的學生住宿選擇，基本設備完善，適合預算有限的同學。",
        position: { x: 75, y: 25 },
        reviews: [
            {
                author: "小李",
                rating: 4,
                text: "CP值不錯，房東人很好",
                date: "2024-11-08"
            }
        ]
    },
    {
        id: 4,
        title: "高級套房 - 近商圈",
        price: 15000,
        distance: 600,
        type: "套房",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop",
        description: "位於熱鬧商圈附近，生活機能佳。房間寬敞舒適，適合喜歡便利生活的學生。",
        position: { x: 40, y: 60 },
        reviews: [
            {
                author: "小王",
                rating: 5,
                text: "超棒的住宿環境！",
                date: "2024-11-20"
            }
        ]
    },
    {
        id: 5,
        title: "共享公寓 - 志清湖旁",
        price: 9800,
        distance: 450,
        type: "套房",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
        description: "位於美麗的志清湖畔，環境清幽。公共空間寬敞，適合喜歡安靜環境的學生。",
        position: { x: 15, y: 50 },
        reviews: [
            {
                author: "小張",
                rating: 4,
                text: "環境很棒，很安靜適合讀書",
                date: "2024-11-18"
            }
        ]
    }
];

// 全域變數
let currentProperty = null;
let currentRating = 0;
let favorites = [];
let filteredProperties = [...rentalProperties];

// 初始化頁面
document.addEventListener('DOMContentLoaded', function() {
    initializeStarRating();
    loadFavorites();
});

// 開始找房功能
function startFindingHouse() {
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('mapSection').style.display = 'block';
    renderMarkers();
}

// 渲染地圖標記
function renderMarkers() {
    const markersContainer = document.getElementById('mapMarkers');
    markersContainer.innerHTML = '';
    
    filteredProperties.forEach(property => {
        const marker = document.createElement('div');
        marker.className = 'marker';
        marker.style.left = property.position.x + '%';
        marker.style.top = property.position.y + '%';
        marker.dataset.propertyId = property.id;
        marker.onclick = () => showPropertyInfo(property.id);
        
        markersContainer.appendChild(marker);
    });
}

// 顯示房屋資訊
function showPropertyInfo(propertyId) {
    const property = rentalProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    currentProperty = property;
    
    // 隱藏預設訊息，顯示詳細資訊
    document.getElementById('defaultMessage').style.display = 'none';
    document.getElementById('infoContent').classList.add('active');
    
    // 填入房屋資訊
    document.getElementById('propertyImage').src = property.image;
    document.getElementById('propertyTitle').textContent = property.title;
    document.getElementById('propertyPrice').textContent = `NT$ ${property.price.toLocaleString()}`;
    document.getElementById('propertyDistance').textContent = `${property.distance}m`;
    document.getElementById('propertyType').textContent = property.type;
    document.getElementById('propertyDescription').textContent = property.description;
    
    // 顯示評分
    const stars = '★'.repeat(Math.floor(property.rating)) + '☆'.repeat(5 - Math.floor(property.rating));
    document.getElementById('propertyRating').textContent = stars;
    document.getElementById('ratingText').textContent = `(${property.rating})`;
    
    // 更新收藏按鈕狀態
    updateFavoriteButton(propertyId);
    
    // 顯示評價列表
    renderReviews(property.reviews);
    
    // 重置評價表單
    resetReviewForm();
}

// 渲染評價列表
function renderReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');
    const reviewsContainer = reviewsList.querySelector('#reviewsList') || reviewsList;
    
    if (reviews && reviews.length > 0) {
        const reviewsHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');
        
        reviewsContainer.innerHTML = '<h4>其他學生的評價</h4>' + reviewsHTML;
    } else {
        reviewsContainer.innerHTML = '<h4>其他學生的評價</h4><p style="color: #666; text-align: center; padding: 20px;">尚無評價，成為第一個評價的人！</p>';
    }
}

// 初始化星級評分系統
function initializeStarRating() {
    const starButtons = document.querySelectorAll('.star-btn');
    
    starButtons.forEach((star, index) => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            updateStarDisplay();
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.dataset.rating);
            highlightStars(hoverRating);
        });
    });
    
    // 滑鼠離開時恢復當前評分顯示
    document.querySelector('.rating-input').addEventListener('mouseleave', function() {
        updateStarDisplay();
    });
}

// 更新星星顯示
function updateStarDisplay() {
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// 高亮星星（滑鼠懸停效果）
function highlightStars(rating) {
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// 提交評價
function submitReview() {
    if (!currentProperty) {
        alert('請先選擇一個房屋！');
        return;
    }
    
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (currentRating === 0) {
        alert('請選擇評分星數！');
        return;
    }
    
    if (reviewText === '') {
        alert('請填寫評價內容！');
        return;
    }
    
    // 模擬提交到Firebase（實際應用中會連接真實資料庫）
    const newReview = {
        author: '匿名學生',
        rating: currentRating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    };
    
    // 添加評價到當前房屋
    const propertyIndex = rentalProperties.findIndex(p => p.id === currentProperty.id);
    if (propertyIndex !== -1) {
        rentalProperties[propertyIndex].reviews.push(newReview);
        
        // 重新計算平均評分
        const reviews = rentalProperties[propertyIndex].reviews;
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        rentalProperties[propertyIndex].rating = Math.round(avgRating * 10) / 10;
        
        // 更新顯示
        showPropertyInfo(currentProperty.id);
        
        // 顯示成功訊息
        showSuccessMessage('評價提交成功！感謝您的分享 ✨');
    }
    
    console.log('模擬Firebase寫入:', newReview);
}

// 收藏/取消收藏
function toggleFavorite() {
    if (!currentProperty) return;
    
    const propertyId = currentProperty.id;
    const index = favorites.indexOf(propertyId);
    
    if (index === -1) {
        favorites.push(propertyId);
        showSuccessMessage('已加入收藏 ❤️');
    } else {
        favorites.splice(index, 1);
        showSuccessMessage('已取消收藏');
    }
    
    updateFavoriteButton(propertyId);
    saveFavorites();
    
    console.log('模擬Firebase收藏狀態更新:', { propertyId, favorites });
}

// 更新收藏按鈕狀態
function updateFavoriteButton(propertyId) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const isFavorited = favorites.includes(propertyId);
    
    if (isFavorited) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.textContent = '💚 已收藏';
    } else {
        favoriteBtn.classList.remove('favorited');
        favoriteBtn.textContent = '❤️ 收藏';
    }
}

// 儲存收藏到本地存儲（模擬Firebase）
function saveFavorites() {
    // 在實際應用中，這裡會連接Firebase
    // 暫時使用localStorage模擬
    try {
        localStorage.setItem('rentalFavorites', JSON.stringify(favorites));
    } catch (e) {
        console.log('無法儲存收藏資料');
    }
}

// 載入收藏資料
function loadFavorites() {
    try {
        const saved = localStorage.getItem('rentalFavorites');
        if (saved) {
            favorites = JSON.parse(saved);
        }
    } catch (e) {
        console.log('無法載入收藏資料');
        favorites = [];
    }
}

// 顯示成功訊息
function showSuccessMessage(message) {
    // 移除現有的成功訊息
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 創建新的成功訊息
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // 插入到評價表單前面
    const reviewForm = document.querySelector('.review-form');
    reviewForm.parentNode.insertBefore(successDiv, reviewForm);
    
    // 3秒後自動移除
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// 重置評價表單
function resetReviewForm() {
    currentRating = 0;
    document.getElementById('reviewText').value = '';
    updateStarDisplay();
}

// 篩選功能
function applyFilters() {
    const priceFilter = document.getElementById('priceFilter').value;
    const distanceFilter = document.getElementById('distanceFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    
    filteredProperties = rentalProperties.filter(property => {
        // 價格篩選
        if (priceFilter) {
            if (priceFilter === '16000+') {
                if (property.price < 16000) return false;
            } else {
                const [min, max] = priceFilter.split('-').map(Number);
                if (property.price < min || property.price > max) return false;
            }
        }
        
        // 距離篩選
        if (distanceFilter) {
            if (distanceFilter === '1000+') {
                if (property.distance < 1000) return false;
            } else {
                const [min, max] = distanceFilter.split('-').map(Number);
                if (property.distance < min || property.distance > max) return false;
            }
        }
        
        // 評分篩選
        if (ratingFilter) {
            const minRating = parseFloat(ratingFilter);
            if (property.rating < minRating) return false;
        }
        
        return true;
    });
    
    // 重新渲染標記
    renderMarkers();
    
    // 如果當前顯示的房屋被篩選掉了，隱藏詳細資訊
    if (currentProperty && !filteredProperties.find(p => p.id === currentProperty.id)) {
        hidePropertyInfo();
    }
}

// 隱藏房屋資訊
function hidePropertyInfo() {
    document.getElementById('defaultMessage').style.display = 'block';
    document.getElementById('infoContent').classList.remove('active');
    currentProperty = null;
}

// 模擬Firebase連接函式
function simulateFirebaseWrite(data, collection) {
    console.log(`模擬寫入Firebase ${collection}:`, data);
    
    // 在實際應用中，這裡會是真正的Firebase寫入邏輯
    // 例如：
    // import { db } from './firebase-config.js';
    // import { collection, addDoc } from 'firebase/firestore';
    // 
    // try {
    //     const docRef = await addDoc(collection(db, collection), data);
    //     console.log("Document written with ID: ", docRef.id);
    //     return docRef.id;
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    //     throw e;
    // }
    
    return Promise.resolve('mock-doc-id-' + Date.now());
}

// 模擬Firebase讀取函式
function simulateFirebaseRead(collection, docId) {
    console.log(`模擬從Firebase讀取 ${collection}/${docId}`);
    
    // 在實際應用中，這裡會是真正的Firebase讀取邏輯
    // 例如：
    // import { db } from './firebase-config.js';
    // import { doc, getDoc } from 'firebase/firestore';
    // 
    // try {
    //     const docRef = doc(db, collection, docId);
    //     const docSnap = await getDoc(docRef);
    //     
    //     if (docSnap.exists()) {
    //         return docSnap.data();
    //     } else {
    //         console.log("No such document!");
    //         return null;
    //     }
    // } catch (e) {
    //     console.error("Error getting document: ", e);
    //     throw e;
    // }
    
    return Promise.resolve(null);
}

// 工具函式：格式化日期
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('zh-TW', options);
}

// 工具函式：計算距離標籤
function getDistanceLabel(distance) {
    if (distance < 500) return '超近';
    if (distance < 1000) return '很近';
    if (distance < 1500) return '適中';
    return '較遠';
}

// 鍵盤快捷鍵支援
document.addEventListener('keydown', function(e) {
    // ESC鍵關閉詳細資訊
    if (e.key === 'Escape' && currentProperty) {
        hidePropertyInfo();
    }
    
    // Enter鍵提交評價（當在評價輸入框中時）
    if (e.key === 'Enter' && e.target.id === 'reviewText' && e.ctrlKey) {
        e.preventDefault();
        submitReview();
    }
});

// 頁面載入完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('租屋快找通系統已載入完成！');
    console.log('系統功能：');
    console.log('- 🗺️  互動式地圖瀏覽');
    console.log('- 🏠  房屋詳細資訊展示');
    console.log('- ⭐  評價與評分系統');
    console.log('- ❤️  收藏功能');
    console.log('- 🔍  多條件篩選');
    console.log('- 📱  響應式設計');
    
    // 檢查是否有儲存的收藏
    if (favorites.length > 0) {
        console.log(`已載入 ${favorites.length} 個收藏項目`);
    }
});