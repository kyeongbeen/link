# 연결고리
이 문서에서는 연결고리 프로젝트 버전, 의존성 설치, 디렉토리 구조, 구현 현황 등에 대해 설명합니다.

## 의존성 설치

- **React**: UI 컴포넌트를 구축하기 위한 JavaScript 라이브러리
- **@mui/material**: UI 구성 요소를 위한 Material UI 라이브러리
- **@emotion/react**: 스타일링을 위한 Emotion 라이브러리
- **zustand**: 간단한 상태 관리를 위한 라이브러리
- **Sass**: CSS 전처리기
- **styled-components**: CSS-in-JS 스타일링 라이브러리

프로젝트 의존성 파일을 기반으로 필요한 라이브러리들을 설치할 수 있습니다. 아래의 명령어로 의존성들을 설치하세요:

```bash
npm install
```

## 프로젝트 설정

### 1. **React, npm 버전**

이 프로젝트는 **React 18.3.1**을 사용, `react 19.x.x` 버전에서 발생하는 호환성 문제를 해결하기 위해 **React 18.3.1**로 다운그레이드했고, **npm 10.9.0**을 사용합니다.


### 2. **디렉토리 구조**
```
    └─src
        └─components
            ├─Auth
                ├─AuthProvider.js
                ├─Login.js
                ├─Register.js
            └─Dashboard
                └─Dashboard.js
            └─Board
                └─Board.js
                └─Pagination.js
                └─PostDetail.js
        └─...
```

## **구현 현황**
1. **회원가입, 로그인 페이지**
   - 회원가입, 로그인 UI 구현 완료 (로직은 미구현)
   - 이메일, 비밀번호, 비밀번호 확인, 이름 입력 필드 및 약관 동의 체크박스 추가
   - 회원가입 버튼 및 로그인으로 돌아가기 버튼 구현
   - MUI(Material-UI)를 사용

2. **기본 라우팅 설정**
   - React Router를 활용하여 페이지 간 이동 가능하도록 기본적인 라우팅 설정 완료 
   - / (로그인 페이지) -> /register(회원가입 페이지) -> 로그인 페이지에서 로그인 버튼 누르면 Dashboard (임시)

3. **대쉬보드 적용**
   - 강사님께서 쓰신 대쉬보드 UI를 프로젝트에 적용 (MUI(Material-UI))
   - 대쉬보드의 기본 메뉴 및 사용자 Logout시 다시 로그인 페이지로 이동

4. **Tabs 추가**
   - 대쉬보드, 작업, 타임라인, 게시판 tab 추가 
   - 각 아이템의 pathname 설정 후, DemoPageContent에 임시로 출력 
   - MUI(Material-UI)를 사용

5. **게시판 구현**
   - 게시글 상세보기, 댓글, 페이지네이션, 게시물과 댓글 추가 및 삭제
   - 더미 데이터로 테스트까지만 진행
   - API 관련 로직은 아직 구현 x
   - MUI(Material-UI)를 사용

6. **작업 페이지 진행 및 기타 수정**
   - 게시판 코드를 가져 와 작업 페이지에 맞게 수정
   - 현재 작업 목록만 볼 수 있음
   - 추가, 삭제는 오후에 구현 예정
   - 사이드바 메뉴 Link를 누르면 tab이 보이도록 수정, project를 누르면 tab 비활성화


   