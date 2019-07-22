<template>
    <div>
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style="color:white;">
            <!-- Links -->
            <ul class="navbar-nav justify-content-start" style="margin-left: 6%;">
                <li class="nav-item">
                    <a class="nav-link pointer" @click.prevent="changePage('List Article')" id="home">Mini-WP</a>
                </li>
            </ul>
            <ul class="navbar navbar-expand-sm bg-dark navbar-dark ml-auto" style="color:white; margin-right: 6%; margin-top: 1%; height: 15px">
                <li class="nav-item pointer ml-auto" style="color: #343A40;">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search by title" v-model="search">
                        <button class="btn btn-link pointer" type="submit" style="color: white;"><i class="fas fa-search"></i></button>
                        <a class="nav-link pointer" style="color:#909394" v-show="isLogin" @click.prevent="signOut">SIGNOUT</a>
                        <a class="btn btn-link pointer" data-toggle="modal" data-target="#signinModal" style="color: white;" v-show="!isLogin"><i class="fas fa-user"></i></a>
                    </form>
                </li>
            </ul>
        </nav>
    
        <!-- SIGNIN MODALS -->
        <div class="modal fade" id="signinModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title" style="margin-left: 1%">SignIn</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <form @submit.prevent="signIn">
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" v-model="user.emailSignin">
                            </div>
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" v-model="user.passwordSignin">
                                <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%;">SignIn</button>
                            </div>
                        </form>
                        <div>
                            <gsignin style="margin-left:1%;"></gsignin>
                            <a data-toggle="modal" data-target="#signupModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignUp</a>
                            <a class="default" style="float: right; margin-right: 1%;">Don't have any account?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- SIGNUP MODALS -->
        <div class="modal fade" id="signupModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title" style="margin-left: 1%">SignUp</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <form @submit.prevent="signUp">
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="name">Name:</label>
                                <input type="name" class="form-control" v-model="newUser.nameSignup">
                            </div>
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" v-model="newUser.emailSignup">
                            </div>
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" v-model="newUser.passwordSignup">
                                <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%;">SignUp</button>
                            </div>
                        </form>
                        <div>
                            <a data-toggle="modal" data-target="#signinModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignIn</a><a class="default" style="float: right; margin-right: 1%;">Have any account?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- MAIN -->
        <div class="container-float" style="background-image: url(https://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/black-and-white-wallpaper-5.jpg); background-size: 100%; background-repeat: no-repeat; height: 500px;">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4 card text-dark" style="margin-top: 7%; background-color: rgba(255, 255, 255, 0.9); text-align: center;">
                    <div class="card-body"><h1>Mini-WP</h1></div>
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10 card text-dark" style="margin-top: 7%; background-color: rgba(255, 255, 255, 1); text-align: center; height: auto; margin-bottom: 10%;">
                    <div class="card-body margin-bottom:30%;">
                        <div class="row">
                            <div class="col-3"></div>
                            <!-- SIDEBAR -->
                            <div class="sidebar col-3" style="height: 45px;" v-if="pageDirection === 'List Article' || pageDirection === 'Add Article' || pageDirection === 'Edit Article' || pageDirection === 'Gallery List' || pageDirection === 'Article'">
                                <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('Add Article')" v-show="isLogin">Add Article</button>
                                <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('List Article')">Article List</button>
                                <button type="button" class="btn btn-dark" style="margin-top: 5%; margin-left: -25%; width: 80%;" @click.prevent="changePage('Gallery List')">Gallery List</button>
                            </div>
                            <!-- ADD ARTICLE -->
                            <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Add Article'" v-show="isLogin">
                                <headers :title="pageDirection" @title-changed="test = $event"></headers>
                                <form @submit.prevent="addArticle">
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="img">Image:</label>
                                        <div class="custom-file col-10">
                                            <input type="file" class="custom-file-input" v-on:change="getDataImage($event, 'add')" >
                                            <label class="custom-file-label" for="customFile" style="text-align: left;">{{ newArticle.img.name }}</label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="title">Title:</label>
                                        <input type="text" class="col-10 form-control" v-model="newArticle.title">
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="title">Tag(s):</label>
                                        <input type="text" class="col-10 form-control" v-model="newArticle.tags">
                                    </div>
                                    <div class="chips chips-placeholder"></div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="content">Body:</label>
                                        <wysiwyg class="col-10" style="text-align:left;" name="content" v-model="newArticle.body"></wysiwyg>
                                        <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Add Article</button>
                                    </div>
                                </form>
                            </div>
                            <!-- EDIT ARTICLE -->
                            <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Edit Article'">
                                <headers :title="pageDirection" @title-changed="test = $event"></headers>
                                <form @submit.prevent="submitEdit">
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="img">Image:</label>
                                        <div class="custom-file col-10">
                                            <input type="file" class="custom-file-input" v-on:change="getDataImage($event, 'update')">
                                            <label class="custom-file-label" for="customFile" style="text-align: left;" v-show="!editArticle.img.name">{{ editArticle.img }}</label>
                                            <label class="custom-file-label" for="customFile" style="text-align: left;" v-show="editArticle.img.name">{{ editArticle.img.name }}</label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="title">Title:</label>
                                        <input type="text" class="col-10 form-control" v-model="editArticle.title">
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="tag">Tag(s):</label>
                                        <input type="text" class="col-10 form-control" v-model="editArticle.tags">
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-2" style="margin-top: 1%" for="content">Body:</label>
                                        <wysiwyg class="col-10" style="text-align:left;" name="content" v-model="editArticle.body"></wysiwyg>
                                        <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Edit Article</button>
                                        <button class="btn btn-danger" type="cancel" style="margin-top: 1%; margin-left: 6%; width: 100%;" @click.prevent="changePage('List Article')">Cancel</button>
                                    </div>
                                </form>
                            </div>
                            <!-- ARTICLE -->
                            <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'List Article'"> 
                                <p style="text-align:left">List of Tag :</p>                          
                                <listtag style="max-height: 50px; overflow: auto;" :tags="tags" @tag-clicked="filteredByTag"></listtag><hr>
                                <headers :title="pageDirection" @title-changed="test = $event"></headers>
                                <card :login="isLogin" :trunc="truncate" :id="userId" v-show="!tagClicked" v-for="(article, index) in filteredArticle" keys="article._id" :article="article" @change-page="changePage" @retrieveArticle="retrieveArticle" @retrieve-data="editingArticle(article._id) || fullArticle(article._id)"></card>
                                <card :login="isLogin" :trunc="truncate" :id="userId" v-show="tagClicked" v-for="(article, index) in articleByTag" keys="article._id" :article="article" @change-page="changePage" @retrieveArticle="retrieveArticle" @retrieve-data="editingArticle(article._id) || fullArticle(article._id)"></card>
                                <!-- PAGINATION / BACK TOP-->
                                <ul v-if="articles.length > 1" class="pagination pagination-sm" style="float: right; margin-right: 4%;">
                                    <li class="page-item"><a class="page-link" href="/" style="background-color: #343A40;; color: white;">Back to top   <i class="fas fa-chevron-up"></i></a></li>
                                </ul>
                            </div>
                            <!-- SOLO ARTICLE -->
                            <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Article'">
                                <card :id="userId" :article="dataArticle" @change-page="changePage"></card>
                            </div>
                            <!-- GALLERY -->
                            <div class="col-9 collapse show" style="color: #343A40;" v-if="pageDirection === 'Gallery List'">
                                <headers :title="pageDirection" @title-changed="test = $event"></headers>
                                <div class="row col-12">
                                    <div class="col-6" v-for="(data, index) in filteredArticle">
                                        <div class="card border-light text-white">
                                            <img class="card-img" :src="data.img" alt="gallery image" style="max-height: 150px; object-fit: cover;">
                                            <div class="card-img-overlay">
                                                <h5 class="card-title pointer" style="text-align: center; margin-top: 31.2%; background-color: rgba(52,58,64, 0.4); border: 0px;">{{ data.title }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <div class="footer-copyright text-center py-3">© 2019 Copyright: 
                <a> Elia Victor</a>
            </div>            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import card from './components/card'
import headers from './components/headers'
import listtag from './components/listTag'
import gsignin from './components/googlesignin'
import wysiwyg from "vue-wysiwyg/dist/vueWysiwyg.css"
export default {
    data: {
        baseUrl: 'http://35.240.235.62:3000',
        truncate: true,
        isLogin: false,
        userId: "",
        pageDirection: "List Article",
        search: "",
        tagClicked: false,
        newUser: {
            nameSignup: '',
            emailSignup: '',
            passwordSignup: '',
        },
        user: {
            nameSignin: '',
            emailSignin: '',
            passwordSignin: '',
        },
        dataArticle: {
            img: '',
            title: '',
            tags: '',
            body: '',
            createdAt: ''
        },
        articleByTag: [],
        articles: [],
        tags: [],
        newArticle: {
            img: '',
            title: '',
            tags: '',
            body: '',
            createdAt: ''
        },
        editArticle: {
            id: '',
            img: '',
            title: '',
            tags: '',
            body: '',
            createdAt: ''
        }
    },
    components: {
        card,
        headers,
        listtag,
        gsignin
    },
    created: function() {
        this.checkLogin()
        this.retrieveArticle()
        this.userId = localStorage.getItem('userId')
    },
    methods: {
        retrieveArticle() {
            axios({
                method: "GET",
                url: `${this.baseUrl}/articles`,
                headers: {
                    "access_token" : localStorage.getItem('access_token')
                }
            })     
            .then(response => {
                this.articles = response.data
                this.tags = []
                this.retrieveTags()
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        signUp() {
            let obj = {
                name: this.newUser.nameSignup,
                email: this.newUser.emailSignup,
                password: this.newUser.passwordSignup
            }
            axios({
                method: "POST",
                url: `${this.baseUrl}/users/signup`,
                data: obj,
            })   
            .then(({data}) => {
                console.log(data)
                $('#signupModal').modal('hide'); $('.modal-backdrop').remove();
                Swal.fire({
                    title: `Success signup with email ${obj.email}!`,
                    type: 'success'
                })   
            })
            .catch(err => {
                // err.request
                console.log(err)
                Swal.fire({
                    title: 'Failed to signup!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }) 
        },
        signIn() {
            // console.log(this.user.emailSignin, this.user.passwordSignin, 'dari textbox')
            let obj = {
                email: this.user.emailSignin,
                password: this.user.passwordSignin
            }
            axios({
                method: "POST",
                url: `${this.baseUrl}/users/signin`,
                data: obj
            })      
            .then(({data}) => {
                $('#signinModal').modal('hide'); $('.modal-backdrop').remove();
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('name', data.name)
                localStorage.setItem('userId', data.userId)
                this.isLogin = true
                // console.log(this.user.nameSignin)
                    Swal.fire({
                        title: `Welcome back ${localStorage.getItem('name')}!`,
                        type: 'success'
                    })
                this.user.nameSignin = localStorage.getItem('name')
                this.user.emailSignin = ""
                this.user.passwordSignin = ""   
                this.userId = localStorage.getItem('userId')
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to signin!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }) 
        },
        signOut() {
            Swal.fire({
                title: 'Are you sure?',
                text: "We will miss you!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, signout!'
            })
            .then((result) => {
                if (result.value) {
                    this.googleSignout()
                    localStorage.clear()
                    this.isLogin = false
                }
            })
        },
        getDataImage(event, src) {
            if (src === 'add') {
                this.newArticle.img = event.target.files[0]
            } 
            if (src === 'update') {
                if (this.newArticle.img.name) {
                    this.editArticle.img = event.target.files[0]
                } else {
                    this.editArticle.img = this.editArticle.img
                }
            }
        },
        addArticle() {
            this.newArticle.tags = this.newArticle.tags.split(',')
            let tags = [...new Set(this.newArticle.tags)]

            let formData = new FormData()
            formData.append('file', this.newArticle.img)
            formData.append('title', this.newArticle.title)
            formData.append('tags', tags)
            formData.append('body', this.newArticle.body)

            axios({
                method: "POST",
                url: `${this.baseUrl}/articles`,
                data: formData,
                headers: {
                    'access_token' : localStorage.getItem('access_token')
                }
            })            
            .then(({data}) => {
                console.log(data)
                this.newArticle.img = ""
                this.newArticle.title = ""
                this.newArticle.body = ""  
                this.newArticle.tags = ""  
                Swal.fire({
                    title: 'Success create new article!',
                    type: 'success'
                }) 
                this.changePage('List Article')
                this.retrieveArticle()
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to create new article!',
                    text: `${err.message}`,
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        },
        submitEdit() {
            this.editArticle.tags = this.editArticle.tags.split(',')
            let tags = [...new Set(this.editArticle.tags)]

            if (this.editArticle.img.name) {
                let formData = new FormData()
                formData.append('file', this.editArticle.img)
                formData.append('title', this.editArticle.title)
                formData.append('tags', tags)
                formData.append('body', this.editArticle.body)

                Swal.fire({
                    title: 'Are you sure edit article?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#343A40',
                    cancelButtonColor: '#C82333',
                    confirmButtonText: 'Yes, edit it!'
                })
                .then((result) => {
                    if (result.value) {
                        this.changePage('List Article')
                        axios({
                            method: "PATCH",
                            url: `${this.baseUrl}/articles/updateImage/${this.editArticle.id}`,
                            data: formData,
                            headers: {
                                "access_token" : localStorage.getItem('access_token')
                            }
                        })            
                        .then(({data}) => {
                            console.log(data)
                            Swal.fire({
                                title: 'Success edit article!',
                                type: 'success'
                            })   
                            this.changePage('List Article')
                            this.retrieveArticle()
                        })
                        .catch(err => {
                            console.log(err, err.message)
                            Swal.fire({
                                title: 'Failed to edit article!',
                                text: `${err.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                let obj = {
                    img : this.editArticle.img,
                    title: this.editArticle.title,
                    tags: tags,
                    body: this.editArticle.body
                }

                Swal.fire({
                    title: 'Are you sure edit article?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#343A40',
                    cancelButtonColor: '#C82333',
                    confirmButtonText: 'Yes, edit it!'
                })
                .then((result) => {
                    if (result.value) {
                        this.changePage('List Article')
                        axios({
                            method: "PATCH",
                            url: `${this.baseUrl}/articles/update/${this.editArticle.id}`,
                            data: obj,
                            headers: {
                                "access_token" : localStorage.getItem('access_token')
                            }
                        })            
                        .then(({data}) => {
                            console.log(data)
                            Swal.fire({
                                title: 'Success edit article!',
                                type: 'success'
                            })   
                            this.changePage('List Article')
                            this.retrieveArticle()
                        })
                        .catch(err => {
                            console.log(err, err.message)
                            Swal.fire({
                                title: 'Failed to edit article!',
                                text: `${err.message}`,
                                type: 'error',
                                confirmButtonText: 'Ok'
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        editingArticle(i) {
            axios({
                method: "GET",
                url: `${this.baseUrl}/articles/${i}`,
                headers: {
                    "access_token" : localStorage.getItem('access_token')
                }
            })     
            .then(response => {
                this.editArticle.id = response.data._id
                this.editArticle.img = response.data.img
                this.editArticle.title = response.data.title
                this.editArticle.tags = response.data.tags.join(',')
                this.editArticle.body = response.data.body
                this.editArticle.createdAt = response.data.createdAt
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        changePage(where){
            this.pageDirection = where
        },
        checkLogin() {
            if (localStorage.getItem('access_token')) {
                this.isLogin = true
            }
        },
        fullArticle(i) {
            axios({
                method: "GET",
                url: `${this.baseUrl}/articles/${i}`,
                headers: {
                    "access_token" : localStorage.getItem('access_token')
                }
            })     
            .then(response => {
                this.dataArticle.img = response.data.img
                this.dataArticle.title = response.data.title
                this.dataArticle.tags = response.data.tags
                this.dataArticle.body = response.data.body
                this.dataArticle.createdAt = response.data.createdAt
            })
            .catch(err => {
                console.log(err)
            }) 
        },
        retrieveTags() {
            for (let i = 0; i < this.articles.length; i++) {
                for (let j = 0; j < this.articles[i].tags.length; j++) {
                    this.tags.push(this.articles[i].tags[j])
                }
            }
            this.tags.sort()
            this.tags = [...new Set(this.tags)]
        },
        filteredByTag(index) {
            this.tagClicked = true
            let filter = this.articles.filter(art => {
                return art.tags.includes(this.tags[index])
            })
  
            if (filter.length === 0) this.articleByTag = this.articles
            else return this.articleByTag = filter
        },
        googleSignout() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        }
    },
    computed: {
        filteredArticle() {
            let filter = this.articles.filter(artcl => {
                return artcl.title.toLowerCase().includes(this.search.toLowerCase())
            })
            if (filter.length === 0) return this.articles
            else return filter
        }
    }
}
</script>

<style scoped>
</style>
