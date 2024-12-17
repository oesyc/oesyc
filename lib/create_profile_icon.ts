import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

export async function generateProfileIcon(firstName: string): Promise<string> {
  // Validate input
  if (!firstName || firstName.trim() === '') {
    throw new Error('First name is required');
  }

  const initials: string = firstName.charAt(0).toUpperCase();
  const width: number = 100;
  const height: number = 100;

  // Generate a more robust SVG string
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#33399F;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5D6CDD;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient)" rx="10" ry="10"/>
      <text 
        x="50%" 
        y="50%" 
        font-size="50" 
        fill="#FFFFFF" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        font-family="Arial, sans-serif" 
        font-weight="bold"
      >
        ${initials}
      </text>
    </svg>
  `;

  // Ensure the directory exists with proper permissions
  const profileFolder: string = path.join(process.cwd(), 'public', 'profiles');
  
  try {
    // Use fs.promises for better async handling
    await fs.promises.mkdir(profileFolder, { recursive: true });

    const fileName: string = `${firstName.toLowerCase().replace(/\s+/g, '_')}_profile.png`;
    const filePath: string = path.join(profileFolder, fileName);

    // Convert SVG to PNG with sharp
    await sharp(Buffer.from(svg))
      .png()
      .resize(width, height)
      .toFile(filePath);

    return path.posix.join('/profiles', fileName);
  } catch (error) {
    console.error('Error generating profile icon:', error);
    throw error;
  }
}