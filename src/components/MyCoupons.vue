<template>
    <div class="my-coupons">
      <h2>내 쿠폰 목록</h2>
      <table>
        <thead>
          <tr>
            <th>쿠폰명</th>
            <th>이용가능한 충전소</th>
            <th>사용기한</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- <td>{{ coupon.couponName }}</td>
            <td>{{ coupon.availableStations }}</td>
            <td>{{ formatExpiryDate(coupon.expiryDate) }}</td> -->
            <td>신규회원 충전 50% 할인권</td>
            <td>BBABAP 등록된 모든 충전소</td>
            <td>2024-05-18</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        coupons: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/coupons');
        this.coupons = response.data;
      } catch (error) {
        console.error('쿠폰 데이터를 가져오는 중 에러 발생:', error);
      }
    },
    methods: {
      formatExpiryDate(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
      }
    }
  }
  </script>
  
  <style scoped>
  .my-coupons {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  </style>
  