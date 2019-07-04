import jamo from '../src/jamo'

describe('isChoseong 함수는 초성 여부를 확인한다', () => {
  test('모든 문자가 초성일 경우에만 true를 돌려준다', () => {
    expect(jamo.isChoseong('abc')).toBeFalsy()
    expect(jamo.isChoseong('ᄀaᄂbᄃ')).toBeFalsy()
    expect(jamo.isChoseong('ᄀᄂᄃ')).toBeTruthy()
  })

  test('여러 문자열 인자도 처리한다', () => {
    expect(jamo.isChoseong('ᄀ', 'ᄂ', 'ᄃ')).toBeTruthy()
    expect(jamo.isChoseong('ᄀᄂᄃ', 'ᇀᇁᇂ')).toBeTruthy()
  })
})

describe('isJungseong 함수는 중성 여부를 확인한다', () => {
  test('모든 문자가 중성일 경우에만 true를 돌려준다', () => {
    expect(jamo.isJungseong('abc')).toBeFalsy()
    expect(jamo.isJungseong('ᅡaᅩbᅳcᅵ')).toBeFalsy()
    expect(jamo.isJungseong('ᅡᅩᅳᅵ')).toBeTruthy()
    expect(jamo.isJungseong('ᅡ', 'ᅩ', 'ᅳ', 'ᅵ')).toBeTruthy()
  })
})

describe('isJongseong 함수는 종성 여부를 확인한다', () => {
  test('모든 문자가 종성일 경우에만 true를 돌려준다', () => {
    expect(jamo.isJongseong('abc')).toBeFalsy()
    expect(jamo.isJongseong('ᄀᄂᄃ')).toBeFalsy()
    expect(jamo.isJongseong('ᆨ', 'ᆫ', 'ᆮ')).toBeTruthy()
    expect(jamo.isJongseong('ᆨᆫᆮ')).toBeTruthy()
  })
})

describe('isSyllable 함수는 한글 음절 여부를 확인한다', () => {
  test('모든 문자가 한글 음절일 경우에만 true를 돌려준다', () => {
    expect(jamo.isSyllable('abc')).toBeFalsy()
    expect(jamo.isSyllable('ㄱㄴㄷ')).toBeFalsy()
    expect(jamo.isSyllable('가a나b다c')).toBeFalsy()
    expect(jamo.isSyllable('가나다')).toBeTruthy()
  })
})

describe('compose 함수는 초/중/종성을 받아 한글 음절로 합성한다', () => {
  test('한글 음절로 합성할 수 없는 문자는 그대로 돌려준다', () => {
    expect(jamo.compose('a', 'b', 'c')).toEqual('abc')
    expect(jamo.compose('ㄱ', 'ㄴ', 'ㄷ')).toEqual('ㄱㄴㄷ')
  })

  test('초/중/종성을 받침이 있는 한글 음절로 합성한다', () => {
    expect(jamo.compose('ᄀ', 'ᅡ', 'ᆨ')).toEqual('각')
    expect(jamo.compose('ᄒ', 'ᅵ', 'ᇂ')).toEqual('힣')
  })

  test('초/중성을 받침이 없는 한글 음절로 합성한다', () => {
    expect(jamo.compose('ᄀ', 'ᅡ')).toEqual('가')
    expect(jamo.compose('ᄒ', 'ᅵ')).toEqual('히')
  })

  test('합성할 수 없는 초/중/종성은 그대로 돌려준다', () => {
    expect(jamo.compose('ᄀ', 'ᄀ', 'ᅡ')).toEqual('ᄀ가')
    expect(jamo.compose('ᄀ', 'ᅡ', 'ᄒ', 'ᄀ', 'ᅡ')).toEqual('가ᄒ가')
    expect(jamo.compose('ᇂ', 'ᅡ', 'ᄀ', 'ᅡ')).toEqual('ᇂᅡ가')
  })
})

describe('composeWithCompat 함수는 호환성 자모를 받아 한글 음절로 합성한다', () => {
  test('한글 음절로 합성할 수 없는 문자는 그대로 돌려준다', () => {
    expect(jamo.composeWithCompat('a', 'b', 'c')).toEqual('abc')
    expect(jamo.composeWithCompat('ㄱ', 'ㄴ', 'ㄷ')).toEqual('ㄱㄴㄷ')
  })

  test('초/중/종성을 받침이 있는 한글 음절로 합성한다', () => {
    expect(jamo.composeWithCompat('ㄱ', 'ㅏ', 'ㄱ')).toEqual('각')
    expect(jamo.composeWithCompat('ㅎ', 'ㅣ', 'ㅎ')).toEqual('힣')
  })

  test('초/중성을 받침이 없는 한글 음절로 합성한다', () => {
    expect(jamo.composeWithCompat('ㄱ', 'ㅏ')).toEqual('가')
    expect(jamo.composeWithCompat('ㅎ', 'ㅣ')).toEqual('히')
  })

  test('자음+모음 합성 후 자음+모음이 올 경우 종성으로 처리하지 않는다', () => {
    expect(jamo.composeWithCompat('ㄱ', 'ㅏ', 'ㄱ', 'ㅏ')).toEqual('가가')
  })
})

describe('decompose 함수는 한글 음절을 자모 단위로 분해한다', () => {
  test('한글 음절이 아닌 문자는 그대로 돌려준다', () => {
    expect(jamo.decompose('abc')).toEqual([['a'], ['b'], ['c']])
    expect(jamo.decompose('ㄱㄴㄷ')).toEqual([['ㄱ'], ['ㄴ'], ['ㄷ']])
  })

  test('받침이 있는 음절을 초/중/종성 순서의 배열로 돌려준다', () => {
    expect(jamo.decompose('각')).toEqual([['ᄀ', 'ᅡ', 'ᆨ']])
    expect(jamo.decompose('힣')).toEqual([['ᄒ', 'ᅵ', 'ᇂ']])
  })

  test('받침이 없는 음절을 초/중성 순서의 배열로 돌려준다', () => {
    expect(jamo.decompose('가')).toEqual([['ᄀ', 'ᅡ']])
    expect(jamo.decompose('히')).toEqual([['ᄒ', 'ᅵ']])
  })
})

describe('decomposeAsCompat 함수는 한글 음절을 호환성 자모 단위로 분해한다', () => {
  test('한글 음절이 아닌 문자는 그대로 돌려준다', () => {
    expect(jamo.decomposeAsCompat('abc')).toEqual([['a'], ['b'], ['c']])
    expect(jamo.decomposeAsCompat('ㄱㄴㄷ')).toEqual([['ㄱ'], ['ㄴ'], ['ㄷ']])
  })

  test('받침이 있는 음절을 초/중/종성 순서의 배열로 돌려준다', () => {
    expect(jamo.decomposeAsCompat('각')).toEqual([['ㄱ', 'ㅏ', 'ㄱ']])
    expect(jamo.decomposeAsCompat('힣')).toEqual([['ㅎ', 'ㅣ', 'ㅎ']])
  })

  test('받침이 없는 음절을 초/중성 순서의 배열로 돌려준다', () => {
    expect(jamo.decomposeAsCompat('가')).toEqual([['ㄱ', 'ㅏ']])
    expect(jamo.decomposeAsCompat('히')).toEqual([['ㅎ', 'ㅣ']])
  })
})
