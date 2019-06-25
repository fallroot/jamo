function decompose (text) {
  return Array.from(text).map(ch => {
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

export default {
  decompose
}
