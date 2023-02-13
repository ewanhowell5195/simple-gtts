# simple-gtts

### Simple Google text to speech

```js
await gTTS("hello there", {
  lang: "en-us",
  path: "./hello.mp3"
})
```

## Install
```console
$ npm i simple-gtts
```

## Usage
```js
import { gTTS } from "simple-gtts"
```

---

## gTTS(text, data)

gTTS turns text into speech, and can output either a file or a buffer

### file
```js
// Include a path to save to a file
await gTTS("hello there", {
  path: "./hello.mp3"
})
```

### buffer
```js
// Not including a path will return a buffer
const buff = await gTTS("hello there")
```

## languages

You can change the language the text is read in by providing a language code

```js
// Languages work with both files and buffers
await gTTS("hello there", {
  lang: "fr",
  path: "./hello.mp3"
})
```

To view the available languages, you can import and console.log them

```js
import {languages} from "simple-gtts"

console.log(languages)
```