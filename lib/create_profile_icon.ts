import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

export async function generateProfileIcon(firstName: string): Promise<string> {
  const initials: string = firstName.charAt(0).toUpperCase(); // Extract initials
  const width: number = 100;
  const height: number = 100;

  // Generate an SVG string for sharp
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#33399F" />
      <text x="50%" y="50%" font-size="50px" fill="#FFFFFF" text-anchor="middle" alignment-baseline="central" font-family="sans-serif">
        ${initials}
      </text>
    </svg>
  `;

  // Ensure the directory exists
  const profileFolder: string = path.join('public', 'profiles');
  if (!fs.existsSync(profileFolder)) {
    fs.mkdirSync(profileFolder, { recursive: true });
  }

  const fileName: string = `${firstName.toLowerCase()}_profile.png`; // Use a unique file name
  const filePath: string = path.join(profileFolder, fileName);

  // Use sharp to convert the SVG to a PNG
  await sharp(Buffer.from(svg))
    .png()
    .toFile(filePath);

  return path.posix.join('/profiles', fileName); // Return the relative path for use in the app
}
