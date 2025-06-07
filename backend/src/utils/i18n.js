const fs = require('fs');
const path = require('path');

const cache = {};

function loadMessagesFromFile(lang) {
  const filePath = path.join(__dirname, `../locales/${lang}/messages.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Función para mezclar profundo (español + fallback inglés)
function deepMerge(primary, fallback) {
  const result = {};
  for (const key in fallback) {
    if (primary[key] === undefined) {
      result[key] = fallback[key];
    } else if (
      typeof primary[key] === 'object' &&
      !Array.isArray(primary[key])
    ) {
      result[key] = deepMerge(primary[key], fallback[key]);
    } else {
      result[key] = primary[key];
    }
  }

  // Añade claves que estén solo en el idioma principal
  for (const key in primary) {
    if (result[key] === undefined) result[key] = primary[key];
  }

  return result;
}

function getMessages(lang = 'es') {
  if (cache[lang]) return cache[lang];

  const primary = loadMessagesFromFile(lang);
  const fallback = loadMessagesFromFile('en');
  const merged = deepMerge(primary, fallback);

  cache[lang] = merged; // guarda en memoria para futuras llamadas
  return merged;
}

module.exports = { getMessages };
