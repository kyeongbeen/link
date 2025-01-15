# 연결고리

# Github Repo
- link_back, link_front 디렉토리에 각각 백엔드, 프론트엔드에서 구현한 내용이 존재
- 기존 link_front, link_front로 나누어 진행하던 프로젝트 Repo를 합쳐 하나의 Repo로 관리
    - Repo merge 과정
        1. 새로운 Repo 생성
        2. 적당한 로컬 디렉토리를 생성
            - 여기서부터는 git bash, powershell 등 명령어를 입력해서 진행
            - readmd 파일생성 X
            ```
            $ git clone [새로 만든 repo의 주소]
            ```
        3. clone한 repo에 commit 기록 남기기
            - 혹시 모를 에러발생 방지를 위함
            - readme 파일생성 후 적당한 내용추가
            ```
            $ git add.
            $ git commit -m "add readme"
            ```
        4. 기존repo를 새로 생성한 repo에 합치기
            - 기존repo의 메인브랜치의 이름을 확인
            - 합치고 싶은 repo가 여러개이면 아래 명령어를 합치고 싶은 repo만큼 수행행
            ```
            $ git subtree add --prefix=[기존repo의 이름] [기존repo 주소] [기존repo의 메인브랜치명]
            ```
        5. 새로만든 repo에 push
            ```
            $ git push
            ```
# 빌드관련 구조 변경
- 원래는 Frontend의 React를 빌드하여 Spring Boot에 내장하여 구동하는 방식
- jwt 로그인 관련 부분이 늦게 구현된 관계로 React, Spring Boot를 따로 구동하는 방식으로 변경
- Frontend 구현내용 구동
    ```
    디렉토리 위치 : ../link_front/link
    npm install (첫번째 구동시에만)
    npm start
    기본 URL : http://localhost:3000/
    ```
- Backend 구현내용 구동
    ```
    준비사항 : MySQL, Java 17
    Intellij : LinkApplication의 main 클래스 구동
    Swagger : http://localhost:8080/swagger-ui/index.html#
    ```

    