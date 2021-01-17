# Address-Book-with-node.js

## Reference

1.  http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기 > 프로젝트 전반적인 내용

- **차별점** : `mongoose > sequelize sequelize-cli mysql2`
- **차별점2** : `routes 분리 및 기능 구조화`

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

## 3. 주소록 - index, new, create

- 이름, 이메일 주소, 전화번호를 받는 form을 만들어 이 정보를 서버로 전달할 수 있게하고 (new), 서버가 이 정보를 사용해서 DB에 정보를 생성하고 (create), 생성된 주소록의 이름 목록을 보여줍니다(index)
- 웹 브라우저의 form으로 전송된 데이터를 서버에서 쉽게 사용하기 위해 ~~body-parser package 설치 > `웹 브라우저의 form에 입력한 데이터가 bodyParser를 통해 req.body로 생성`~~ > express에 내장되어 있기 때문에 아래와 같이 사용

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

> 폴더 내 구조
> <br> > <img scr="https://user-images.githubusercontent.com/41010744/104846780-9b579a80-591f-11eb-979d-995f7dff4826.png"> > <br>

> 참고 사이트(http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기) 와의 다른 처리 내용

1. **router 분리 및 기능별 다른 처리 : try/catch + async/await**

- [routes/index.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/routes/index.js) : Home Router/GET
- [routes/contacts.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/routes/contacts.js) : User Info Router/GET,POST, User registration Route/GET

2. **Mongoose Module -> Seuquelize & Sequelize-cli & Mysql2 Moudule**

- config, seeders, models, migration Folder > 아래의 코드를 통해 폴더 생성

```
npx sequelize init
```

- [config/config.json](https://github.com/tjfruddnjs1/Address-Book-with-node.js/tree/main/config) 을 통한 database 설정
- [models/index.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/models/index.js) : 테이블 전체적인 layout 설정
- [models/contact.js](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/models/contact.js) : name, email, phone 컬럼 설정 > `name : primary key`
- timeStamps 속성을 false 함을 통한 created, deleted 등 속성 제거
- name을 primary key로 설정함에 따라 id(auto increment)속성 제거
- **1. 결과사진 : 메인화면**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104848532-bb3f8c00-5928-11eb-88ce-b8c40e94790d.png">
  <br>

- **2. 결과사진 : 사용자등록**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104848587-0b1e5300-5929-11eb-9c6f-2ad76f15429e.png">
  <br>

- **3. 결과사진 : 데이터베이스 내 정보 확인 및 웹페이지 출력 결과**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104848584-06f23580-5929-11eb-9824-46821a9bef99.png">
  <br>

- 만약 이름을 입력하지 않고 form을 submit하면 에러가 표시
<!-- - 7 actions 중 update와 destroy는 `HTTP methods`중 put과 delete를 사용하는데, 대부분의 브라우저의 form은 get, post만을 허용하고 나머지를 허용하지 않는다. 브라우저에서 허용하진 않지만 나중에 API로 연결할때는 문제가 X > HTTP를 올바르게 사용하는 법을 익히는 것이 중요
- 현재는 `method override`라는 package를 설치하여 이를 우회

```
npm install --save method-override
```

- 역할 : query로 method값을 받아 request의 HTTP method를 바꿔주는 역할 -->
