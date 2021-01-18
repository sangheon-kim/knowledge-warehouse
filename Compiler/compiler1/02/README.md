# Formal and Regular Language

- Natural Language (자연어)
- Formal Language (정확한 문법에 근거하여야 한다.)
  - 세미 콜론을 붙여줘야 한다. 등

## Formal Language

- Language
- Grammar

### Definition Alphabet T is a finite set of symbols

- T1 = {A, B, C, ...,Z, a,b,c, ..., z}
- T2 = {dom switch, break, case, ..., while}

- Symbol들 끼리 이어 붙인걸 String이라한다.

- If T = {0}, possible strings from alphabet T are 0,00,000...
- If T = {a,b} a,b,aa,ab,ba,bb, aaa, ...,
- 가능한 문자열은 무한대만큼 만들 수 있다.
- 변수명들은 결국 Symbol들은 concatenated 하여 만든 문자열이라고 볼 수 있다.

`문자열의 길이`

- 문자열 길이 구하는 방법.
- T2 = {do, switch, case, while, ...}
- 심벌의 개수를 세는 것이다. (docase) = 2 길이가 2가 되는것이다.

`문자열의 연결`

- u = a1a2a3...an
- v = b1b2b3...bm,

중간 .을 이용하면 concatenation 했다라고 표현해주는 것과 동일하다. (uv)라고 쓰면 u는 prefix, v는 suffix이다.

- u.v = a1a2a3...anb1b2b3...bm
- u.v != v.u
- |uv| = |u| + |v|, |4| = |2| + |2|; (a1a2b1b2)

`Empty String(ε)`

- length가 0 이면 Empty String이라고 부른다. epsilon(ε)이나 lambda(λ)라고 쓴다.
- uε = u = εu
  = uεv = uv
- |ε| = 0
- |a^n | = n
- a ^ 9 = ε
- w ^ R(reverse string) = a3a2a1

`T ^ *, T ^ + 의 대한 정의`

- T = {a, b}
- T ^ \+ = {a b aa aaa aab a...ab} (심볼을 가지고 조합할 수 있는 조합)
- T ^ \* = {ε, a b aa aaa aab a...ab} (Epsilon 까지 포함)
- T ^ \* - ε U T ^ \+
- T 는 유한한 심볼 셋이지만, T ^ \* 은 무한한 심볼 집합이다. (T가 공집합이 아닐 경우에)

`Language L`

- language L은 알파벳 T 문자열 셋중에서 하나의 문자열들로 이루어진 집합
- C - {[A-Za-z]}변수를 만드는 부호
- C = {[A-Za-z,-,0~9]} -- C언어의 변수를 만들 수 있는 심볼 집합
- T^\* = {a,b, 123_a(x)} -- Language
- T = {a,b}

  - L1 = {a,ab,ba,aba} -> 유한한 언어
  - L2 = T ^ \* = {ε, a,b,aa,ab,...} -> 무한한 언어
  - L3 = {a ^ n b ^ b | n >= 1} => 무한한 언어 (일부 규칙만 뽑아서 언어를 만든다.)
  - L4 = {ww ^ R | w ∈ ㅆ ^ \*} => 무한한 언어
    - w = a1a2 => a1a2a2a1 | a1a2는 T^\* 의합집합

`Product of Languages (언어끼리의 곱)`

- two 언어들을 곱할 수 있다. L1 \* L2 = L1 concatenation of L2
- uv != vu
- IF L1 = {a,ab,ba,aba}, L1{a,b} = {aa, aba, baa, abaa, ab, abb, bab, abab}
- If L3 = {a ^ n b ^ n | n >= 1}, L3{a ^ m | m >= 1} = {a ^ n b ^ n a ^ m | n >= 1, m >= 1}

`Power`

- L ^ 0 = {ε}, L ^ n = LL ^ n-1, n >= 1

- L ^ 0 = {ε}
- L ^ 1 = {a, ba, aab}
- L ^ 2 = {aa, aba, aaba, baa, baba, baaab, aaba, aabba, aabaab}
