# Golden Link Admin - AI Coding Agent Instructions

## Project Overview
Next.js 16 admin panel for Golden Link with bilingual support (Arabic RTL as default, English). Uses App Router with internationalization at the route level (`/[lang]`).

## Critical Architecture Patterns

### Internationalization (i18n)
- **Route Structure**: All routes are under `/[lang]/(app)` or `/[lang]/{auth-pages}` where `lang` is `ar` (default/fallback) or `en`
- **Client-side i18n**: Use `useDict()` hook in client components to access translations from `src/config/i18n/locales/{ar,en}.json`
- **Language Detection**: `useLang()` hook returns current language from URL params
- **Font Switching**: Arabic uses Expo Arabic font, English uses Inter - switched automatically in root layout based on lang
- **Recent Cleanup**: ~300+ duplicate translation keys were consolidated into `common.*` sections (see `docs/i18n-cleanup/`)
  - Use `dict.common.actions.*` for buttons (cancel, save, delete, etc.)
  - Use `dict.common.fields.*` for form fields (email, phone, etc.)
  - Use `dict.common.statuses.*` for status labels

### API & Authentication
- **Proxy Pattern**: Client makes requests to `/api/proxy/[...proxyPath]` which forwards to backend via Next.js API route
- **Base Client**: `src/utils/axios.client.ts` handles auth token refresh automatically before expiry (10s buffer)
- **Tokens**: Stored in cookies - `accessToken`, `refreshToken`, `accessTokenExpiry`
- **Middleware**: `src/proxy.ts` (note: named `proxy` not `middleware`) handles:
  - Locale detection and redirect
  - Authentication checks via `/admin/auth/profile` endpoint
  - Pre-auth pages: login, forgot-password, verify-reset-code, reset-password
- **Service Layer**: All API calls go through service classes in `src/services/*.service.ts`
  - Use static methods: `UserService.getUsers(params, lang?)`
  - Returns typed responses or null on error
  - File uploads use FormData with `multipart/form-data` content type

### State Management
- **React Query**: `@tanstack/react-query` for server state (see `src/config/app.provider.tsx`)
  - Query client config: `staleTime: 0`, `retry: false` (in `src/utils/query.client.ts`)
  - Use `useQuery` for fetches, `useMutation` for mutations
- **URL State**: `nuqs` library for URL-based state (filters, pagination, modals)
  - Example: `const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))`
  - Wrapped with `NuqsAdapter` in app provider

### Component Architecture
- **Server vs Client**: 
  - Page components (`src/app/[lang]/(app)/**/page.tsx`) are server components by default
  - UI components are client components with `"use client"` directive
  - Hooks (useDict, useLang, useMe, etc.) require `"use client"`
- **UI Library**: HeroUI (fork of NextUI) - import from `@heroui/react`
  - Custom wrappers in `src/components/app/shared/` (FormInput, PrimaryButton, etc.)
- **SVG Imports**: Configure via `@svgr/webpack` - import as React components
  - Type definition in `src/types/global.d.ts`
  - Used extensively: `import LogoIcon from "@/assets/icons/logo.horizontal.svg"`

### Styling & Theming
- **Tailwind**: Uses Tailwind 4 with PostCSS
- **Font Handling**: Different fonts for Arabic (cairo, sar, expoArabic) and English (inter)
  - Check language before applying font classes: `lang === "en" ? inter.className : expoArabic.className`
- **RTL Support**: Handled automatically via `dir={dir(lang)}` in root layout
- **Theme**: Dark/light mode via `next-themes` provider

## Development Workflows

### Running the Project
```bash
pnpm dev              # Start dev server (Next.js with Turbopack)
pnpm build            # Production build
pnpm lint             # Run ESLint
```

### Key Environment Variables
- `API_BASE_URL` or `NEXT_PUBLIC_API_BASE_URL`: Backend API endpoint (e.g., `https://backend.goldenlink.moltaqadev.com`)

### File Upload Pattern
When creating/updating resources with files:
1. Create FormData object
2. Append file with specific field name (e.g., `profileImage`)
3. Append other fields as strings
4. Set `Content-Type: multipart/form-data` header
5. Pass language via `Accept-Language` header

Example from `UserService.createUser`:
```typescript
const formData = new FormData();
if (data.profileImage) formData.append("profileImage", data.profileImage);
formData.append("fullName", data.fullName);
// ...
const response = await axiosClient.post("/users", formData, {
  headers: { "Content-Type": "multipart/form-data", "Accept-Language": lang }
});
```

### Error Handling & Messages
- Use `showErrorMessage(msg)` and `showSuccessMessage(msg)` from `src/utils/show.message.ts`
- Uses HeroUI toast system (`addToast`)
- Extract errors: `extractAxiosErrorMessage(error, fallback)` from `src/utils/http.ts`

## Project-Specific Conventions

### Import Aliases
- `@/*` maps to `src/*`
- `*.svg` imports are typed as React components

### Feature Modules
Main admin sections in `src/app/[lang]/(app)/`:
- `admins/` - Admin user management
- `subscribers/` - Subscriber management
- `notifications/` - Push notifications
- `content/` - Content management
- `settings/` - App settings

Each typically has:
- Page component (server)
- Main component (client, e.g., `Subscribers.tsx`)
- Detail views, filters, modals in subdirectories

### Permissions
- Use `usePermissions()` hook for fetching user permissions
- Use `useMe()` hook to get current admin profile

### Package Manager
- **MUST use pnpm** (specified in `package.json` with `packageManager: "pnpm@10.25.0"`)
- Special build dependencies configured in `pnpm.onlyBuiltDependencies`

## Common Pitfalls
1. Don't create `middleware.ts` - the file is `src/proxy.ts` and exported from there
2. All pages need lang param: `export default async function Page({ params }: { params: Promise<{ lang: string }> })`
3. Client hooks (useDict, useLang) only work in client components
4. SVG imports need `@svgr/webpack` loader (configured in `next.config.ts` turbopack rules)
5. When using translations, check `docs/i18n-cleanup/` for common keys to avoid duplicates
