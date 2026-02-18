# RobovApp 🏛️🤖

<div align="center">
  <p>
    <strong>
      <a href="#english">English</a> | <a href="#türkçe">Türkçe</a>
    </strong>
  </p>
  <p>
    🚀 <strong>Live Demo / Canlı Demo:</strong> <a href="https://robovapp.oglcn.dev">robovapp.oglcn.dev</a>
    <br/>
    <sub>Powered by Cloudflare Pages</sub>
  </p>
</div>

An interactive museum companion app designed for **museums** to enhance visitor experience through gamification, AI-powered guidance, and educational quizzes. This prototype has been piloted and tested at the **Köstem Zeytinyağı Müzesi** (Köstem Olive Oil Museum). Designed by **FLL Team #994 Robova**.

Ziyaretçi deneyimini oyunlaştırma, yapay zeka destekli rehberlik ve eğitici testlerle zenginleştirmek amacıyla **müzeler** için tasarlanmış etkileşimli bir müze arkadaşı uygulaması. Bu prototip **Köstem Zeytinyağı Müzesi**'nde pilot olarak uygulanmış ve test edilmiştir. **FLL Takımı #994 Robova** tarafından tasarlanmıştır.

---

<div id="english"></div>

## English

### Features ✨

- **🕵️ Treasure Hunt Mode**: Scan QR codes placed around the museum to find specific artifacts, unlock stories, and earn points.
- **🧠 Quiz Mode**: Test your knowledge about history and museum artifacts with varying difficulty levels.
- **🤖 Robo Assistant**: Your personal AI guide! Ask questions about any artifact or general history, powered by Google Gemini.
- **🏆 Leaderboard**: Compete with other visitors! Tracks top scores for both Treasure Hunt and Quiz modes.
- **🗣️ Text-to-Speech**: Listen to artifact descriptions and stories narrated by Robo Assistant.

### Tech Stack 🛠️

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **AI**: Google Gemini API (Chat & TTS)
- **Backend/Proxy**: Cloudflare Pages Functions
- **Persistence**: LocalStorage (Progress & Leaderboard)

### 🚀 Getting Started

#### Prerequisites
- Node.js (v18 or higher recommended)

#### Installation

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run Locally**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    ```

### 📱 QR Codes

To generate QR codes for the museum artifacts, open `generate-qr.html` in your browser. This utility generates print-ready QR codes linked to the specific artifact IDs used in the app.

---

<div id="türkçe"></div>

## Türkçe

### Özellikler ✨

- **🕵️ Hazine Avı Modu**: Belirli eserleri bulmak, hikayelerin kilidini açmak ve puan kazanmak için müzeye yerleştirilen QR kodlarını tarayın.
- **🧠 Bilgi Yarışması Modu**: Tarih ve müze eserleri hakkındaki bilginizi farklı zorluk seviyeleriyle test edin.
- **🤖 Robo Asistan**: Kişisel yapay zeka rehberiniz! Google Gemini tarafından desteklenen herhangi bir eser veya genel tarih hakkında sorular sorun.
- **🏆 Liderlik Tablosu**: Diğer ziyaretçilerle yarışın! Hem Hazine Avı hem de Bilgi Yarışması modları için en yüksek puanları takip eder.
- **🗣️ Metin Okuma (TTS)**: Robo Asistan tarafından seslendirilen eser açıklamalarını ve hikayelerini dinleyin.

### Teknoloji Yığını 🛠️

- **Önyüz**: React (Vite)
- **Stil**: Tailwind CSS, Lucide React (İkonlar)
- **Yapay Zeka**: Google Gemini API (Sohbet & TTS)
- **Arka Uç/Proxy**: Cloudflare Pages Functions
- **Kalıcılık**: LocalStorage (İlerleme & Liderlik Tablosu)

### 🚀 Başlarken

#### Gereksinimler
- Node.js (v18 veya üzeri önerilir)

#### Kurulum

1.  **Bağımlılıkları Yükleyin**:
    ```bash
    npm install
    ```

2.  **Ortam Kurulumu**:
    Kök dizinde `.env.local` adlı bir dosya oluşturun ve Google Gemini API anahtarınızı ekleyin:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Yerel Olarak Çalıştırma**:
    ```bash
    npm run dev
    ```

4.  **Üretim İçin Derleme (Build)**:
    ```bash
    npm run build
    ```

### 📱 QR Kodları

Müze eserleri için QR kodları oluşturmak üzere tarayıcınızda `generate-qr.html` dosyasını açın. Bu araç, uygulamada kullanılan özel eser kimliklerine bağlı baskıya hazır QR kodları oluşturur.

---

*Tested at the Köstem Zeytinyağı Müzesi.*
