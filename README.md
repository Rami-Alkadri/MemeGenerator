# Meme-Generator

A fun and interactive React web application that lets users upload an image, overlay random meme text (from a giant list of words and phrases), and download their own meme masterpiece!

## Live Demo

[🎬 Watch it live!](https://bellamy-bec44.web.app/)

---

## Features
- Upload your own image
- Generate meme text from 6.5 million randomized options
- Meme text drawn in classic meme style (bottom, bold, stroke)
- Handles large datasets dynamically loaded from remote sources
- Download your generated meme as a PNG image
- Fully deployable and shareable with friends!

---

## Technologies Used
- **React (Vite)** – Frontend framework  
- **Canvas API** – Image and text drawing  
- **Fetch API** – Load large datasets remotely  
- **External JSON hosting** – For large word lists  

---

## 🖥Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/Meme-Generator.git
cd Meme-Generator
````

### Install Dependencies

```bash
npm install
```

### Run the App Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---


## Project Structure

```
src/
├── components/
│   └── ImageUploader.jsx
├── data/
│   └── dictionaryWords.json (ignored in git)
│   └── wikiTitles.json (ignored in git)
public/
└── index.html
```

---

## Future Improvements

* Randomized image generation
* Paginate or stream large datasets
* Add multiple text styles and meme positions
* Support multiple file formats for download (e.g. JPEG, WebP)
* Let users input custom text

