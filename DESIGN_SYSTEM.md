# Filehawk Design System

## Overview
This document captures the key design elements extracted from the Filehawk desktop application to ensure consistency in the marketing website.

## Color Palette

### Primary Colors
- **Brand Onyx**: `#0b0e12` - Main background
- **Brand Coal**: `#12151b` - Elevated surfaces
- **Brand Border**: `#20242d` - Borders and dividers

### Gold Accent Colors
- **Gold 950**: `#4a2e00`
- **Gold 900**: `#5a3a00`
- **Gold 800**: `#7a5200`
- **Gold 700**: `#946300`
- **Gold 600**: `#b57a06` - Primary accent
- **Gold 500**: `#d39a25`
- **Gold 400**: `#e7b650`
- **Gold 300**: `#f3cc79` - Light accent
- **Gold 200**: `#f7dfa8`
- **Gold 100**: `#fff2cd`
- **Gold 50**: `#fffaf5`

### Neutral Colors
- **Text Primary**: `#e5e7eb`
- **Text Secondary**: `#d1d5db`
- **Text Muted**: `#9ca3af`

### Semantic Colors
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`
- **Info**: `#3b82f6`

## Typography

### Font Families
- **Display Font**: `'Unbounded', 'Cinzel', 'EFCO', 'Trajan Pro', serif`
- **Sans Serif**: `'Inter', system-ui, -apple-system, sans-serif`

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
- ExtraBold: 800

## Components

### Buttons
1. **Gold Button Variants**:
   - `solid`: Gold gradient background with dark text
   - `ghost`: Transparent background with gold border and text
   - `chip`: Small size with subtle gold background

2. **Sizes**:
   - `sm`: `px-2.5 py-1.5 text-[12px]`
   - `md`: `px-3.5 py-2 text-[13px]`
   - `lg`: `px-5 py-2.5 text-sm`

### Cards
- **Soft Card**: Elevated background with subtle border
- Background: `var(--bg-elevated)`
- Border: `1px solid var(--border-subtle)`
- Border radius: `6px`

### Chips/Badges
- Multiple semantic variants (success, warning, error, info, muted)
- Rounded corners and semi-transparent backgrounds

## Animations

### Key Animations
1. **Hawk Trail**: Animated golden line effect
2. **Fade In**: `0.3s ease-in-out`
3. **Slide Up**: `0.2s ease-out`
4. **Gold Shimmer**: `3s ease-in-out infinite`
5. **Gentle Bounce**: `2s infinite`

### Keyframes
- `fadeIn`: Opacity and translate Y animation
- `slideUp`: Subtle upward motion with opacity
- `hawkTrailGrow`: Width expansion animation
- `goldShimmer`: Scale and opacity pulsing

## Spacing System
- Compact spacing utilities
- Consistent margins and padding
- 4px base unit system

## Shadows
- **Subtle**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Soft**: `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Medium**: `0 2px 8px rgba(0, 0, 0, 0.1)`
- **Gold Glow**: `0 0 10px rgba(245, 166, 35, 0.3)`

## Brand Elements

### Hawk Icon
- Available in light and dark variants
- Default size: 24px
- SVG format for scalability

### Brand Header
- "FileHawk" in display font
- "Local Semantic Search" tagline in uppercase with letter spacing

### Interactive States
- Hover effects with scale transforms
- Focus states with gold ring outlines
- Active states with subtle press animations

## Layout Principles
- Dark theme by default
- Elevated surfaces for content organization
- Gold accents for primary actions and highlights
- Consistent spacing and typography scale
- Responsive design with mobile-first approach
