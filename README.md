# be05-3rd-project-1st-team-BBABAP

![BBABAP LOGO](https://github.com/beyond-sw-camp/be05-2nd-1team-BBABAP/assets/113917104/aa9c8201-c25c-4553-89cb-bcf0a741ce58)

# <div align="center">전기차 충전소 찾기 서비스</div>

## <div align="center">:dizzy:한화시스템 BEYOND SW캠프 3차 프로젝트:dizzy:</div>

<div align=center><h3>:books: STACKS</h3></div>

<div align=center> 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <br>
<br>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">
<img src="https://img.shields.io/badge/summernote-1A1B1F?style=for-the-badge&logo=summernote&logoColor=white">
  <br>
<br>
<img src="https://img.shields.io/badge/json--server-000000?style=for-the-badge&logo=json&logoColor=white">
<img src="https://img.shields.io/badge/Kakao%20API-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
<img src="https://img.shields.io/badge/%EA%B3%B5%EA%B3%B5%EB%8D%B0%EC%9D%B4%ED%84%B0%20API-003366?style=for-the-badge">
   <br>
<br>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
    <br>
<br>
</div>







<br>
<br>

![image](https://github.com/beyond-sw-camp/be05-2nd-1team-BBABAP/assets/155924495/499225bb-9656-4383-aea4-1a00e9ceaf5c)

## 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/chan-nni"><img src="https://avatars.githubusercontent.com/chan-nni" width="120px;" alt="강찬미"/><br /><sub><b>강찬미</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/hsw50108"><img src="https://avatars.githubusercontent.com/hsw50108" width="120px;" alt="김동욱"/><br /><sub><b>김동욱</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/nbbb9"><img src="https://avatars.githubusercontent.com/nbbb9" width="120px;" alt="이영원"/><br /><sub><b>이영원</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/eujin99"><img src="https://avatars.githubusercontent.com/eujin99" width="120px;" alt="정유진"/><br /><sub><b>정유진</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/zzimni"><img src="https://avatars.githubusercontent.com/zzimni" width="120px;" alt="하지민"/><br /><sub><b>하지민</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 역할 분담

**강찬미** :
<BR>
**김동욱** :
<BR>
**이영원** :
<BR>
**정유진** :
<BR>
**하지민** :

# 목차

### 1. [프로젝트 개요](#프로젝트-개요)

* [Backend](https://github.com/beyond-sw-camp/be05-2nd-1team-BBABAP-Backend)
* [일정](#일정)

### 2. [요구사항 정의](#요구사항-정의)

* [기능 명세서](#기능명세서)
* [요구사항 명세서](#요구사항-명세서)

### 3. [프로젝트 설명](#프로젝트-설명)

* [지도](##지도)
    * [카카오맵 API](#카카오)
    * [공공데이터_한국환경공단_전기차 충전소 위치 및 운영정보 API ](#공공데이터)


* [회원](##회원)
    * [회원가입](#Join)
    * [로그인 / 로그아웃](#Login/logout)
    * [마이페이지](#MyPage)
    * [즐겨찾기](#Favorite)


* [게시판](##회원)
    * [게시판 CRUD](#FlowChart_외부-API-CRUD)
    * [댓글](#FlowChart_전기차-충전소-DB-CRUD)

### 4. [화면테스트](화면테스트)

* [테스트 계획](##테스트)

---

# 1. 프로젝트 개요

## 개발동기

이번에 구성된 팀으로 백엔드 프로젝트만 진행하는 줄 알고 처음에는 CRUD 기능을 갖춘 간단한 SNS 서비스를 개발할 계획이었습니다. 그래서 테이블 명세서를 작성하고 ERD를
구성하고, UI까지 피그마로 구현하였습니다. 그런데 팀이 그대로 유지되어 다음 프론트엔드 프로젝트까지 함께 진행하게 된다는 공지를 받았습니다. 이에 저희는 백엔드와 프론트엔드를
결합해서 보다 다양한 기술을 활용하여 풍성한 기능을 갖춘 서비스를 개발해보고 싶다는 욕심이 생겼습니다. 외부 API를 활용하면 외부 데이터를 DB까지 연결해서 다양한 기능을 구성할
수 있고, 프론트엔드에서도 다양한 UI를 구현할 수 있을 것이라는 기대가 있었습니다. 그래서 저희는 공공데이터와 지도 API를 사용할 수 있는 프로젝트 주제를 생각해보았고,
결과적으로 전기차 충전소 위치 검색과 충전소 후기 작성&조회, 전기차 사용자들을 위한 커뮤니티 등을 포함한 전기차 사용자 전용 서비스를 구현하기로 결정했습니다.

## 개발목적

![title](https://www.poscochemical.com/upload/img/202302/202302276e_9M4Cbr0C.png)   
![title](https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202202/15/78177e54-9800-4f7c-9e3e-d1d8e0d39f9b.jpg)   
![title](https://www.gyotongn.com/news/photo/202301/340751_91139_2018.jpg)

[전기차 충전소 위치 파악에 어려움을 겪는 사용자들에 대한 기사](https://www.gyotongn.com/news/articleView.html?idxno=340751)

전기차 보급의 급속한 성장은 전기차 충전 인프라의 중요성을 더욱 부각시키고 있습니다. 현재 전기차 충전 인프라는 부족한 상황이며, 충전소의 수요가 늘어나면서 관리와 운영에 대한
요구가 더욱 증가하고 있습니다.
이에 따라 전기차 시장의 성장에 발맞추어 효율적인 충전소 관리 및 운영 시스템을 개발하는 것이 필요합니다. 이러한 시스템은 전기차 사용자들이 충전소를 편리하게 이용할 수 있도록
돕고, 충전소 운영자들은 충전소를 보다 효율적으로 관리하여 서비스 품질을 향상시킬 수 있습니다.
이는 전기차 시장의 성장을 지원하고 환경 친화적인 교통 수단으로의 전환을 촉진하는 데 도움이 될 것으로 기대됩니다.
이 프로젝트의 목적은 현재의 전기차 충전 인프라의 한계를 극복하고, 보다 효율적이고 편리한 전기차 충전소 관리 및 운영 시스템을 구축하는 것입니다. 구체적으로는 다음과 같은 목적을
가지고 개발을 진행하고 있습니다:

1. 사용자 편의성 제고
    - 전기차 운전자들이 충전소를 쉽게 찾고 이용할 수 있도록 합니다. 이를 통해 전기차 운전자들은 충전소 위치 및 상태를 빠르게 확인하고 예약할 수 있어 편리함을 느낄 수
      있습니다.
2. 게시판 기능 제공
    - 사용자들이 서로 정보를 공유하고 소통할 수 있는 게시판을 구축하여 사용자들간의 소통을 촉진합니다. 이를 통해 사용자들은 경험 공유, 충전소 추천, 문의사항 등을 자유롭게
      게시하고 공유할 수 있습니다. 또한, 게시판을 통해 운전자들의 궁금증을 해결하고 문제를 해결하는 데에도 도움을 줄 수 있습니다.
      이러한 목적을 통해 전기차 운전자들은 보다 편리하게 충전소를 이용할 수 있으며, 충전소 운영자들은 사용자들의 피드백을 적극 수용하여 서비스 품질을 높일 수 있습니다.
      이는 전기차 시장의 확대와 함께 전기차 보급의 촉진에 기여할 것으로 기대됩니다.

## 기대효과

1. 사용자 편의성 증대
    - 전기차 운전자들은 충전소 위치 및 상태를 쉽게 확인하고 예약할 수 있어 편리함을 경험할 수 있습니다. 이는 전기차 이용의 장벽을 낮추어 전기차 보급률을 높일 수
      있습니다.
2. 운영 효율성 향상
    - 충전소 운영자들은 실시간으로 충전소의 상태를 모니터링하고 관리할 수 있어 운영 효율이 향상됩니다. 이를 통해 충전소의 혼잡도를 완화하고 서비스 품질을 개선할 수
      있습니다.
3. 자원 최적 활용
    - 충전소 관리 시스템을 통해 충전소의 이용률을 최적화하고 에너지를 효율적으로 관리할 수 있습니다. 이는 전기차 시장의 지속 가능한 성장을 지원합니다.
4. 사용자 커뮤니티 구축
    - 게시판 기능을 통해 사용자들 간의 소통과 정보 교류가 활성화됩니다. 이는 전기차 운전자들의 경험 공유와 충전소 추천에 도움을 줄 뿐만 아니라, 서로의 궁금증을 해결하는
      데에도 도움이 됩니다.
5. 환경 보호 및 에너지 절감
    - 전기차의 보급은 환경 보호에 기여하며, 충전 인프라의 효율적 관리는 에너지를 절약하는 데에도 도움이 됩니다.
      이러한 기대효과를 통해 전기차 시장의 성장을 지원하고 보다 지속 가능한 교통 시스템을 구축하는 데 기여할 것으로 기대됩니다.

## 일정

<img width="492" alt="wbs" src="https://github.com/beyond-sw-camp/be05-3rd-1team-BBABAP-Frontend/assets/156767787/05da7551-f0d7-4b6f-a438-47ac301a1051">

[WBS](https://docs.google.com/spreadsheets/d/1HJ723_Ogkmu6DHP5rk5k0lYIcjl0OEtLpUuBsLs4hm0/edit#gid=717723730)

<br>

# 2. 요구사항 정의

## 기능 명세서

사진

[기능 명세서](https://docs.google.com/spreadsheets/d/1HJ723_Ogkmu6DHP5rk5k0lYIcjl0OEtLpUuBsLs4hm0/edit#gid=1800551971)

## 요구사항 명세서

사진

[요구사항 명세서](https://docs.google.com/spreadsheets/d/1HJ723_Ogkmu6DHP5rk5k0lYIcjl0OEtLpUuBsLs4hm0/edit#gid=740647757)

## 테스트 계획

사진

[테스트 계획](https://docs.google.com/spreadsheets/d/1HJ723_Ogkmu6DHP5rk5k0lYIcjl0OEtLpUuBsLs4hm0/edit#gid=715609994)

# 3. 프로젝트 설명

## 회원, 게시판, 댓글 CRUD

## TestCase

<br>

# 4. 화면테스트
