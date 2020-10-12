# Redux-Saga

- 리덕스는 동기 실행을 진행한다.
- 액션이 호출되었을 때 비동기처리를 해주는 방법에는 Redux-Thunk, Redux-saga가 있다.
- Redux-Saga 사용이유에 사이드이펙트를 처리해줄수 있다고 하는데 그러면 사이드 이펙트가 뭐야?

## Side Effect

- 직접 해석하면, 부작용이다. 공식 문서에서 사이드이펙트를 데이터 요청 등의 비동기 작업, 브라우저 캐시 같은 순수하지 않은 것들을 쉽게 관리한다고 되어있다.
- 비동기로 데이터 요청이 왜 부작용인가 부작용이라 해석하지말고 부수효과라고 생각하자.
- 데이터 요청이나 브라우저 캐시 같은 경우에 항상 같은 결과를 보장하지 않기 때문이라고 생각한다.

### Redux Saga에서만 가능하고 Redux Thunk로는 못하는 다양한 작업들

- 1. 비동기 작업을 할때 기존 요청을 취소 처리할 수 있다.
- 2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치 되게끔하거나, 자바스크립트 코드 실행 가능
- 3. 웹소켓을 사용시, Channel이라는 기능을 사용하여 효율적으로 코드 관리 가능
- 4. API 요청이 실패했을 때 재요청하는 작업이 가능하다.

### 리덕스를 포함한 Saga의 동작 원리

- 1. 리덕스에서 정의한 액션이 디스패치 된것을
- 2. take또는, takeEvery, takeLatest를 가지고 해당 액션에 대해서 watch해놓은 watch 함수가 yield call 또는 fork함수를 가지고 제너레이터 함수를 실행 해줍니다.
- 3. 제너레이터함수에서 해당 데이터를 받아서, API 처리의 경우에는 yield call을 가지고 API를 호출 해주거나, 제너레이터함수 내부에서 yield put을 가지고, 처리 결과에 대해서 액션을 dispatch해주어 결과값을 전달해줍니다. 그리고 리덕스 스테이트에 대해 반영 처리를 해줍니다.

### Redux-Saga 이펙트 종류

- PUT : dispatch(스토어 액션 실행)라고 생각하면된다.
- takeEvery : 모든 액션에 대해서 처리해준다.
- takeLatest : 이전 요청이 끝나지 않았는데, 같은 종류의 액션이 여러번 요청된다면, 이전 요청을 취소한다. 결국 가장 마지막 액션에 대해서만 동작을 실행한다.
- fork : 함수를 실행 시켜주는 이펙트(비동기 실행, 순서를 보장해주지 않는다.)
- call : 함수를 실행 시켜주는 이펙트(동기 실행, 순서대로 함수를 실행해야하는 API 요청 같은 곳에 쓰인다)
- all : 배열 안의 여러 사가를 동시에 실행시켜준다. (병렬 처리)

```javascript
// all Effect를 사용하지 않은것.
const users  = yield call(fetch, '/users'),
      repos = yield call(fetch, '/repos')
// all Effect를 사용한것.
import { all, call } from 'redux-saga/effects'

// correct, effects will get executed in parallel
const [users, repos]  = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos')
])
```

- delay : 시간을 지연 시켜주는 것.
- select : 현재 스테이트 값을 받아올 수 있다.
- throttle : 지정해놓은 ms 주기 사이에 발생하는 같은 액션은 놓치게 만든다.

```javascript
 yield throttle(500, 'INPUT_CHANGED', handleInput)
```

- cancel: 태스크가 fork 되었다면, 사용해서 취소가 가능하다.
- cancelled: 제너레이터 함수에서 yield cancelled를 이용해서 받을 수 있다.

```javascript
import { take, put, call, fork, cancel, cancelled } from "redux-saga/effects";
import { delay } from "redux-saga";
import { someApi, actions } from "somewhere";

function* bgSync() {
  try {
    while (true) {
      yield put(actions.requestStart());
      const result = yield call(someApi);
      yield put(actions.requestSuccess(result));
      yield call(delay, 5000);
    }
  } finally {
    if (yield cancelled()) yield put(actions.requestFailure("Sync cancelled!"));
  }
}

function* main() {
  while (yield take(START_BACKGROUND_SYNC)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync);

    // wait for the user stop action
    yield take(STOP_BACKGROUND_SYNC);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
  }
}
```

- race: 경주에서 진 이펙트들을 취소한다.

```javascript
// delay를 걸어두어, 1초안에 posts API 결과가 먼저 도달해야한다 아니면 취소된다.
import { race, take, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* fetchPostsWithTimeout() {
  const {posts, timeout} = yield race({
    posts: call(fetchApi, '/posts'),
    timeout: call(delay, 1000)
  })

  if (posts)
    put({type: 'POSTS_RECEIVED', posts})
  else
    put({type: 'TIMEOUT_ERROR'})
}
// 취소 버튼을 가지고 작업 취소
import { race, take, put } from 'redux-saga/effects'

function* backgroundTask() {
  while (true) { ... }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```
