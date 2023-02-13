import fakeUa from "fake-useragent"
import fetch from "node-fetch"
import fs from "fs"

const base = "http://translate.google.com/translate_tts"
export const languages = {
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  "zh-cn": "Chinese (Mandarin/China)",
  "zh-tw": "Chinese (Mandarin/Taiwan)",
  "zh-yue": "Chinese (Cantonese)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  "en-au": "English (Australia)",
  "en-uk": "English (United Kingdom)",
  "en-us": "English (United States)",
  eo: "Esperanto",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  ht: "Haitian Creole",
  iw: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  mk: "Macedonian",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  es: "Spanish",
  "es-es": "Spanish (Spain)",
  "es-us": "Spanish (United States)",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  th: "Thai",
  tr: "Turkish",
  vi: "Vietnamese"
}

export const gTTS = async (text, data = {}) => {
  data.lang ??= "en"
  data.lang = data.lang.toLowerCase()
  if(!text) throw new Error("No text to speak")
  if(!languages[data.lang]) throw new Error(`Language not supported: ${data.lang}`)
  const parts = text.match(/[\s\S]{1,100}(?!\S)|[\s\S]{1,100}/g).map(e => e.trim())
  const buff = Buffer.concat(await Promise.all(parts.map((e, i) => fetch(base + `?ie=UTF-8&tl=${data.lang}&q=${encodeURIComponent(e)}&total=${e.length}&idx=${i}&client=tw-ob&textlen=${e.length}`, {
    headers: {
      "User-Agent": fakeUa()
    }
  }).then(r => r.arrayBuffer()).then(b => Buffer.from(b)))))
  if (data.path) fs.writeFileSync(data.path, buff)
  else return buff
}

export default {
  gTTS,
  languages
}