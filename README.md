# Background Remover

A modern web application that removes backgrounds from images using AI technology, built with Next.js and Shadcn UI.

## Features

- Upload images up to 5MB in size
- Remove backgrounds with advanced edge detection
- View side-by-side comparison of original and processed images
- Download processed images with transparent backgrounds
- Dark mode support with theme persistence
- Responsive design for all device sizes
- No watermarks, no signup required, no server uploads

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **Theme Management**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/background-remover.git
   ```
2. Navigate to the project directory:
   ```
   cd background-remover
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm start`

Starts the production server after running `npm run build`.

## How It Works

The app uses client-side image processing techniques to remove backgrounds:

1. **Edge Detection**: Uses Sobel operators to identify edges in the image
2. **Color Segmentation**: Samples colors from the image edges to identify likely background colors
3. **Mask Combination**: Combines edge detection and color segmentation to create a foreground mask
4. **Alpha Channel Modification**: Applies the mask to the image's alpha channel
5. **Edge Refinement**: Smooths the edges of the foreground object for a more natural look

All processing happens directly in the browser - your images are never uploaded to a server.

## Customization

You can customize the look and feel by modifying the Tailwind configuration in `tailwind.config.js` or the global styles in `app/globals.css`.

## Browser Compatibility

This application is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).