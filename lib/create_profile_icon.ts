import * as fs from 'fs';
import * as path from 'path';
import { createCanvas, Canvas } from 'canvas';

export function generateProfileIcon(firstName: string): string {
  const initials: string = firstName.charAt(0).toUpperCase(); // Get the first letter and make it uppercase

  // Set canvas dimensions
  const width: number = 100;
  const height: number = 100;

  // Create a canvas with the desired dimensions
  const canvas: Canvas = createCanvas(width, height);
  const context: CanvasRenderingContext2D = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;

  // Set a background color (you can change this to any color)
  context.fillStyle = '#33399F'; // Example background color
  context.fillRect(0, 0, width, height);

  // Set text properties (font size, color, etc.)
  context.fillStyle = '#FFFFFF'; // Text color (white)
  context.font = '70px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Draw the initials in the center of the canvas
  context.fillText(initials, width / 2, height / 2);

  // Convert the canvas to an image buffer
  const buffer: Buffer = canvas.toBuffer('image/png');

  // Set the profile folder path
  const profileFolder: string = path.join('public', 'profiles');

  // Ensure the directory exists
  if (!fs.existsSync(profileFolder)) {
    fs.mkdirSync(profileFolder, { recursive: true });
  }

  const fileName: string = `${firstName.toLowerCase()}_profile.png`; // Use a unique name
  const filePath: string = path.join(profileFolder, fileName);

  // Save the image
  fs.writeFileSync(filePath, buffer);

  return path.posix.join('/profiles', fileName); // Return the file path if needed
}


