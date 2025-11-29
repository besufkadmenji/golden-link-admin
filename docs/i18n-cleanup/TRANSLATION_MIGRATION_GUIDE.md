# Translation Keys Migration Guide

## Overview
This guide documents all translation keys that have been moved to the `common` section to eliminate duplication across the codebase.

## How to Use This Guide
When updating components, replace the old translation paths with the new `common.*` paths as shown below.

---

## 🔄 Action Buttons & Controls

### Moved to: `common.actions.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.cancel` | `common.actions.cancel` | Cancel | الغاء |
| `*.export` | `common.actions.export` | Export | تصدير |
| `*.search` | `common.actions.search` | Search | البحث |
| `*.print` | `common.actions.print` | Print | طباعة |
| `*.download` | `common.actions.download` | Download | تحميل |
| `*.upload` | `common.actions.upload` | Upload | تحميل |
| `*.add` | `common.actions.add` | Add | اضافة |
| `*.save` | `common.actions.save` | Save | حفظ |
| `*.filter` | `common.actions.filter` | Filter | تصفية |
| `*.next` | `common.actions.next` | Next | التالي |
| `*.confirm` | `common.actions.confirm` | Confirm | تأكيد |
| `*.action` | `common.actions.action` | Action | الاجراء |
| `*.actions` | `common.actions.actions` | Actions | الاجراء |
| `*.saveAndPrint` | `common.actions.saveAndPrint` | Save and Print | حفظ وطباعة |

**Example Migration:**
```typescript
// ❌ OLD
{dict.disbursement.export}
{dict.createDisbursementRequest.cancel}
{dict.products.search}

// ✅ NEW
{dict.common.actions.export}
{dict.common.actions.cancel}
{dict.common.actions.search}
```

---

## ⏱️ Time Filters

### Moved to: `common.timeFilters.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.all` | `common.timeFilters.all` | All | الكل |
| `*.12Months` / `*.12months` / `*.filter12Months` | `common.timeFilters.12months` | 12 Months | 12 شهر |
| `*.30Days` / `*.30days` / `*.filter30Days` | `common.timeFilters.30days` | 30 Days | 30 يوم |
| `*.7Days` / `*.7days` / `*.filter7Days` | `common.timeFilters.7days` | 7 Days | 7 ايام |
| `*.today` / `*.filterToday` | `common.timeFilters.today` | Today | اليوم |
| `*.filterCustomPeriod` | `common.timeFilters.customPeriod` | Custom Period | فترة محددة |

**Affected Sections:**
- `dashboard.filters.*` - **REMOVED ENTIRELY**
- `disbursement.*`
- `reception.*`
- `returns.*`
- `priceQuotes.*`
- `incomingPriceQuoteRequests.*`
- `invoices.*`
- `purchaseOrders.*`

**Example Migration:**
```typescript
// ❌ OLD
{dict.dashboard.filters.all}
{dict.disbursement.12Months}
{dict.priceQuotes.filterToday}

// ✅ NEW
{dict.common.timeFilters.all}
{dict.common.timeFilters.12months}
{dict.common.timeFilters.today}
```

---

## 📋 Common Fields

### Moved to: `common.fields.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.orderNumber` | `common.fields.orderNumber` | Order Number | رقم الامر |
| `*.clientName` | `common.fields.clientName` | Client Name | اسم العميل |
| `*.supplierName` | `common.fields.supplierName` | Supplier Name | اسم المورد |
| `*.productName` | `common.fields.productName` | Product Name | اسم المنتج |
| `*.itemCode` | `common.fields.itemCode` | Item Code | كود الصنف |
| `*.itemName` | `common.fields.itemName` | Item Name | اسم الصنف |
| `*.productCode` | `common.fields.productCode` | Product Code | كود المنتج |
| `*.quantity` | `common.fields.quantity` | Quantity | الكمية |
| `*.unitPrice` | `common.fields.unitPrice` | Unit Price | سعر الوحدة |
| `*.subtotal` / `*.subTotal` | `common.fields.subtotal` | Subtotal | السعر الفرعي |
| `*.total` | `common.fields.total` | Total | الاجمالي |
| `*.date` | `common.fields.date` | Date | التاريخ |
| `*.creationDate` | `common.fields.creationDate` | Creation Date | تاريخ الإنشاء |
| `*.responsible` | `common.fields.responsible` | Responsible | المسئول |
| `*.requestStatus` | `common.fields.requestStatus` | Request Status | حالة الطلب |
| `*.invoiceStatus` | `common.fields.invoiceStatus` | Invoice Status | حالة الفاتورة |
| `*.unitsCount` | `common.fields.unitsCount` | Units Count | عدد الوحدات |
| `*.totalUnits` | `common.fields.totalUnits` | Total Units | اجمالي عدد الوحدات |

**Example Migration:**
```typescript
// ❌ OLD
{dict.disbursement.orderNumber}
{dict.createDisbursementRequest.clientName}
{dict.disbursementReceipt.itemCode}
{dict.receptionProducts.quantity}

// ✅ NEW
{dict.common.fields.orderNumber}
{dict.common.fields.clientName}
{dict.common.fields.itemCode}
{dict.common.fields.quantity}
```

---

## 🏢 Company Information

### Moved to: `common.company.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.companyName` | `common.company.name` | Golden Link Company | شركة جولدن لينك |
| `*.companyAddress` | `common.company.address` | Jeddah - Prince Sultan Street | جدة - شارع الامير سلطان |

**Affected Receipt Sections:**
- `disbursementReceipt.companyName` → **REMOVED**
- `disbursementReceipt.companyAddress` → **REMOVED**
- `receptionReceipt.companyName` → **REMOVED**
- `receptionReceipt.companyAddress` → **REMOVED**
- `returnReceipt.companyName` → **REMOVED**
- `returnReceipt.companyAddress` → **REMOVED**
- `printInvoice.companyName` → **REMOVED**
- `printInvoice.companyAddress` → **REMOVED**
- `receivingReceipt.companyName` → **REMOVED**
- `receivingReceipt.companyAddress` → **REMOVED**

**Example Migration:**
```typescript
// ❌ OLD
{dict.disbursementReceipt.companyName}
{dict.receptionReceipt.companyAddress}

// ✅ NEW
{dict.common.company.name}
{dict.common.company.address}
```

---

## 📄 Document Uploads

### Moved to: `common.documents.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.attachDocuments` | `common.documents.attachDocuments` | Attach Documents | ارفق مستندات |
| `*.supportedFormats` | `common.documents.supportedFormats` | Supported Formats: Jpg, PDF, Png | الصيغ المدعومة: Jpg, PDF, Png |

**Affected Sections:**
- `receptionProducts.attachDocuments` → **REMOVED**
- `receptionProducts.supportedFormats` → **REMOVED**
- `uploadQuoteFiles.attachDocuments` → **REMOVED**

**Example Migration:**
```typescript
// ❌ OLD
{dict.receptionProducts.attachDocuments}
{dict.uploadQuoteFiles.supportedFormats}

// ✅ NEW
{dict.common.documents.attachDocuments}
{dict.common.documents.supportedFormats}
```

---

## 📊 Status Labels

### Moved to: `common.statuses.*`

| Old Path | New Path | Value (EN) | Value (AR) |
|----------|----------|------------|------------|
| `*.partiallyPaid` | `common.statuses.partiallyPaid` | Partially Paid | مدفوعة جزئيًا |
| `*.fullyPaid` | `common.statuses.fullyPaid` | Fully Paid | مدفوعة بالكامل |
| `*.unpaid` | `common.statuses.unpaid` | Unpaid | غير مدفوع |
| `*.received` | `common.statuses.received` | Received | مستلم |
| `*.partiallyReceived` | `common.statuses.partiallyReceived` | Partially Received | مستلم جزئي |
| `*.notReceived` | `common.statuses.notReceived` | Not Received | غير مستلم |
| `*.completed` | `common.statuses.completed` | Completed | مكتمل |
| `*.statusPendingReview` | `common.statuses.pendingReview` | Pending Review | في انتظار المراجعة |
| `*.statusUnderReview` | `common.statuses.underReview` | Under Review | قيد المراجعة |
| `*.statusAccepted` | `common.statuses.accepted` | Accepted | مقبول |
| `*.statusRejected` | `common.statuses.rejected` | Rejected | مرفوض |

**Affected Sections:**
- `disbursement.{partiallyPaid,unpaid,fullyPaid}` → **REMOVED**
- `invoices.{statusPartiallyPaid,statusFullyPaid}` → **REMOVED**
- `purchaseOrders.{statusPartiallyReceived,statusNotReceived,statusCompleted}` → **REMOVED**
- `purchaseOrderDetails.{statusPartiallyReceived,statusReceived,statusNotReceived}` → **REMOVED**
- `priceQuotes.{statusPendingReview,statusUnderReview,statusAccepted,statusRejected}` → **REMOVED**
- `incomingPriceQuoteRequests.{statusPendingReview,statusUnderReview,statusAccepted,statusRejected}` → **REMOVED**

**Example Migration:**
```typescript
// ❌ OLD
{dict.disbursement.partiallyPaid}
{dict.purchaseOrders.statusCompleted}
{dict.priceQuotes.statusPendingReview}

// ✅ NEW
{dict.common.statuses.partiallyPaid}
{dict.common.statuses.completed}
{dict.common.statuses.pendingReview}
```

---

## 🗑️ Completely Removed Sections

### dashboard.filters - DELETED
All filters moved to `common.timeFilters.*`

```typescript
// ❌ OLD - SECTION DELETED
dict.dashboard.filters.all
dict.dashboard.filters.12months
dict.dashboard.filters.30days
dict.dashboard.filters.7days
dict.dashboard.filters.today

// ✅ NEW
dict.common.timeFilters.all
dict.common.timeFilters.12months
dict.common.timeFilters.30days
dict.common.timeFilters.7days
dict.common.timeFilters.today
```

---

## 📝 Section-by-Section Changes

### Categories
**Removed:**
- `categories.mainCategories.export` → `common.actions.export`
- `categories.mainCategories.table.actions` → `common.actions.actions`
- `categories.addMainCategory.cancel` → `common.actions.cancel`
- `categories.subCategories.export` → `common.actions.export`
- `categories.subCategories.table.actions` → `common.actions.actions`
- `categories.addSubCategory.cancel` → `common.actions.cancel`

### Products
**Removed:**
- `products.export` → `common.actions.export`
- `products.search` → `common.actions.search`
- `products.filter` → `common.actions.filter`
- `products.table.actions` → `common.actions.actions`

### Add Product
**Removed:**
- `addProduct.cancel` → `common.actions.cancel`
- `addProduct.quantity` → `common.fields.quantity`
- `addProduct.add` → `common.actions.add`

### Add Existing Product
**Removed:**
- `addExistingProduct.cancel` → `common.actions.cancel`
- `addExistingProduct.quantity` → `common.fields.quantity`

### Disbursement
**Removed (entire section cleaned):**
- All time filters (all, 12Months, 30Days, 7Days, today)
- export, search, action
- invoiceStatus, orderNumber, clientName, unitsCount, creationDate, responsible
- partiallyPaid, unpaid, fullyPaid

### Create Disbursement Request
**Removed:**
- orderNumber, clientName, date, itemCode, productName, quantity
- save, saveAndPrint, cancel

### Disbursement Receipt
**Removed:**
- print, download, cancel
- companyName, companyAddress
- orderNumber, date, itemCode, itemName, quantity, unitPrice, subtotal, totalUnits, total

### Reception, Returns, Price Quotes, Invoices, Purchase Orders
Similar comprehensive cleanup applied to all these sections.

---

## 🔍 Quick Search & Replace

For bulk updates in your IDE:

### Search Patterns (Regex)
```regex
dict\.(disbursement|reception|returns|products|categories)\.(export|search|cancel)
```

### Replace With
```typescript
dict.common.actions.$2
```

---

## ✅ Verification Checklist

After migration, verify:

- [ ] All components compile without TypeScript errors
- [ ] No runtime errors related to missing translation keys
- [ ] All UI text displays correctly in both English and Arabic
- [ ] Action buttons show correct text
- [ ] Status labels display properly
- [ ] Time filters work as expected
- [ ] Receipt/invoice documents show company info correctly

---

## 📞 Need Help?

If you encounter issues during migration:

1. Check this guide for the correct path
2. Verify the translation exists in `common` section
3. Ensure you're using `dict.common.*` prefix
4. Check for typos in nested paths

---

**Last Updated:** 2025-01-10
**Version:** 1.0.0
