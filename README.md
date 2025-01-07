# 연결고리
이 문서에서는 연결고리의 프로젝트 버전, 구현현황, 개발환경 등을 설명하고 있습니다.

# 동행

## 개발환경
|구성요소| 사용기술 및 버전|
|--|--|
|언어 및 도구|Java17, IntelliJ|
|프레임워크|Spring Boot 3.4.1|
|데이터베이스|MySQL|

## API
- swagger 라이브러리 사용하여 구현된 API 첨부되도록 구현했습니다.
- link/src/main/resources/application.properties
	- 위 파일의 db설정을 확인후 프로젝트를 실행한 후 아래의 URL을 들어가 확인할 수 있습니다.
- http://localhost:8080/swagger-ui/index.html#

## 구현현황
0. 아래 내용은 프로젝트의 상황에 맞춰 수정될 수 있습니다.
1. 프로젝트
	- 생성, 수정, 삭제, 인원 추가, 조회 구현완료
		- 조회의 경우 사용자의 아이디값으로 조회가 가능하며 본인이 속한 전체 프로젝트를 List 로 반환합니다.

2. 작업
	- 생성, 수정, 삭제, 조회
		- 조회의 경우 프로젝트 아이디 값으로 조회가 가능하며 해당 프로젝트의 모든 작업을 List 로 반환합니다.

3. 회원가입, 로그인

4. 게시판, 댓글

5. 대시보드
	- 대시보드에서 볼 수 있는 정보를 구현
		- 작업상태, 우선순위, 담당자별 작업들을 개수별로 조회할 수 있는 APi를 구현했습니다.

	
