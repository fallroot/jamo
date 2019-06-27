const COMPAT_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const COMPAT_VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
const CHOSEONG_TO_COMPAT = [0, 1, 3, 6, 7, 8, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
const JONGSEONG_TO_COMPAT = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]

function compose (...args) {
  const result = []
  const chars = []
  let step = 0

  args.forEach(ch => {
    if (!isComposable(ch)) {
      step = 0
      result.push(ch)
      return
    }

    if (step === 0) {
      if (isChoseong(ch)) {
        chars.push(ch)
        step += 1
      } else {
        result.push(ch)
        step = 0
      }
      return
    }

    if (step === 1) {
      if (isJungseong(ch)) {
        chars.push(ch)
        step += 1
      } else {
        result.push(ch)
        step = 0
      }
      return
    }

    if (step === 2) {
      if (isJongseong(ch)) {
        chars.push(ch)
        result.push(composeCharacter(chars))
      } else {
        result.push(composeCharacter(chars))
        result.push(ch)
      }
      chars.length = 0
      step = 0
    }
  })

  if (chars.length) {
    result.push(composeCharacter(chars))
  }

  return result.join('')
}

function composeCharacter (chars) {
  const choseong = chars[0].codePointAt(0) - 0x1100
  const jungseong = chars[1].codePointAt(0) - 0x1161
  const jongseong = chars.length > 2 ? chars[2].codePointAt(0) - 0x11A8 + 1 : 0
  const codePoint = 0xAC00 + choseong * 21 * 28 + jungseong * 28 + jongseong

  return String.fromCodePoint(codePoint)
}

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

function inRangeOf (text, start, end) {
  return Array.from(text).every(ch => {
    const codePoint = ch.codePointAt(0)

    return codePoint >= start && codePoint <= end
  })
}

function isChoseong (text) {
  return inRangeOf(text, 0x1100, 0x1112)
}

function isComposable (text) {
  return isChoseong(text) || isJungseong(text) || isJongseong(text)
}

function isJongseong (text) {
  return inRangeOf(text, 0x11A8, 0x11C2)
}

function isJungseong (text) {
  return inRangeOf(text, 0x1161, 0x1175)
}

function isSyllable (text) {
  return inRangeOf(text, 0xAC00, 0xD7AF)
}

export default {
  compose,
  decompose,
  decomposeAsCompat,
  isChoseong,
  isJongseong,
  isJungseong,
  isSyllable
}
