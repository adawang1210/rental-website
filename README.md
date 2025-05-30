# 中央大學周邊租屋地圖

這是一個互動式的網頁應用程式，旨在幫助中央大學的學生更容易找到周邊的租屋資訊。專案使用純 JavaScript 開發，結合 OpenStreetMap 提供地圖服務，並使用 Firebase Realtime Database 作為後端數據存儲。

## 功能特點

- 📍 互動式地圖顯示租屋位置
- 🏠 三大熱門租屋區域：
  - 中央大學後門
  - 宵夜街
  - 奢侈巷
- 📝 完整的租屋資訊管理系統
- 🔍 依區域篩選租屋資訊
- 📱 響應式設計，支援各種裝置

## 技術架構

- 前端：HTML5, CSS3, JavaScript (ES6+)
- 地圖：OpenStreetMap
- 後端：Firebase Realtime Database
- 部署：GitHub Pages

## 本地開發

1. 克隆專案：
```bash
git clone [你的 GitHub 倉庫 URL]
```

2. 安裝依賴：
本專案為純前端專案，無需安裝額外依賴。

3. 啟動開發伺服器：
可以使用任何靜態文件伺服器，例如：
```bash
python -m http.server 8000
```
或使用 VS Code 的 Live Server 擴展。

4. 開啟瀏覽器訪問：
```
http://localhost:8000
```

## 專案結構

```
Rental website/
├── index.html          # 主頁面（地圖顯示）
├── upload.html         # 租屋資訊上傳頁面
├── data.js            # 資料模型和 Firebase 配置
├── styles/            # CSS 樣式文件
└── README.md          # 專案文檔
```

## 資料結構

租屋資訊包含以下欄位：
- 標題 (title)
- 價格 (price)
- 類型 (type)
- 坪數 (size)
- 樓層 (floor)
- 區域ID (areaId)
- 描述 (description)
- 圖片URL (imageUrl)
- 位置資訊 (location)
  - 緯度 (lat)
  - 經度 (lng)
- 設備清單 (amenities)
- 可租狀態 (available)
- 聯絡資訊 (contact)
  - 姓名 (name)
  - 電話 (phone)

## 區域座標資訊

- 中央大學後門 (ID: 0)
  - 緯度：24.965484
  - 經度：121.191116

- 宵夜街 (ID: 1)
  - 緯度：24.965871
  - 經度：121.193606

- 奢侈巷 (ID: 2)
  - 緯度：24.966822
  - 經度：121.192694

## 注意事項

1. 請確保上傳的租屋資訊準確完整
2. 圖片請使用有效的 URL 連結
3. 座標資訊需要精確到小數點後 6 位
4. 請勿上傳虛假或誤導性的租屋資訊

## 貢獻指南

歡迎提交 Pull Request 或開設 Issue 來改進這個專案。在提交之前，請確保：

1. 程式碼遵循現有的風格規範
2. 更新相關的文檔
3. 測試所有功能正常運作

## 授權協議

本專案採用 MIT 授權協議。詳見 [LICENSE](LICENSE) 文件。 