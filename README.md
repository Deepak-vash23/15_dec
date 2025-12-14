# Anniversary Surprise 💕🦋

A romantic, multi-page web application to celebrate your 4-month anniversary with beautiful animations, physics effects, and a butterfly theme.

## Features

- **Landing Page**: Interactive jar with butterflies trapped inside using Matter.js physics
- **Love Letter Page**: Elegant card with a handwritten-style message
- **Memory Lane**: Polaroid-style photo gallery with hover effects
- **Final Surprise**: Beating heart animation with personalized message

## Tech Stack

- React 18 (Functional Components & Hooks)
- Tailwind CSS (Styling)
- Framer Motion (Animations & Transitions)
- Matter.js (Physics Engine)
- Lucide React (Icons)
- React Router (Navigation)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## Customization

### Change Her Name

Edit `src/components/FinalSurprise.jsx` and update the `HER_NAME` constant:
```javascript
const HER_NAME = 'Your Girlfriend\'s Name'
```

### Add Your Photos

1. Create a folder `src/assets/photos/` and add your photos there
2. Edit `src/components/MemoryLane.jsx` and replace the placeholder images:

```javascript
// Example:
import photo1 from '../assets/photos/memory1.jpg'
import photo2 from '../assets/photos/memory2.jpg'

const memories = [
  {
    id: 1,
    imageSrc: photo1,  // Use your imported image
    caption: 'Our first date 💕',
  },
  // ... more memories
]
```

### Customize the Love Letter

Edit the message in `src/components/LetterPage.jsx` to personalize it for your relationship.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy to any static hosting service.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Jar with physics butterflies
│   │   ├── LetterPage.jsx       # Love letter card
│   │   ├── MemoryLane.jsx       # Photo gallery
│   │   ├── PhotoCard.jsx        # Polaroid photo component
│   │   ├── FinalSurprise.jsx    # Beating heart page
│   │   └── ButterflyBackground.jsx  # Floating butterflies
│   ├── App.jsx                  # Main app with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
└── README.md
```

## Notes

- The butterflies in the jar use Matter.js physics and will bounce around realistically
- All animations are smooth and use Framer Motion for professional transitions
- The color palette uses soft pastels for a dreamy, romantic feel
- The app is fully responsive and works on mobile devices

Enjoy creating this special surprise! 💕

