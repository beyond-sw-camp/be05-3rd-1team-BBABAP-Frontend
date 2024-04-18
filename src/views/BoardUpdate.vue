<template>
    <div class="update-form-container">
        <h2>게시물 수정</h2>
        <form @submit.prevent="submitForm" class="update-form">
            <div class="form-group">
                <label for="title">제목</label>
                <input type="text" id="title" v-model="updatedPost.title" required>
            </div>
            <div class="form-group">
                <label for="content">내용</label>
                <textarea id="summernote" required></textarea>
            </div>
            <button type="submit" class="submit-button">수정 완료</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import $ from 'jquery';
import 'bootstrap';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite';

export default {
    data() {
        return {
            updatedPost: {
                title: '',
                content: ''
            }
        };
    },
    created() {
        this.fetchPost();
    },
    computed: {
        ...mapGetters(['userNickname'])
    },
    mounted() {
        // Summernote 초기화
        $('#summernote').summernote({
            height: 300, // 높이 설정 (원하는 대로 조절 가능)
            callbacks: {
                onChange: (contents) => {
                    // 내용이 변경될 때마다 데이터에 저장
                    this.updatedPost.content = contents;
                }
            }
        });
    },
    methods: {
        fetchPost() {
            const boardId = this.$route.params.id;
            axios.get(`http://localhost:7777/boards/${boardId}`)
                .then(response => {
                    this.updatedPost.title = response.data.title;
                    this.updatedPost.content = response.data.content;
                    // 썸머노트 에디터에 게시물 내용 설정
                    $('#summernote').summernote('code', response.data.content);
                })
                .catch(error => {
                    console.error('Error fetching post:', error);
                });
        },
        submitForm() {
            const boardId = this.$route.params.id;
            axios.put(`http://localhost:7777/boards/${boardId}`, this.updatedPost)
                .then(() => {
                    this.$router.push(`/board/${boardId}`); // 수정된 게시물로 이동
                })
                .catch(error => {
                    console.error('Error updating post:', error);
                });
        }
    }
};
</script>

<style scoped>
.update-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.update-form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button.submit-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button.submit-button:hover {
    background-color: #0056b3;
}
</style>