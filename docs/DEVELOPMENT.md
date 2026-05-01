# Development

## UI mockups

The current UI is implemented to match the HTML mockups in `mockup/`:
- Desktop: `mockup/bgremover-desktop.html`
- Mobile: `mockup/bgremover-mobile.html`

Mobile includes a bottom-tab page system (Remove / Batch / History / Account) to behave like an installable app.

## Image processing pipeline

Core image processing functions live in `lib/image-processing.ts` and are used by the UI layer.

High-level steps:
1. Convert to grayscale
2. Sobel edge detection
3. Background color sampling + color segmentation
4. Combine edge + foreground masks
5. Apply alpha mask and refine edges

## Tests

Run unit tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Current unit tests focus on the pure processing pipeline in `lib/image-processing.ts` (no DOM required).
