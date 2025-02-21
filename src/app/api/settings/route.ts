import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json');

// Ensure the data directory exists
const ensureDirectory = () => {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const GET = async () => {
  try {
    ensureDirectory();
    
    if (!fs.existsSync(SETTINGS_FILE)) {
      // Create default settings if file doesn't exist
      const defaultSettings = {
        account: {
          name: "",
          email: "",
          organization: "",
          role: ""
        },
        chat: {
          customInstructions: ""
        }
      };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
      return NextResponse.json(defaultSettings);
    }
    
    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ message: 'Error reading settings' }, { status: 500 });
  }
}

export const POST = async (request: Request) => {
  try {
    ensureDirectory();
    
    // Get the request body
    const data = await request.json();
    
    // Write the settings to the JSON file
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Settings saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ message: 'Error saving settings' }, { status: 500 });
  }
} 