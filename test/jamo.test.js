import jamo from '../src/jamo'

describe('isSyllable 함수는 한글 음절 여부를 확인한다', () => {
  test('모든 문자가 한글 음절일 경우에만 true를 돌려준다', () => {
    expect(jamo.isSyllable('abc')).toBeFalsy()
    expect(jamo.isSyllable('ㄱㄴㄷ')).toBeFalsy()
    expect(jamo.isSyllable('가a나b다c')).toBeFalsy()
    expect(jamo.isSyllable('가나다')).toBeTruthy()
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
