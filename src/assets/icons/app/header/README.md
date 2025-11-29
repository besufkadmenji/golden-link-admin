# Header Navigation Icons

This folder contains all SVG icons extracted from the Figma design for the header/top navigation bar.

## Icon List

### Navigation Controls
- `chevron-down.svg` - Dropdown indicator icon
- `search.svg` - Search icon

### Notification System
- `notification-bell.svg` - Main notification bell icon
- `notification-badge.svg` - Notification badge/count indicator
- `notification-dot-bg.svg` - Notification dot background

### Theme Toggle
- `sun.svg` - Light mode/sun icon
- `moon.svg` - Dark mode/moon icon

## Usage

### Import individual icons:
```typescript
import ChevronDownIcon from '@/assets/icons/app/header/chevron-down.svg';
```

### Import from index:
```typescript
import { 
  ChevronDownIcon,
  NotificationBellIcon,
  SunIcon,
  MoonIcon 
} from '@/assets/icons/app/header';
```

## Notes
- All icons are in SVG format
- Icons use `fill="currentColor"` and `stroke="currentColor"` for easy color theming via CSS
- Color can be controlled using the `color` CSS property on the parent element
- Example: `<div className="text-blue-500"><NotificationBellIcon /></div>` will render a blue icon
