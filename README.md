# Project Harshita — Customisation Guide

## How to Personalise

### 1. Add Your Photos
Replace placeholder cards with actual images. In `index.html`, inside each `.gallery-card`, find:
```html
<div class="gallery-placeholder" data-label="PHOTO_01">
```
And replace it with an `<img>` tag:
```html
<img src="photos/your-photo.jpg" alt="Caption for this memory" loading="lazy" />
```

Place your photos in a `photos/` folder.

### 2. Edit the Letter
In `script.js`, find the `CONFIG` object at the top and replace `LETTER_CONTENT`:
```js
LETTER_CONTENT: `Your heartfelt letter goes here...`,
```

### 3. Change the Sender Name
In `CONFIG`, update:
```js
SENDER_NAME: `Your Name Here`,
```

### 4. Change the Final Message
In `CONFIG`, update:
```js
FINAL_MESSAGE: `Your final message here...`,
```

### 5. Add Music
1. Create a `music/` folder
2. Place your MP3 file inside it as `birthday-song.mp3`
3. Done — the music button will work automatically.

### 6. Add Favourite Photo (Finale Section)
In `index.html`, find the `.finale-placeholder` div and replace it with:
```html
<img src="photos/favourite.jpg" alt="My favourite memory" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />
```

### 7. Update Gallery Captions
In `script.js`, update the `GALLERY_CAPTIONS` array in `CONFIG`:
```js
GALLERY_CAPTIONS: [
  "Your caption for photo 1",
  "Your caption for photo 2",
  // ... up to 20 captions
]
```

---

## File Structure
```
harshita/
├── index.html          ← Main page
├── style.css           ← All styles
├── script.js           ← All interactions
├── music/
│   └── birthday-song.mp3  ← Add your music here
├── photos/
│   ├── PHOTO_01.jpg    ← Add your photos here
│   └── ...
└── README.md           ← This file
```

---

Made with ❤️ for Harshita
