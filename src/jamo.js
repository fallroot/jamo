const COMPAT_TO_CHOSEUNG = [0, 1, -1, 2, -1, -1, 3, 4, 5, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const COMPAT_TO_JONGSEUNG = [0, 1, 2, 3, 4, 5, 6, -1, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, -1, 17, 18, 19, 20, 21, -1, 22, 23, 24, 25, 26]
const CHOSEONG_TO_COMPAT = [0, 1, 3, 6, 7, 8, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
const JONGSEONG_TO_COMPAT = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29]
const CHOSEONG_FIRST = 0x1100
const CHOSEONG_LAST = 0x1112
const JUNGSEONG_FIRST = 0x1161
const JUNGSEONG_LAST = 0x1175
const JONGSEONG_FIRST = 0x11A8
const JONGSEONG_LAST = 0x11C2
const COMPAT_CONSONANT_FIRST = 0x3131
const COMPAT_CONSONANT_LAST = 0x314E
const COMPAT_VOWEL_FIRST = 0x314F
const COMPAT_VOWEL_LAST = 0x3163
const SYLLABLE_FIRST = 0xAC00
const SYLLABLE_LAST = 0xD7AF

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
  if (chars.length < 2) {
    return chars
  }

  const choseong = chars[0].codePointAt(0) - CHOSEONG_FIRST
  const jungseong = chars[1].codePointAt(0) - JUNGSEONG_FIRST
  const jongseong = chars.length > 2 ? chars[2].codePointAt(0) - JONGSEONG_FIRST + 1 : 0
  const codePoint = SYLLABLE_FIRST + choseong * 21 * 28 + jungseong * 28 + jongseong

  return String.fromCodePoint(codePoint)
}

function composeWithCompat (...args) {
  const chars = []
  const jamos = []
  let result = []
  let step = 0

  args.forEach(ch => {
    if (!isCompat(ch)) {
      step = 0
      result.push(ch)
      return
    }

    if (step === 0) {
      if (isCompatConsonant(ch)) {
        chars.push(ch)
        jamos.push(getChoseongFromCompat(ch))
        step += 1
      } else {
        if (chars.length) {
          result = result.concat(chars)
        }
        result.push(ch)
        chars.length = 0
        jamos.length = 0
        step = 0
      }
      return
    }

    if (step === 1) {
      if (isCompatVowel(ch)) {
        chars.push(ch)
        jamos.push(getJungseongFromCompat(ch))
        step += 1
      } else {
        if (chars.length) {
          result = result.concat(chars)
        }
        result.push(ch)
        chars.length = 0
        jamos.length = 0
        step = 0
      }
      return
    }

    if (step === 2) {
      if (isCompatConsonant(ch)) {
        jamos.push(getJongseongFromCompat(ch))
        result.push(composeCharacter(jamos))
      } else {
        result.push(composeCharacter(jamos))
        result.push(ch)
      }
      chars.length = 0
      jamos.length = 0
      step = 0
    }
  })

  if (jamos.length > 1) {
    result.push(composeCharacter(jamos))
  } else if (chars.length) {
    result = result.concat(chars)
  }

  return result.join('')
}

function getChoseongFromCompat (text) {
  if (isCompatConsonant(text)) {
    return String.fromCodePoint(CHOSEONG_FIRST + COMPAT_TO_CHOSEUNG[text.codePointAt(0) - COMPAT_CONSONANT_FIRST])
  }
}

function getJongseongFromCompat (text) {
  if (isCompatConsonant(text)) {
    return String.fromCodePoint(JONGSEONG_FIRST + COMPAT_TO_JONGSEUNG[text.codePointAt(0) - COMPAT_CONSONANT_FIRST])
  }
}

function getJungseongFromCompat (text) {
  if (isCompatVowel(text)) {
    return String.fromCodePoint(JUNGSEONG_FIRST + text.codePointAt(0) - COMPAT_VOWEL_FIRST)
  }
}

function decomposeAsOffset (text) {
  const offset = text.codePointAt(0) - SYLLABLE_FIRST
  const jongseong = offset % 28
  const jungseong = ((offset - jongseong) / 28) % 21
  const choseong = (((offset - jongseong) / 28) - jungseong) / 21

  return {
    choseong,
    jungseong,
    jongseong
  }
}

function decomposeWith (text, getter) {
  return Array.from(text).map(ch => {
    if (!isSyllable(ch)) {
      return [ch]
    }

    const offsets = decomposeAsOffset(ch)
    const codePoints = getter(offsets)

    if (!offsets.jongseong) {
      codePoints.pop()
    }

    return codePoints.map(cp => String.fromCodePoint(cp))
  })
}

function decompose (text) {
  return decomposeWith(text, offsets => [
    CHOSEONG_FIRST + offsets.choseong,
    JUNGSEONG_FIRST + offsets.jungseong,
    JONGSEONG_FIRST + offsets.jongseong - 1
  ])
}

function decomposeAsCompat (text) {
  return decomposeWith(text, offsets => [
    COMPAT_CONSONANT_FIRST + CHOSEONG_TO_COMPAT[offsets.choseong],
    COMPAT_VOWEL_FIRST + offsets.jungseong,
    COMPAT_CONSONANT_FIRST + JONGSEONG_TO_COMPAT[offsets.jongseong - 1]
  ])
}

function inRangeOf (text, start, end) {
  return Array.from(text).every(ch => {
    const codePoint = ch.codePointAt(0)

    return codePoint >= start && codePoint <= end
  })
}

function isChoseong (text) {
  return inRangeOf(text, CHOSEONG_FIRST, CHOSEONG_LAST)
}

function isCompat (text) {
  return inRangeOf(text, COMPAT_CONSONANT_FIRST, COMPAT_VOWEL_LAST)
}

function isCompatConsonant (text) {
  return inRangeOf(text, COMPAT_CONSONANT_FIRST, COMPAT_CONSONANT_LAST)
}

function isCompatVowel (text) {
  return inRangeOf(text, COMPAT_VOWEL_FIRST, COMPAT_VOWEL_LAST)
}

function isComposable (text) {
  return isChoseong(text) || isJungseong(text) || isJongseong(text)
}

function isJongseong (text) {
  return inRangeOf(text, JONGSEONG_FIRST, JONGSEONG_LAST)
}

function isJungseong (text) {
  return inRangeOf(text, JUNGSEONG_FIRST, JUNGSEONG_LAST)
}

function isSyllable (text) {
  return inRangeOf(text, SYLLABLE_FIRST, SYLLABLE_LAST)
}

export default {
  compose,
  composeWithCompat,
  decompose,
  decomposeAsCompat,
  isChoseong,
  isJongseong,
  isJungseong,
  isSyllable
}
