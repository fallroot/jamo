# JAMO - 한글 첫가끝/호환성 자/모음의 조합/분해를 위한 라이브러리

## 설치
```
$ npm install jamo
```

## 함수 목록

### `compose (jamos)`
첫가끝 자모의 초/중/종성을 인수 목록 또는 단일/이중 배열로 받아 한글 음절로 합성한다.

```javascript
jamo.compose('ᄒ', 'ᅡ', 'ᆫ') // '한'
jamo.compose(['ᄀ', 'ᅳ', 'ᆯ']) // '글'
jamo.compose([['ᄌ', 'ᅡ'], ['ᄆ', 'ᅩ']]) // '자모'
```

### `composeWithCompat (compats)`
호환성 자모의 초/중/종성을 인수 목록 또는 단일/이중 배열로 받아 한글 음절로 합성한다.

```javascript
jamo.composeWithCompat('ㅎ', 'ㅏ', 'ㄴ') // '한'
jamo.composeWithCompat(['ㄱ', 'ㅡ', 'ㄹ']) // '글'
jamo.composeWithCompat([['ㅈ', 'ㅏ'], ['ㅁ', 'ㅗ']]) // '자모'
```

### `decompose (text)`
한글 음절을 받아 첫가끝 자모의 초/중/종성의 배열로 분해한다.

```javascript
jamo.decompose('한') // [['ᄒ', 'ᅡ', 'ᆫ']]
jamo.decompose('글') // [['ᄀ', 'ᅳ', 'ᆯ']]
jamo.decompose('자모') // [['ᄌ', 'ᅡ'], ['ᄆ', 'ᅩ']]
```

### `decomposeAsCompat (text)`
한글 음절을 받아 호환성 자모의 배열로 분해한다.

```javascript
jamo.decomposeAsCompat('한') // [['ㅎ', 'ㅏ', 'ㄴ']]
jamo.decomposeAsCompat('글') // [['ㄱ', 'ㅡ', 'ㄹ']]
jamo.decomposeAsCompat('자모') // [['ㅈ', 'ㅏ'], ['ㅁ', 'ㅗ']]
```

### `getChoseongFromCompat (char)`
호환용 자음을 받아 이에 해당하는 첫가끝 자모의 초성으로 돌려준다.

```javascript
jamo.getChoseongFromCompat('ㄱ') // 'ᄀ' (0x3131 → 0x1100)
```

### `getJungseongFromCompat (char)`
호환용 모음을 받아 이에 해당하는 첫가끝 자모의 중성으로 돌려준다.

```javascript
jamo.getJungseongFromCompat('ㅏ') // 'ᅡ' (0x314F → 0x1161)
```

### `getJongseongFromCompat (char)`
호환용 자음을 받아 이에 해당하는 첫가끝 자모의 종성으로 돌려준다.

```javascript
jamo.getJongseongFromCompat('ㄱ') // 'ᆨ' (0x314E → 0x11A8)
```

### `isChoseong (text)`
해당 문자 또는 문자열이 모두 첫가끝 자모의 초성에 해당하는지 검사한다. (옛한글 제외, 0x1100 ~ 0x1112)

### `isJungseong (text)`
해당 문자 또는 문자열이 모두 첫가끝 자모의 중성에 해당하는지 검사한다. (옛한글 제외, 0x1161 ~ 0x1175)

### `isJongseong (text)`
해당 문자 또는 문자열이 모두 첫가끝 자모의 종성에 해당하는지 검사한다. (옛한글 제외, 0x11A8 ~ 0x11C2)

### `isCompatConsonant (text)`
해당 문자 또는 문자열이 모두 호환용 자음에 해당하는지 검사한다. (옛한글 제외, 0x3131 ~ 0x314E)

### `isCompatVowel (text)`
해당 문자 또는 문자열이 모두 호환용 모음에 해당하는지 검사한다. (옛한글 제외, 0x314F ~ 0x3163)

### `isSyllabl (text)`
해당 문자 또는 문자열이 모두 한글 음절에 해당하는지 검사한다. (0xAC00 ~ 0xD7AF)
