<template>
    <div class="card mb-3">
        <img class="card-img-top" :src="article.img" alt="Card image cap" style="max-height: 500px; object-fit: cover;" v-show="trunc">
        <img class="card-img-top" :src="article.img" alt="Card image cap" v-if="!trunc">
        <div class="card-body">
            <div class="row" style="margin-bottom: 1%;">
                <h5 class="card-title col-12"> {{ article.title }} </h5>
                <p class="card-text text-truncate col-12" v-show="trunc" style="text-align: justify;" v-html='article.body'></p>
                <p class="card-text col-12" v-if="!trunc" style="text-align: justify;" v-html='article.body'></p>
                <div class="col-2 default" v-for="(tag, index) in article.tags" keys="index" style="background-color:gray; margin: 1%; color: white;">
                    <p class="card-text"> {{tag}} </p>
                </div>
            </div>
            <button type="button" class="btn btn-danger pointer" style="float: right;" @click.prevent="deleteArticle(article._id)" v-show="login" v-if="article.userId === id"><i class="fas fa-trash"></i></button>
            <button type="button" class="btn btn-dark pointer" style="float: right; margin-right: 1%;" @click.prevent="editingArticle(article._id)" v-if="article.userId === id" v-show="login"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-dark pointer" style="float: right; margin-right: 1%;" @click.prevent="fullArticle(article._id)" v-show="trunc">Read more</button> 
            <p class="card-text" style="float: left"><small class="text-muted">Created : {{new Date(article.createdAt) | moment('from', 'now')}}</small></p>
            <button type="button" class="btn btn-dark pointer" style="float: right; margin-right: 1%;" @click.prevent="back()" v-if="!trunc"> <i class="fas fa-chevron-left"> </i>Back</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['article','login','id','trunc'],
    data: function() {
        return {
            baseUrl: 'http://35.240.235.62',
            text: ""
        }
    },
    methods: {
        deleteArticle(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        'Deleted!',
                        'Your Article has been deleted.',
                        'success'
                    )
                    axios({
                        method: "DELETE",
                        url: `${this.baseUrl}/articles/${id}`,
                        headers: {
                            "access_token" : localStorage.getItem('access_token')
                        }
                    })            
                    .then(({data}) => {
                        console.log(data)
                        Swal.fire(
                            'Deleted!',
                            'Your Article has been deleted.',
                            'success'
                        )
                        this.$emit('change-page', 'List Article')
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            title: 'Failed to delete article!',
                            text: `${err.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })
        },
        editingArticle(i) {
            this.$emit('change-page', 'Edit Article')
            this.$emit('retrieve-data', `${i}`)
        },
        fullArticle(id) {
            this.$emit('change-page', 'Article')
            this.$emit('retrieve-data', `${id}`)       
        },
        back() {
            this.$emit('change-page', 'List Article')
        }
    },
}
</script>

<style>

</style>