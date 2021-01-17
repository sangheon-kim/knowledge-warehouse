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

- 문자열 길이 구하는 방법.
- T2 = {do, switch, case, while, ...}
- 심벌의 개수를 세는 것이다. (docase) = 2 길이가 2가 되는것이다.

- u = a1a2a3...an
- v = b1b2b3...bm,

중간 .을 이용하면 concatenation 했다라고 표현해주는 것과 동일하다. (uv)라고 쓰면 u는 prefix, v는 suffix이다.

- u.v = a1a2a3...anb1b2b3...bm
- u.v != v.u
- |uv| = |u| + |v|, |4| = |2| + |2|; (a1a2b1b2)
