# Spacing System

Multi-platform spacing and layout foundation. All values are multiples of the 8px base unit. Use tokens — never raw pixel values — in components.

## 1. Base Unit

**8px** — the industry standard for multi-platform design systems. Divisible enough for fine-grained adjustments (via 4px half-step where unavoidable) while keeping the scale predictable across iOS, Android, and Web. Every token below is a multiple of 8 (with a single 4px `xs` for icon-level tightness).

## 2. Spacing Scale

| Token | Value | Use case |
|-------|-------|----------|
| `spacing.none` | 0px | Intentionally removing space |
| `spacing.xs` | 4px | Icon padding, tight inline labels |
| `spacing.sm` | 8px | Compact internal component padding |
| `spacing.md` | 16px | Standard internal component padding |
| `spacing.lg` | 24px | Card internals, section padding |
| `spacing.xl` | 32px | Between related components |
| `spacing.2xl` | 48px | Section separation |
| `spacing.3xl` | 64px | Page-level breaks |
| `spacing.4xl` | 96px | Hero sections, marketing layouts |

## 3. Layout Grid

| Breakpoint | Viewport | Columns | Margin | Gutter | Max content |
|-----------|----------|---------|--------|--------|-------------|
| Mobile | 375px | 4 | 16px | 16px | — |
| Tablet | 768px | 8 | 24px | 24px | — |
| Desktop | 1440px | 12 | 32px | 24px | 1200px |

## 4. Component Spacing Conventions

| Context | Token | Notes |
|---------|-------|-------|
| Button horizontal padding | `spacing.md` (16px) | Left/right |
| Button vertical padding | `spacing.sm` (8px) | Top/bottom |
| Card internal padding | `spacing.lg` (24px) | All sides |
| Input vertical padding | `spacing.sm` (8px) | |
| Input horizontal padding | `spacing.md` (16px) | |
| Icon → label gap | `spacing.xs` (4px) | |
| Stack gap (related items) | `spacing.sm`–`spacing.md` | |
| Section gap | `spacing.xl` (32px) | |
| Page section separation | `spacing.2xl` (48px) | |

## 5. Figma Implementation

1. Create a **Spacing** page in the Figma file documenting each token visually (a swatch row per token with the name + value).
2. Open **Resources → Variables** and create a Number collection named **Spacing**.
3. Add a variable per token (`spacing/none`, `spacing/xs`, … `spacing/4xl`) with the values above.
4. Apply the variables to Auto Layout **padding** and **item spacing** fields on every component — never type raw pixel values.
5. Export to engineering via Tokens Studio or share the variable names as-is; the names map 1:1 to the engineering token names.

## 6. Anti-Patterns to Avoid

- **Off-scale values** (13px, 22px, 30px) — always round to the nearest token.
- **Raw pixel values in components** — bind every padding/gap to a variable.
- **Mixing base units** — do not introduce 4px-base values inside an 8px system except the documented `xs` exception.
- **Margin on components for layout spacing** — spacing belongs to the parent (Auto Layout gap), not the child.

## 7. Quality Checklist

- [x] All token values are multiples of the 8px base unit (with documented 4px `xs` exception)
- [x] Scale covers `xs` through `4xl`
- [x] Grid defined for mobile, tablet, and desktop
- [x] Component conventions cover buttons, cards, inputs, icons, sections
- [x] Figma variable implementation steps included
