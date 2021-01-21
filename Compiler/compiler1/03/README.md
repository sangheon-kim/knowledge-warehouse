# Regular Language

- Regular Expression
- Finite Automata

- ab ^ _ {ab ^ _ | n >= 0}
- (0 + 1) ^ * 는 *은 아무것도 안나올 수 있어서 ε이 나올 수도 있다.
- (0 + 1) ^ \* 00 -> (?)00
- L(a^\*) = {ε,a, aa, ...} = {a ^ n | n >= 0}
- If a = (0 + 1) ^ \*, L (a) = {ε, 0, 1, 00,01,10,11,...}
- If a = (aa)^\*(bb)^\*b, L(a) = {a^2nb^2m+1 | n >= 0, m >= 0}
- a는 짝수만 나올 수 있고, bb\*b는 항상 홀수 밖에 안나온다.

`Regular Expression Equation`

- X => aX | B, X => B | aX(B, aX)
- aaaB => X = a ^ \* B X = a ^ \* B
- (double check) X = aX + b = a(a \* B) + B = a ^ + + B = (a ^ + + ε)B = a ^ \* B

[Example]

- For G = ({S, R}, {a,b}, P, S), L(G)
- (i) S -> aS | bR | ε and (ii) R -> aS.
- P를 먼저 변환해준다. (i) S = aS + bR + ε and (ii) R = aS
- S = aS + b(aS) + ε = aS + baS + ε = (a + ba)S + ε = (a + ba) ^ \* \* ε = (a + ba) ^ \*,
- L(G) = (a + ba) ^ \*
- S를 위에 솔루션과 똑같이 생각하면 a ^ \* B
