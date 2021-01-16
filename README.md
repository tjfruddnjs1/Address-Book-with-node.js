# Address-Book-with-node.js

## Reference

1.  http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기 > 프로젝트 전반적인 내용

- **차별점** : `mongoose > sequelize sequelize-cli mysql2`

2. NodeJS 교과서 개정 2판

## 1. 주소록 - 프로젝트 생성 및 sequelize로 DB 연결

- [package.json](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/package.json) : 사용 패키지

```node
npm i --save ejs express express-session morgan mysql2 sequelize sequelize-cli

npm i -D nodemon
```

- [index.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/index.js) : 연결 패키지 세팅
- [models/index.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/models/index.js) : 데이터베이스 연결 설정

- 데이터베이스 연결 상태 및 address 이름의 database 생성
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104811602-1c3f6500-5840-11eb-9f8b-8961956692c4.png">
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104811631-39743380-5840-11eb-8931-d789d02abeca.png">
  <br>

## 2. 주소록 - CRUD와 7 Standard Actions

1. CRUD(Create, Read, Update, Delete) : 데이터의 생성, 조회, 수정, 삭제
2. 7 Standard Actions (=Standard Controller Actions, Golden Seven Actions) : 자료를 웹사이트에서 처리하기 위해 해야하는 동작
   > 생성

- New : 생성폼(from)을 사용자에게 보여주고,
- Create : 전달 받은 자료를 실제로 생성하는 과정 필요
  > 수정
- Edit : 수정폼을 사용자에게 보여주고,
- Update : 전달 받은 자료를 바탕으로 현재 자료를 수정
  > 조회
- Index : 자료들의 목록을 조회
- Show : 하나의 자료를 상세히 보여주기
  > 삭제
- Destroy : 자료를 삭제
- 이 7 actions를 `http verbs`와 관련하여 route를만들어 보면, 아래와 같은 표가 나오게 됩니다.
  Action | http verbs | Route
  ------- | ------- | ------
  index | GET | /data
  show | GET | /data/:id
  new | GET | /data/new
  create | POST | /data
  edit | GET | /data/:id/edit
  update | PUT | /data/:id
  destroy | DELETE | /data/:id
- data는 action의 대상을 나타내며 영어 복수형으로 적어줍니다. ex. 전화번호의 new action이라면 `route는 phones/new`
- :id는 하나의 특정한 data를 나타내주는 key값으로 변화되는 값
