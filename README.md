# FileHawk Website

A modern marketing website for FileHawk, the local semantic file search tool. Built with React, TypeScript, and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm package manager

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── docs/           # Documentation components
│   ├── Header.tsx      # Site navigation
│   ├── HeroV2.tsx      # Hero section
│   ├── Download.tsx    # Download section
│   └── Footer.tsx      # Site footer
├── pages/              # Page components
├── contexts/           # React contexts
└── App.tsx            # Main application
```

## Key Features

- **Responsive Design**: Mobile-first approach optimized for all devices
- **Theme Support**: Light and dark themes with user preference persistence
- **Documentation**: Comprehensive technical documentation and guides
- **Analytics**: Vercel Analytics integration for visitor tracking
- **SEO Optimized**: Meta tags and semantic HTML structure

## Development

### Available Scripts
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run TypeScript checks

### Tech Stack
- **React 18** - Component framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vercel Analytics** - Usage tracking

## Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically with default settings

### Other Platforms
The built application works on any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- **Content**: Edit components in `src/components/`
- **Styling**: Modify `tailwind.config.js` for design tokens
- **Routing**: Update routes in `src/App.tsx`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

See the main FileHawk repository for license details.