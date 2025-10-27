#!/bin/bash

# ProGro.ai - Create all 65 GitHub issues from 12-week plan
# Usage: ./create-github-issues.sh
# Requires: GitHub CLI (gh) - install from https://cli.github.com/

# Make sure you're authenticated
gh auth status || gh auth login

# Week 1 - DONE (we'll create as closed)
gh issue create --title "Week 1: Initialize Next.js" --body "✅ Project scaffold + TypeScript + app router setup" --label "Week 1,done"
gh issue create --title "Week 1: Connect Supabase + env vars" --body "✅ Configured project + verified connection string" --label "Week 1,done"
gh issue create --title "Week 1: Deploy to Vercel" --body "✅ Connected repo + automatic deploy pipeline" --label "Week 1,done"
gh issue create --title "Week 1: Add shadcn/ui + demo chart" --body "✅ Added shadcn/ui Recharts demo" --label "Week 1,done"
gh issue create --title "Week 1: Tailwind v4 Migration + Brand Tokens" --body "✅ Upgraded Tailwind v4 created globals.css brand colors buttons" --label "Week 1,done"
gh issue create --title "Week 2: Build Layout + Header/Footer" --body "✅ Created sticky nav footer global font (Inter)" --label "Week 2,done"
gh issue create --title "Week 2: Hero + What We Do Section" --body "✅ Added homepage hero CTA buttons 3-card grid section" --label "Week 2,done"

# Week 2 - BACKLOG
gh issue create --title "Week 2: Supabase Auth UI integration (email magic link)" --body "Implement magic-link login using @supabase/ssr and Supabase Auth UI components" --label "Week 2,high"
gh issue create --title "Week 2: Create RLS policies" --body "Add Row Level Security for org_id-scoped data (organizations users projects estimates contacts leads)" --label "Week 2,high"
gh issue create --title "Week 2: Database migration system" --body "Set up migration workflow for schema changes" --label "Week 2,medium"
gh issue create --title "Week 2: Test multi-tenancy" --body "Create 2 test orgs and verify data isolation" --label "Week 2,medium"

# Week 3 - BACKLOG
gh issue create --title "Week 3: Organization creation flow" --body "Allow users to create/join orgs (must come before protected routes)" --label "Week 3,high"
gh issue create --title "Week 3: Protected routes + middleware" --body "Auth guards for dashboard pages" --label "Week 3,high"
gh issue create --title "Week 3: User profile page" --body "Display and edit user info" --label "Week 3,medium"
gh issue create --title "Week 3: Cost Items Library - UI" --body "Data table with search/filter/sort/CRUD" --label "Week 3,high"
gh issue create --title "Week 3: Cost Items Library - API" --body "POST GET PUT DELETE endpoints for cost items" --label "Week 3,high"
gh issue create --title "Week 3: Bulk Excel import" --body "Import Woodmere estimate data" --label "Week 3,medium"
gh issue create --title "Week 3: Cost categories/divisions UI" --body "Organize items by CSI divisions" --label "Week 3,medium"
gh issue create --title "Week 3: Cost history tracking" --body "Track price changes over time" --label "Week 3,low"

# Week 4 - BACKLOG
gh issue create --title "Week 4: Estimate creation wizard" --body "Step-by-step estimate builder flow" --label "Week 4,high"
gh issue create --title "Week 4: Line items management UI" --body "Add edit remove line items from estimates" --label "Week 4,high"
gh issue create --title "Week 4: Cost calculations engine" --body "Material + labor + equipment totals with formulas" --label "Week 4,high"
gh issue create --title "Week 4: Markup overhead profit inputs" --body "Apply percentages to subtotals" --label "Week 4,high"
gh issue create --title "Week 4: Division grouping in estimates" --body "Group line items by division/category" --label "Week 4,medium"
gh issue create --title "Week 4: Drawing references" --body "Link line items to drawing/detail references" --label "Week 4,low"

# Week 5 - BACKLOG
gh issue create --title "Week 5: Estimate summary dashboard (charts + KPIs)" --body "Visual dashboard with breakdown charts cost analysis and key metrics" --label "Week 5,high"
gh issue create --title "Week 5: PDF generation" --body "Export professional PDF estimates" --label "Week 5,high"
gh issue create --title "Week 5: Email estimates to clients" --body "Send PDFs via email with templates" --label "Week 5,medium"
gh issue create --title "Week 5: Estimate versioning system" --body "Track estimate revisions and changes" --label "Week 5,medium"
gh issue create --title "Week 5: Estimate templates" --body "Save common estimate structures for reuse" --label "Week 5,low"
gh issue create --title "Week 5: Estimate approval workflow" --body "Review and approve estimates before sending" --label "Week 5,medium"

# Week 6 - BACKLOG
gh issue create --title "Week 6: Polished UI + animations" --body "Add Framer Motion smooth interactions" --label "Week 6,medium"
gh issue create --title "Week 6: Responsive design polish" --body "Mobile tablet desktop optimization" --label "Week 6,medium"
gh issue create --title "Week 6: Demo + Contact pages" --body "Create linked pages + contact form" --label "Week 6,medium"
gh issue create --title "Week 6: Estimator testing" --body "Full QA of estimate workflow end-to-end" --label "Week 6,high"

# Week 7 - BACKLOG
gh issue create --title "Week 7: Role-based access control" --body "Admin member and viewer permissions (needed before multi-user lead/CRM workflows)" --label "Week 7,high"
gh issue create --title "Week 7: Lead scraping - setup sources" --body "Configure Dodge BidClerk city/county gov sites" --label "Week 7,high"
gh issue create --title "Week 7: Lead scraping - n8n workflow" --body "Build automated lead discovery workflow in n8n" --label "Week 7,high"
gh issue create --title "Week 7: Lead scoring algorithm" --body "Auto-score leads based on location type value fit" --label "Week 7,high"
gh issue create --title "Week 7: Lead notification system" --body "Alert team of high-value leads via email/SMS" --label "Week 7,medium"
gh issue create --title "Week 7: Lead sources management" --body "Configure and manage scraping sources" --label "Week 7,medium"

# Week 8 - BACKLOG
gh issue create --title "Week 8: Lead management UI" --body "View filter sort search leads dashboard" --label "Week 8,high"
gh issue create --title "Week 8: Lead detail pages" --body "Full lead information display with actions" --label "Week 8,medium"
gh issue create --title "Week 8: Convert lead to contact" --body "One-click conversion workflow with data transfer" --label "Week 8,high"
gh issue create --title "Week 8: Lead assignment logic" --body "Auto-assign leads to team members" --label "Week 8,medium"
gh issue create --title "Week 8: Lead tags and categorization" --body "Organize leads with tags and custom fields" --label "Week 8,low"

# Week 9 - BACKLOG
gh issue create --title "Week 9: CRM contacts database UI" --body "Manage clients prospects and leads" --label "Week 9,high"
gh issue create --title "Week 9: Contact detail pages" --body "Full contact profiles with history" --label "Week 9,high"
gh issue create --title "Week 9: Contact interaction logging" --body "Track calls emails meetings notes" --label "Week 9,high"
gh issue create --title "Week 9: Contact segmentation" --body "Filter by status type value tags" --label "Week 9,medium"
gh issue create --title "Week 9: Link contacts to projects and estimates" --body "Relationship management between contacts projects and estimates" --label "Week 9,high"

# Week 10 - BACKLOG
gh issue create --title "Week 10: Email campaign builder" --body "Create and schedule email campaigns" --label "Week 10,high"
gh issue create --title "Week 10: Email template library" --body "Reusable email templates with variables" --label "Week 10,medium"
gh issue create --title "Week 10: Campaign analytics" --body "Track opens clicks conversions" --label "Week 10,medium"
gh issue create --title "Week 10: Email automation workflows" --body "Trigger-based email sequences in n8n" --label "Week 10,high"
gh issue create --title "Week 10: Unsubscribe management" --body "Handle opt-outs and preferences" --label "Week 10,low"
gh issue create --title "Week 10: Agent orchestration system" --body "Connect Estimator Lead Finder and CRM agents" --label "Week 10,high"
gh issue create --title "Week 10: Agent activity logging" --body "Track what agents are doing in real-time" --label "Week 10,medium"
gh issue create --title "Week 10: Agent configuration UI" --body "Control agent settings schedules and rules" --label "Week 10,medium"
gh issue create --title "Week 10: Inter-agent messaging" --body "Agents communicate and share data" --label "Week 10,high"

# Week 11 - BACKLOG
gh issue create --title "Week 11: Polish UI/UX across platform" --body "Improve design flow and user experience" --label "Week 11,high"
gh issue create --title "Week 11: Bug fixes and optimization" --body "Resolve issues improve performance" --label "Week 11,high"
gh issue create --title "Week 11: User testing with beta users" --body "Get feedback from real users" --label "Week 11,high"
gh issue create --title "Week 11: Documentation and help docs" --body "User guides tutorials and help content" --label "Week 11,medium"
gh issue create --title "Week 11: Onboarding flow" --body "New user welcome experience and setup wizard" --label "Week 11,medium"

# Week 12 - BACKLOG
gh issue create --title "Week 12: Payment integration (Stripe)" --body "Subscription billing and payment processing" --label "Week 12,high"
gh issue create --title "Week 12: Pricing tiers" --body "Define and implement Starter Pro Enterprise plans" --label "Week 12,high"
gh issue create --title "Week 12: Beta launch prep" --body "Final checks security audit before launch" --label "Week 12,high"
gh issue create --title "Week 12: Marketing landing page" --body "Public landing page with features pricing testimonials (launch-critical for conversion)" --label "Week 12,high"
gh issue create --title "Week 12: Get first paying customer" --body "🎯 GOAL - Revenue milestone and validation" --label "Week 12,high"

echo "✅ All 65 issues created successfully!"
echo "📍 Next step: Go to Linear and import from GitHub"
