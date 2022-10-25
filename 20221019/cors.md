# CORS (Origin Site)

- origin
  scheme://hostname::port

- cross origin issue
  도메인이 다른경우, 서브 도메인이 다른 경우, scheme이 다른 경우, port가 다른 경우

Site

- TLD와 domain의 조합.
- .com, .org (Root Zone)
- eTLD(effective Top Level Domain) 리스트

https://mail.naver.com
TLD - .com
eTLD - naver.com
eTLD+1 : mail.naver.com

https://yceffort.kr 기준

스킴이나, 포트나 서브도메인이 달라도 도메인이 같으면 same-site

https://fake.kr:443 - cross-site (도메인이 다름)
https://blog.yceffort.kr:443 - same-site (서브 도메인이 다르지만 상관 없음)
http://yceffort.kr - same-site (스킴은 다르지만 상관없음)

schemeful-same-site (서브 도메인, 포트가 다른 것)
cross-site(도메인이 다른 경우, scheme이 다른 경우)
