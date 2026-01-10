# Design Guidelines: Client Lead Management Application

## Design Approach

**System Selected:** Material Design 3 principles with modern SaaS aesthetics  
**Rationale:** Utility-focused application requiring clear information hierarchy, efficient form interaction, and professional credibility. Material Design provides robust form patterns and data display components essential for CRM-style applications.

**Key Design Principles:**
- Professional trust and credibility
- Efficient data entry with clear visual feedback
- Scannable information hierarchy
- Clean, uncluttered interfaces

---

## Core Design Elements

### A. Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:** 
  - H1: text-4xl font-bold (Dashboard titles)
  - H2: text-2xl font-semibold (Section headers)
  - H3: text-lg font-semibold (Card titles)
- **Body:** text-base font-normal
- **Labels:** text-sm font-medium
- **Helper Text:** text-sm text-gray-600

### B. Layout System
**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 24
- Form fields: gap-6 between inputs
- Card padding: p-8
- Section spacing: mb-12
- Container max-width: max-w-7xl
- Form max-width: max-w-2xl

**Grid Structure:**
- Dashboard: 3-column grid (lg:grid-cols-3) for stat cards
- Client list: Single column table/card layout
- Form sections: Single column, max-w-2xl centered

---

## C. Component Library

### 1. Navigation
**Top Navigation Bar:**
- Fixed header with application logo (left)
- Primary navigation links (center): Dashboard, New Client, Client List
- User profile dropdown (right)
- Height: h-16, with bottom border

### 2. Forms
**Client Intake Form Components:**
- **Text Inputs:** Full-width with floating labels, border-2 with focus ring
- **Text Areas:** For "Website Requirements" - min-h-32
- **Select Dropdowns:** For categorization (Budget Range, Project Type, Timeline)
- **Multi-select Tags:** For "Features Needed" (e.g., E-commerce, Blog, CMS)
- **Submit Button:** Large, prominent, w-full on mobile, w-auto on desktop
- **Form Sections:** Grouped with subtle background cards, space-y-6

**Required Form Fields:**
- Client Name, Email, Phone
- Company Name
- Project Type (dropdown)
- Budget Range (dropdown)
- Desired Features (multi-select)
- Timeline/Deadline
- Additional Requirements (textarea)

### 3. Dashboard Components
**Stat Cards (3-column grid):**
- Total Leads, Active Projects, Conversion Rate
- Large number (text-3xl), small label (text-sm)
- Icon in corner, subtle background

**Recent Activity Feed:**
- Card-based list showing latest submissions
- Each entry: Client name, timestamp, quick view button

### 4. Data Display
**Client List Table:**
- Sortable columns: Name, Date Submitted, Project Type, Budget, Status
- Action buttons per row: View Details, Edit, Archive
- Pagination at bottom
- Search bar at top with filters dropdown

**Client Detail View:**
- Two-column layout: Client info (left), Project requirements (right)
- Status badge at top
- Action buttons: Edit, Mark as Converted, Export PDF

### 5. Cards & Containers
- Border radius: rounded-lg
- Shadow: shadow-md for elevated cards
- Padding: p-8 for form cards, p-6 for list items

---

## Images

**Hero Section:** Yes, include a professional hero image
- **Image Description:** Modern office workspace with laptop showing design mockups, bright and professional atmosphere, wide-angle shot
- **Placement:** Full-width hero section, min-h-[500px]
- **Content Overlay:** Centered heading "Streamline Your Client Intake Process" + subheading + CTA button with backdrop-blur-md background
- **Treatment:** Subtle gradient overlay for text legibility

**Dashboard:** No decorative images needed - focus on data clarity

---

## Page Structure

### Homepage/Landing (Public)
1. Hero section with image + CTA "Get Started"
2. Benefits section (3-column grid): Save Time, Organize Leads, Never Miss Details
3. Simple CTA footer: "Ready to Start?" with sign-up button

### Client Submission Form (Public)
- Centered form card on clean background
- Progress indicator if multi-step
- Trust signals: "Your information is secure" with lock icon

### Dashboard (Authenticated)
- Stat cards row
- Recent submissions preview
- Quick action: "Add New Client" button (prominent)

### Client List (Authenticated)
- Filter/search toolbar
- Table or card grid view toggle
- Bulk actions available

### Client Detail (Authenticated)
- Full client profile with all submitted information
- Editable fields
- Activity log/notes section

---

## Interaction Patterns

- **Form Validation:** Inline error messages, green checkmarks for valid fields
- **Loading States:** Skeleton screens for data loading, spinner for form submission
- **Success Feedback:** Toast notifications top-right for successful actions
- **Empty States:** Friendly illustrations with actionable CTAs when no data exists

**Animations:** Minimal - subtle fade-ins for modals, smooth transitions for dropdown menus only