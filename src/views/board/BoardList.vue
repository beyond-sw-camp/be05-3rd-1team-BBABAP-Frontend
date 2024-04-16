<script>
export default {
  data() {
    return {
      requestBody: {},
      list: [],
      no: '',
      paging: {
        block: 0,
        end_page: 0,
        next_block: 0,
        page: 0,
        page_size: 0,
        prev_block: 0,
        start_index: 0,
        start_page: 0,
        total_block_cnt: 0,
        total_list_cnt: 0,
        total_page_cnt: 0,
      },
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1, // parseInt 추가하여 문자열을 숫자로 변환
      size: this.$route.query.size ? parseInt(this.$route.query.size) : 10,
      keyword: this.$route.query.keyword,
    }
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      // 데이터를 직접 import하여 가져오기
      this.list = require('../../../fake-server/db.json').boards;

      // 페이징 및 기타 관련 로직은 여기서 직접 구현하거나 적용해야 합니다.
    },
    fnView(idx) {
      this.$router.push({
        path: './detail',
        query: { ...this.requestBody, idx: idx } // 쿼리스트링에 idx 추가
      });
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      });
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n;
        this.fnGetList();
      }
    }
  }
}
</script>