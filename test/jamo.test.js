import jamo from '../src/jamo'

describe('decompose 함수는 한글 음절을 자모 단위로 분해한다', () => {
  test('받침이 있는 음절을 초/중/종성 순서의 배열로 돌려준다', () => {
    expect(jamo.decompose('각')).toEqual([['ᄀ', 'ᅡ', 'ᆨ']])
    expect(jamo.decompose('힣')).toEqual([['ᄒ', 'ᅵ', 'ᇂ']])
  })

  test('받침이 없는 음절을 초/중성 순서의 배열로 돌려준다', () => {
    expect(jamo.decompose('가')).toEqual([['ᄀ', 'ᅡ']])
    expect(jamo.decompose('히')).toEqual([['ᄒ', 'ᅵ']])
  })
})
