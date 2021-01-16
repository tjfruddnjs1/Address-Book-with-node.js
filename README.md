# Address-Book-with-node.js

- Reference

1.  http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기 > 프로젝트 전반적인 내용

- **차별점** : mongoose > sequelize sequelize-cli mysql2

2. NodeJS 교과서 개정 2판

## 주소록 - 프로젝트 생성 및 sequelize로 DB 연결

- [package.json]() : 사용 패키지

```node
npm i --save ejs express express-session morgan mysql2 sequelize sequelize-cli

npm i -D nodemon
```

- [index.js]() : 연결 패키지 세팅
- [models/index.js]() : 데이터베이스 연결 설정

- 데이터베이스 연결 상태 및 address 이름의 database 생성
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104811602-1c3f6500-5840-11eb-9f8b-8961956692c4.png">
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104811631-39743380-5840-11eb-8931-d789d02abeca.png">
  <br>
