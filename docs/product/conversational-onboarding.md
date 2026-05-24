# Conversational Onboarding

**Status:** Reference
**Owner:** Brian + Joshua
**Last reviewed:** 2026-05-24
**Source:** Advisor conversation, May 23 2026
**Use this for:** Future onboarding concept exploration, not current MVP scope.

Back to [Documentation Hub](../README.md).

## Summary / Why This Matters

This is a future-feature reference. It captures why conversational onboarding could improve profile creation later, but [MVP Overview](./mvp-overview.md) remains the source of truth for MVP scope.

## The Idea

Replace traditional form-based profile creation with a conversational chat interface. Instead of filling out 10+ fields on a form, the user has a guided conversation where the platform asks questions one at a time with pre-generated selection options — similar to how Claude presents choices.

## Why It's Better

- Streamlines the experience — users don't face a wall of empty fields
- Allows customization — conversation can branch based on answers
- Mobile-friendly — chat is easier on phones than complex forms
- Pre-generated prompts reduce typing — select from options instead of free-typing
- Feels modern and differentiated from every other marketplace signup

## Example Flow (team side)

- "What's your team name?" → text input
- "What sport do you play?" → pre-generated chips: Soccer, Rugby, Swim, Triathlon, etc.
- "How many athletes on your roster?" → slider or chips: Under 20, 20-40, 40-60, 60+
- "What can you offer sponsors?" → multi-select chips: Jersey logo, Social posts, Livestream placement, Event booths, etc.
- "What kind of sponsors are you looking for?" → multi-select chips: Nutrition, Apparel, Local business, etc.
- "Upload a team photo" → file upload
- "Here's your profile preview" → confirm and publish

## Why Not Now

- Forms work fine for 5-50 teams and take a day to build
- Chat interface requires conversation flow design, branching logic, edge case handling
- Weeks of work for a feature that makes signup nicer but doesn't change whether teams and brands use the platform
- No one has ever abandoned a product they wanted because signup was a form

## When to Build

- After MVP is live and onboarding conversion rate becomes a real metric to optimize
- A/B test form vs chat to see if chat actually converts better
- Consider building when scaling beyond Cal Poly to reduce drop-off during signup

## Technical Notes

- Could use Claude API or similar to power dynamic conversation
- Pre-generated options reduce AI unpredictability
- Hybrid approach possible: chat for first 3 questions, then auto-fill a form with remaining fields for user to review

---

*Added: May 23, 2026*
