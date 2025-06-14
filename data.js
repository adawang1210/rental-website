// 定義地點座標和ID
export const locations = {
    ncu: { 
        id: 0,
        lat: 24.965484, 
        lng: 121.191116, 
        name: '中央大學後門'
    },
    nightMarket: { 
        id: 1,
        lat: 24.965871, 
        lng: 121.193606, 
        name: '宵夜街'
    },
    luxuryAlley: { 
        id: 2,
        lat: 24.966822, 
        lng: 121.192694, 
        name: '奢侈巷'
    }
};

// 模擬租屋資料
export const mockRentals = {
    rental1: {
        title: "溫馨套房 - 近中大後門",
        price: 8000,
        type: "套房",
        size: 7.5,
        floor: "2F / 5F",
        areaId: 0, // 後門
        description: "位於中央大學後門附近，走路5分鐘即可到校。房間採光良好，附基本家具（書桌、椅子、床架）。獨立衛浴，適合學生居住。",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        location: {
            lat: 24.965684,
            lng: 121.191316
        },
        amenities: ["冷氣", "冰箱", "Wi-Fi", "洗衣機", "熱水器"],
        available: true,
        contact: {
            name: "林小姐",
            phone: "0912-345-678"
        },
        rating: 4.5,
        reviews: [
            {
                author: "小明",
                rating: 4,
                text: "房東很好，環境乾淨，推薦！",
                date: "2024-03-15"
            },
            {
                author: "小華",
                rating: 5,
                text: "地點超方便，走路就能到學校",
                date: "2024-03-10"
            }
        ],
        features: {
            hasElevator: true,
            hasSeparateBathroom: true,
            canShortTerm: false,
            hasParking: true
        },
        favorites: 12
    },
    rental2: {
        title: "現代化套房 - 宵夜街",
        price: 9000,
        type: "套房",
        size: 8.0,
        floor: "3F / 5F",
        areaId: 1, // 宵夜街
        description: "位於熱鬧的宵夜街，生活機能極佳。房間全新裝潢，配備齊全。",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        location: {
            lat: 24.965971,
            lng: 121.193506
        },
        amenities: ["冷氣", "冰箱", "Wi-Fi", "洗衣機", "熱水器", "電視"],
        available: true,
        contact: {
            name: "王先生",
            phone: "0923-456-789"
        }
    },
    rental3: {
        title: "豪華套房 - 奢侈巷",
        price: 12000,
        type: "套房",
        size: 12.0,
        floor: "4F / 5F",
        areaId: 2, // 奢侈巷
        description: "位於高級住宅區，環境清幽。房間寬敞明亮，配備高級家具及家電。",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        location: {
            lat: 24.966722,
            lng: 121.192594
        },
        amenities: ["冷氣", "冰箱", "Wi-Fi", "洗衣機", "熱水器", "電視", "沙發"],
        available: true,
        contact: {
            name: "張先生",
            phone: "0934-567-890"
        }
    }
};

// 將資料上傳到 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzdE6ZxVrifrzAOP7OV1LsIcJj1QeehGY",
    authDomain: "rental-website-4da8f.firebaseapp.com",
    projectId: "rental-website-4da8f",
    storageBucket: "rental-website-4da8f.firebasestorage.app",
    messagingSenderId: "922669059596",
    appId: "1:922669059596:web:adeac316ceff6d78602829",
    measurementId: "G-Z7L3NFW4YZ",
    databaseURL: "https://rental-website-4da8f-default-rtdb.firebaseio.com"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 上傳資料函數
export function uploadData() {
    const rentalsRef = ref(database, 'rentals');
    return set(rentalsRef, mockRentals);
} 