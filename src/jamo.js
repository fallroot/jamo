function decompose (text) {
  return Array.from(text).map(ch => {
    if (!isSyllable(ch)) {
      return [ch]
    }

    const offset = ch.codePointAt(0) - 0xAC00
    const jongseong = offset % 28
    const jungseong = ((offset - jongseong) / 28) % 21
    const choseong = (((offset - jongseong) / 28) - jungseong) / 21
    const result = [
      String.fromCodePoint(0x1100 + choseong),
      String.fromCodePoint(0x1161 + jungseong)
    ]

    if (jongseong) {
      result.push(String.fromCodePoint(0x11A8 + jongseong - 1))
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
  isSyllable
}
