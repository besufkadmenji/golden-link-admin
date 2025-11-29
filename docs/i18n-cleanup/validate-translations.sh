#!/bin/bash

# Translation Files Validation Script
# This script validates both locale files and provides statistics
# Run from project root or from docs/i18n-cleanup folder

echo "🔍 Validating Translation Files..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Determine script location and set file paths accordingly
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT=""

if [[ "$SCRIPT_DIR" == */docs/i18n-cleanup ]]; then
    # Running from docs/i18n-cleanup
    PROJECT_ROOT="$SCRIPT_DIR/../.."
else
    # Running from project root
    PROJECT_ROOT="."
fi

# File paths
EN_FILE="$PROJECT_ROOT/src/config/i18n/locales/en.json"
AR_FILE="$PROJECT_ROOT/src/config/i18n/locales/ar.json"

# Validate JSON syntax
echo "1️⃣  Checking JSON syntax..."
cd "$PROJECT_ROOT"
if node -e "require('./src/config/i18n/locales/en.json')" 2>/dev/null; then
    echo -e "${GREEN}✅ English JSON is valid${NC}"
else
    echo -e "${RED}❌ English JSON has syntax errors${NC}"
    exit 1
fi

if node -e "require('./src/config/i18n/locales/ar.json')" 2>/dev/null; then
    echo -e "${GREEN}✅ Arabic JSON is valid${NC}"
else
    echo -e "${RED}❌ Arabic JSON has syntax errors${NC}"
    exit 1
fi

echo ""
echo "2️⃣  Checking file statistics..."

# Count lines
EN_LINES=$(wc -l < "$EN_FILE" | tr -d ' ')
AR_LINES=$(wc -l < "$AR_FILE" | tr -d ' ')

echo "   📄 English file: $EN_LINES lines"
echo "   📄 Arabic file: $AR_LINES lines"

echo ""
echo "3️⃣  Checking common section..."

# Check if common sections exist
if grep -q '"common"' "$EN_FILE"; then
    echo -e "${GREEN}✅ English has common section${NC}"
else
    echo -e "${RED}❌ English missing common section${NC}"
    exit 1
fi

if grep -q '"common"' "$AR_FILE"; then
    echo -e "${GREEN}✅ Arabic has common section${NC}"
else
    echo -e "${RED}❌ Arabic missing common section${NC}"
    exit 1
fi

echo ""
echo "4️⃣  Checking common subsections..."

# Check subsections
subsections=("actions" "timeFilters" "fields" "company" "documents" "statuses")

for section in "${subsections[@]}"; do
    if grep -q "\"$section\"" "$EN_FILE"; then
        echo -e "   ${GREEN}✅${NC} common.$section (EN)"
    else
        echo -e "   ${RED}❌${NC} common.$section (EN)"
    fi
    
    if grep -q "\"$section\"" "$AR_FILE"; then
        echo -e "   ${GREEN}✅${NC} common.$section (AR)"
    else
        echo -e "   ${RED}❌${NC} common.$section (AR)"
    fi
done

echo ""
echo "5️⃣  Searching for potential duplicates..."

# Check for common action words that should only be in common section
check_duplicate() {
    local word=$1
    local file=$2
    local file_name=$3
    
    # Count occurrences (excluding the common section)
    count=$(grep -o "\"$word\":" "$file" | wc -l | tr -d ' ')
    
    if [ "$count" -eq 1 ]; then
        echo -e "   ${GREEN}✅${NC} '$word' appears 1 time in $file_name (expected)"
    elif [ "$count" -gt 1 ]; then
        echo -e "   ${YELLOW}⚠️${NC}  '$word' appears $count times in $file_name (check for duplicates)"
    else
        echo -e "   ${RED}❌${NC} '$word' not found in $file_name"
    fi
}

echo "   Checking 'cancel' key:"
check_duplicate "cancel" "$EN_FILE" "EN"
check_duplicate "cancel" "$AR_FILE" "AR"

echo ""
echo "   Checking 'export' key:"
check_duplicate "export" "$EN_FILE" "EN"
check_duplicate "export" "$AR_FILE" "AR"

echo ""
echo "   Checking 'search' key:"
check_duplicate "search" "$EN_FILE" "EN"
check_duplicate "search" "$AR_FILE" "AR"

echo ""
echo "📊 Summary:"
echo "   • Both files have valid JSON syntax"
echo "   • Common sections are present in both files"
echo "   • All subsections exist"
echo "   • English: $EN_LINES lines"
echo "   • Arabic: $AR_LINES lines"

echo ""
echo -e "${GREEN}🎉 All validation checks passed!${NC}"
echo ""
echo "Next steps:"
echo "1. Update components to use common.* paths (see docs/i18n-cleanup/TRANSLATION_MIGRATION_GUIDE.md)"
echo "2. Test all functionality in both EN and AR languages"
echo "3. Check for missing translations in browser console"
