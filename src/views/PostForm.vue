<template>
    <div class="post-form-container">
        <h2>게시물 작성</h2>
        <form @submit.prevent="submitForm" class="post-form">
            <div class="form-group">
                <label for="title">제목:</label>
                <input type="text" id="title" v-model="post.title" required>
            </div>
            <div class="form-group">
                <label for="content">내용:</label>
                <textarea id="content" v-model="post.content" required></textarea>
            </div>
            <button type="submit" class="submit-button">작성</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: {
                title: '',
                content: '',
                created_at: '', // 추가: 현재 시간을 저장할 속성,
                created_date:'',
                author: '',
            },
        };
    },
    
    methods: {
        submitForm() {
            // 현재 시간을 설정
            this.post.created_at = new Date().toISOString();
            this.post.created_date = this.post.created_at.slice(0, 10);
            this.post.author = '익명';
            
            axios.post('http://localhost:7777/boards', this.post, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                this.$router.push('/boardlist');  
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
        },
    }
};
</script>

<style scoped>
.post-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.post-form {
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
