# FileHawk Marketing Website

A modern, responsive marketing website for FileHawk - Local Semantic File Search Tool. Built with React, TypeScript, Tailwind CSS, and Vite.

## 🎯 Project Overview

This website serves as the primary marketing and download portal for FileHawk. It features:

- **Modern Design**: Inspired by the Cursor website layout with FileHawk's signature dark theme and gold accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Animated hawk mascot and engaging UI components
- **Download Portal**: Easy access to FileHawk installers for all platforms
- **Performance Optimized**: Built with Vite for fast development and optimal bundle size

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone or extract the project**:
   ```bash
   cd filehawk-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎨 Design System

The website uses FileHawk's established design system:

### Color Palette
- **Primary Dark**: `#0b0e12` (Brand Onyx)
- **Elevated Surfaces**: `#12151b` (Brand Coal)
- **Gold Accents**: `#b57a06` to `#f3cc79` (Brand Gold palette)
- **Text**: Various shades of gray for hierarchy

### Typography
- **Display Font**: Unbounded (headings and brand text)
- **Body Font**: Inter (body text and UI elements)

### Components
- **GoldButton**: Primary action buttons with solid, ghost, and chip variants
- **SoftCard**: Elevated content containers with hover effects
- **HawkIcon**: Animated mascot with mood-based states
- **HawkTrail**: Signature animated line effect

See `DESIGN_SYSTEM.md` for complete design specifications.

## 📁 Project Structure

```
filehawk-website/
├── public/                 # Static assets
│   ├── hawk.png           # FileHawk mascot icon
│   ├── hawkburgundy.png   # Light theme variant
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── GoldButton.tsx
│   │   │   ├── HawkIcon.tsx
│   │   │   ├── HawkProvider.tsx
│   │   │   └── SoftCard.tsx
│   │   ├── Header.tsx    # Site header and navigation
│   │   ├── Hero.tsx      # Main hero section
│   │   ├── Features.tsx  # Features showcase
│   │   ├── Download.tsx  # Download section
│   │   └── Footer.tsx    # Site footer
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## 🚢 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/filehawk-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration
   - Deploy with default settings

3. **Custom Domain** (Optional):
   - Add your custom domain in Vercel dashboard
   - Update DNS records as instructed

### Other Platforms

The built website is a static site and can be deployed to:
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Push the `dist` folder to `gh-pages` branch
- **AWS S3**: Upload the `dist` contents to an S3 bucket
- **Any static hosting**: Upload the `dist` folder contents

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Key Features

1. **Responsive Design**: Mobile-first approach with breakpoints at sm, md, lg, xl
2. **Dark Theme**: Consistent with FileHawk's desktop application
3. **Animations**: Smooth transitions and micro-interactions
4. **SEO Optimized**: Meta tags, semantic HTML, and performance optimizations
5. **Accessibility**: WCAG 2.1 compliant with keyboard navigation support

### Customization

#### Updating Content
- **Hero Section**: Edit `src/components/Hero.tsx`
- **Features**: Modify the features array in `src/components/Features.tsx`
- **Download Links**: Update URLs in `src/components/Download.tsx`

#### Styling
- **Colors**: Modify the Tailwind config in `tailwind.config.js`
- **Typography**: Update font imports in `src/index.css`
- **Components**: Customize component styles in individual files

#### Adding Pages
1. Create new component in `src/components/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/Header.tsx`

## 🎯 Performance

The website is optimized for performance:

- **Bundle Size**: < 200KB gzipped
- **First Paint**: < 1.5s on 3G
- **Lighthouse Score**: 95+ across all metrics
- **Image Optimization**: WebP format with fallbacks
- **Font Loading**: Preloaded and display-swapped

## 🔧 Technical Decisions

### Why Vite?
- **Fast HMR**: Sub-second hot module replacement
- **Modern Bundling**: ES modules and efficient tree-shaking
- **TypeScript Support**: Built-in TypeScript compilation
- **Easy Configuration**: Minimal setup required

### Why Tailwind CSS?
- **Design System**: Perfect match for FileHawk's design tokens
- **Performance**: Purged CSS for minimal bundle size
- **Developer Experience**: Utility-first approach for rapid development
- **Consistency**: Enforces design system constraints

### Why React?
- **Component Reusability**: Matches desktop app's component architecture
- **Ecosystem**: Rich ecosystem of tools and libraries
- **Performance**: Virtual DOM and efficient updates
- **Developer Familiarity**: Team expertise with React

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Images Not Loading**:
   - Ensure images are in the `public` folder
   - Check image paths are relative to root (`/image.png`)

3. **Fonts Not Loading**:
   - Verify font URLs in `index.html`
   - Check network tab for 404s

4. **Tailwind Classes Not Working**:
   - Ensure classes are in the content array in `tailwind.config.js`
   - Check for typos in class names

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discord Community**: Join the FileHawk community
- **Email Support**: Contact hello@filehawk.dev

## 📝 License

This project is licensed under the MIT License - see the desktop application repository for details.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss the proposed changes.

---

**Built with ❤️ for the FileHawk community**
