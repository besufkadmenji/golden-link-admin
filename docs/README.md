# Documentation

This folder contains project documentation organized by topic.

## 📁 Structure

### `/i18n-cleanup/`
Documentation for the i18n translation cleanup completed on November 10, 2025.

**Files:**
- `I18N_CLEANUP_README.md` - Quick start guide
- `CLEANUP_SUMMARY.md` - Complete overview and statistics
- `TRANSLATION_MIGRATION_GUIDE.md` - Detailed component update guide (400+ lines)
- `CLEANUP_PROGRESS.md` - Detailed progress tracking
- `validate-translations.sh` - Validation script for locale files

**Quick Links:**
- [Start Here - Overview](./i18n-cleanup/I18N_CLEANUP_README.md)
- [Migration Guide](./i18n-cleanup/TRANSLATION_MIGRATION_GUIDE.md)
- [Summary](./i18n-cleanup/CLEANUP_SUMMARY.md)

**Validate Translations:**
```bash
./docs/i18n-cleanup/validate-translations.sh
```

---

## 📝 Adding New Documentation

When adding new documentation:
1. Create a topic-specific subfolder (e.g., `/api-docs/`, `/deployment/`)
2. Add a README.md in that folder
3. Update this main README with links
4. Keep documentation close to code when appropriate
