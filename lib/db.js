import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const getFilePath = (filename) => path.join(DATA_DIR, `${filename}.json`);

const initializeFile = (filename, defaultData = []) => {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

export const readData = (filename) => {
  initializeFile(filename);
  const filePath = getFilePath(filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const writeData = (filename, data) => {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const addRecord = (filename, record) => {
  const data = readData(filename);
  const newRecord = {
    ...record,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.push(newRecord);
  writeData(filename, data);
  return newRecord;
};

export const updateRecord = (filename, id, updates) => {
  const data = readData(filename);
  const index = data.findIndex((r) => r.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
  writeData(filename, data);
  return data[index];
};

export const getRecord = (filename, id) => {
  const data = readData(filename);
  return data.find((r) => r.id === id);
};

export const deleteRecord = (filename, id) => {
  const data = readData(filename);
  const filtered = data.filter((r) => r.id !== id);
  writeData(filename, filtered);
};
