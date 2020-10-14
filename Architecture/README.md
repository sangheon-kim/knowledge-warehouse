# 디자인 패턴

- 디자인 패턴이란,

## 1. MVC

- Model + View + Controller

### 1) 구조

- Model : Application에서 사용되는 데이터와 그 데이터를 처리하는 부분
- View : 사용자에게 보여지는 UI 부분.
- Controller : 사용자의 입력(Action)을 받고 처리하는 부분

### 2) 동작

- 1. Action들은 Controller에 들어오게된다.
- 2. Controller는 사용자의 Action를 확인하고, Model을 업데이트 한다.
- 3. Controller는 Model을 나타내줄 View를 선택한다.
- 4. View는 Model을 이용하여 화면을 나타낸다.

#### MVC에서 View가 업데이트 되는 방법

- 1. View가 Model을 이용하여 직접 업데이트 하는 방법.
- 2. Model에서 View에게 Notify 하여 업데이트 하는 방법.
- 3. View가 Polling으로 주기적으로 Model변경을 감지하여 업데이트 하는 방법

### 3) 특징

- Controller는 여러개의 View를 선택할 수 있는 1:n구조.
- View를 선택할 뿐 직접 업데이트 x

### 4) 장점

- MVC 패턴의 장점은 널리 사용되고 있는 패턴이라는 점 가장 단순. 많이 사용됨.

### 5) 단점

- MVC 패턴의 단점은 View와 Model 사이의 의존성이 높다는 것. View와 Model의 높은 의존성은 어플리케이션이 커질수록 복잡해지고 유지보수 어렵게만듬

## 2.MVP

- Model + View + Presenter 합친 용어다.

### 1) 구조

- Model : 어플리케이션에서 사용되는 데이터와 데이터를 처리하는 부분
- View : 사용자에게 보여지는 UI 부분
- Presenter : View에서 요청한 정보로 Model을 가공하여, View에 전달해 주는 부분.

### 2) 동작

- 1. 사용자의 Action들은 View를 통해 들어오게 된다.
- 2. View는 데이터를 Presenter에 요청한다.
- 3. Presenter는 Model에게 데이터를 요청한다.
- 4. Model은 Presenter에서 요청받은 데이터를 응답한다.
- 5. Presenter는 View에게 데이터를 응답한다.
- 6. View는 Presenter가 응답한 데이터를 이용하여 화면을 나타낸다.

### 3) 특징

- Presenter는 View와 Model의 인스턴스를 가지고 있어 둘을 연결하는 매개체 역할을 한다. (Presenter와 View는 1:1 관계다)

### 4) 장점

- View와 Model의 의존성이 없다. MVP 패턴은 View와 Model의 의존성 해결(Presenter를 통해서만 데이터를 전달 받는다.)

### 5) 단점

- MVC 패턴의 단점인 View와 Model 사이 의존성은 해결되었지만, View와 Presenter사이의 의존성이 높게 가지게 되는 단점

## MVVM

- Model + View + View Model 합친 용어

### 1) 구조

- Model: 어플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분
- View : 사용자에게 보여지는 UI 부분
- View Model : View를 표현하기 위해 만든 View를 위한 Model. View를 나타내주기 위한 Model이자 View를 나타내기 위한 데이터 처리를 위한 부분

### 2) 동작

- 1. 사용자의 Action들은 View를 통해 들어온다.
- 2. View에 Action이 들어오면, Command 패턴으로 View Model에 Action을 전달.
- 3. View Model은 Model에게 데이터를 요청
- 4. Model은 View Model에게 요청받은 데이터를 응답한다.
- 5. View Model은 응답 받은 데이터를 가공하여 저장한다.
- 6. View는 View Model과 Data Binding 하여 화면을 나타낸다.

### 3) 특징

- MVVVM패턴은 Command 패턴과 Data Binding 두가지 패턴을 사용하여 구현되었습니다.
- Command 패턴과 Data Binding을 이용하여, View와 View Model 사이 의존성 제거. View Model과 View는 1:n 관계

### 4) 장점

- View와 Model 사이의 의존성 제로. Command 패턴과 Data Binding을 사용하여 View와 View Model 사이의 의존성 또한 없앤 디자인 패턴.

## 4) 아토믹 디자인

- 원자, 분자, 유기체, 템플릿, 페이지의 개념
