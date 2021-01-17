# Address-Book-with-node.js

## Reference

1.  http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기 > 프로젝트 전반적인 내용

- **차별점** : `mongoose > sequelize sequelize-cli mysql2`
- **차별점2** : `routes 분리 및 재사용을 위한 기능 구조화`
- **차별점3** : `favicon.ico 404 error message 해결`
- **차별점4** : `create, update, delete 이후 index 페이지로의 이동`

2. NodeJS 교과서 개정 2판

## 1. 주소록 - 프로젝트 생성 및 sequelize로 DB 연결

- [package.json](https://github.com/tjfruddnjs1/Address-Book-with-node.js/blob/main/package.json) : 사용 패키지

- 버전 정보 및 설치 명령어
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104850159-d0b8b400-5930-11eb-9291-b6f1596e78ff.png">
  <br>

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

- `index` : 생성된 주소록의 이름 목록을 보여줍니다.
- `new` : 이름, 이메일 주소, 전화번호를 받는 form을 만들어 이 정보를 서버로 전달할 수 있게 합니다.
- `create` : 서버가 이 정보를 사용해서 DB에 정보를 생성합니다.
- 웹 브라우저의 form으로 전송된 데이터를 서버에서 쉽게 사용하기 위해 ~~body-parser package 설치 > `웹 브라우저의 form에 입력한 데이터가 bodyParser를 통해 req.body로 생성`~~ > express에 내장되어 있기 때문에 아래와 같이 사용 > `기존 프로젝트와 다른점`

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

> 폴더 내 구조
> <br> > <img scr="https://user-images.githubusercontent.com/41010744/104846780-9b579a80-591f-11eb-979d-995f7dff4826.png"> > <br>

> 참고 사이트(http://a-mean-blog.com/ko/blog/Node-JS-첫걸음/주소록-만들기) 와의 다른 처리 내용

1. **router 분리 및 기능별 다른 처리 : try/catch + async/await > Promise**

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
- name을 primary key로 설정함에 따라 `id(auto increment)속성` 제거
- `primary key 미 설정시 id라는 PK 자동 설정`
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

- 만약 이름을 입력하지 않고 form을 submit하면 에러가 표시 > PK(Primary Key)이기 때문

## 4. 주소록 - Show, Edit, Update, Destroy

- `show` : 전체목록(index)에서 하나를 선택하면 해당 데이터를 보여줍니다.
- `edit` : 해당 데이터를 수정할 수 있는 form을 만들어 정보를 서버로 전달합니다.
- `update` : 서버가 이 정보를 사용해서 database 정보를 수정합니다.
- `destroy` : 해당 데이터를 삭제 합니다.

- 7 actions 중 update와 destroy는 `HTTP methods`중 put과 delete를 사용하는데, 대부분의 브라우저의 form은 get, post만을 허용하고 나머지를 허용하지 않는다. 브라우저에서 허용하진 않지만 나중에 API로 연결할때는 문제가 된다~~
- 현재는 `method override`라는 package를 설치하여 이를 우회

```
npm install --save method-override
```

- 역할 : query로 method값을 받아 request의 HTTP method를 바꿔주는 역할
  > 대안 : axios를 통해 처리 , 아직 익숙하지 않아 해당 패키지를 사용

### 프로젝트 진행 도중 문제점 및 해결방법 & 그외 처리 내용

> 1. router 처리 중 사용자로부터 받는 주소 쿼리

- ex. contacts/:id
- :id처럼 route에 콜론(:)을 사용하면 해당 위치의 값을 받아 req.params에 넣게 됩니다. 예를 들어 "contacts/abcd1234"가 입력되면 "contacts/:id" route에서 이를 받아 req.params.id에 "abcd1234"를 넣게 됩니다.

> 2. Sequelize에서 지원하는 select 함수

- findAll() : 원하는 조건에 따라 원하는 데이터를 전부 가져옵니다.
- findOne() : 원하는 조건에 따라 하나의 row만을 가져옵니다.
- findById() : 아이디 검색을 통해 row를 가져옵니다.
- findOrCreate() : 처음 데이터를 조회하고 원하는 데이터가 존재하지 않으면 데이터를 생성합니다.
- findAndCountAll() : 검색한 데이터를 전체 검색하고 검색된 데이터의 갯수를 반환합니다.
- `findByPk()` : 데이터에 해당하는 주키를 가진 row를 가져옵니다.
- 그 외 Raw Query로 처리 : 직접 쿼리를 돌려야 할때는 models.sequelize.query() 함수를 사용한다. 쿼리문에 :name으로 설정한뒤 replacements에 해당 name 키가 있는 객체를 넘겨주면 쿼리의 :name을 replacements에 있는 값으로 치환하여 쿼리를 실행한다.

```js
var query = "select * form Foo where name = :name";
var values = {
  name: "chris",
};

models.sequelize.query(query, { replacements: values }).spread(
  function (results, metadata) {
    // 쿼리 실행 성공
  },
  function (err) {
    // 쿼리 실행 에러
  }
);
```

- [routes/contacts.js]() : GET을 수행할때 findByPk를 사용하여 가져왔습니다.

> 3. method override package

- [views/show.ejs]()
- a tag로는 get만 요청할수 있기 때문에 delete는 form으로 처리해야합니다. form에서도 post밖에 요청할 수 없기 때문에 ?\_method=delete이 action에 query로 추가되었습니다. 이부분은 서버의 `method override package`에 의해 처리되어 delete 요청을 변경됩니다.

> 4. favicon.ico error message 해결

- 아이콘이 없거나 경로가 맞지 않으면 생기는 오류
- 아래 코드를 [partials/head.ejs]()에 추가

```html
<html>
  <head>
    <link rel="shortcut icon" href="#" />
  </head>
</html>
```

> 5. Create , Update, Delete 동작 이후 index 페이지로 이동 > Error Message 경험

- 해당 동작 이후 index 페이지로 돌아가게 하기 위해 아래 코드를 작성했는데, `Can't set headers after they are sent` error message를 경험했습니다.

```js
res.status(201).json(contact);
res.redirect("/contacts");
```

- 해당 에러는 res.redirect 처리가 잘못되었을 때 발생하고 보통의 경우 if문과 반복문에 중복처리가 되어 발생한다고 합니다. client에 데이터 전송 후 처리를 올바르게 해야한다고 생각했습니다. 해결은 `res.json`과 `res.redirect`의 위치를 바꿔주어 해결했습니다.

- **1. 결과사진 : 현재 Database 상태 및 수정/삭제 버튼**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104856966-ada1fa80-5958-11eb-84f1-58ea5204efeb.png">
  <br>
- **2. 결과사진 : 수정된 Database 상태 및 수정하는 모습**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104856997-e80b9780-5958-11eb-8a02-dbdd54bb49fc.png">
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104857012-f5c11d00-5958-11eb-9e1b-a223a2cdcd1c.png">
  <br>
- **3. 결과사진 : 삭제된 Database 상태 및 삭제하는 모습**
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104857034-1be6bd00-5959-11eb-8a99-f9ea0bdfe227.png">
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/104857039-23a66180-5959-11eb-9a84-ce349cfbfc9c.png">
  <br>
