// For utility, merging prettier settings

import * as fs from 'fs';
import * as path from 'path';

const projectSettingsPath = path.join(process.cwd(), '.vscode', 'settings.json');
const templateSettingsPath = path.join(process.env.HOME || '', 'dev-templates', 'vscode', 'settings.json');

const projectSettings = fs.existsSync(projectSettingsPath) 
    ? JSON.parse(fs.readFileSync(projectSettingsPath, 'utf8')) 
    : {};

const templateSettings = JSON.parse(fs.readFileSync(templateSettingsPath, 'utf8'));

const merged = { ...projectSettings, ...templateSettings };

fs.writeFileSync(projectSettingsPath, JSON.stringify(merged, null, 2));

console.log('VSCode settings merged successfully!');

// npm install --save-dev typescript ts-node
// npx ts-node mergeSettings.ts