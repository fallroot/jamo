const COMPAT_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const COMPAT_VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
const CHOSEONG_TO_COMPAT = [0, 1, 3, 6, 7, 8, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
const JONGSEONG_TO_COMPAT = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]

function decomposeAsOffset (text) {
  const offset = text.codePointAt(0) - 0xAC00
  const jongseong = offset % 28
  const jungseong = ((offset - jongseong) / 28) % 21
  const choseong = (((offset - jongseong) / 28) - jungseong) / 21

  return {
    choseong,
    jungseong,
    jongseong
  }
}

function decomposeWith (text, callback) {
  return Array.from(text).map(ch => {
    if (!isSyllable(ch)) {
      return [ch]
    }

    return callback(decomposeAsOffset(ch))
  })
}

function decompose (text) {
  return decomposeWith(text, offsets => {
    const result = [
      String.fromCodePoint(0x1100 + offsets.choseong),
      String.fromCodePoint(0x1161 + offsets.jungseong)
    ]

    if (offsets.jongseong) {
      result.push(String.fromCodePoint(0x11A8 + offsets.jongseong - 1))
    }

    return result
  })
}

function decomposeAsCompat (text) {
  return decomposeWith(text, offsets => {
    const result = [
      COMPAT_CONSONANTS[CHOSEONG_TO_COMPAT[offsets.choseong]],
      COMPAT_VOWELS[offsets.jungseong]
    ]

    if (offsets.jongseong) {
      result.push(COMPAT_CONSONANTS[JONGSEONG_TO_COMPAT[offsets.jongseong - 1]])
    }

    return result
  })
}

function isSyllable (text) {
  return Array.from(text).every(ch => {
    const codePoint = ch.codePointAt(0)

    return codePoint >= 0xAC00 && codePoint <= 0xD7AF
  })
}

export default {
  decompose,
  decomposeAsCompat,
  isSyllable
}
