<template>
    <div class="content-wrapper">
      <!-- <div v-if="loader" class="page_loader"></div> -->
      <!-- Content Header (Page header) -->
      <div class="content-header" style="font-size:16px;">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12 text-right">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Books</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid dashboard-card">
          <div class="card">
            <div class="card-body">
              <b-overlay :show="loader">
                <div class="row">
                  <div class="col-md-3 col-lg-3 col-sm-6 col-xs-12" v-for="(item, index) in books" :key="index">
                    <b-card
                      :title=" item.name"
                      :img-src="item.thumbnail"
                      img-alt="Image"
                      img-top
                      tag="article"
                      style="max-width: 20rem;"
                      class="mb-2"
                    >
                      <b-card-text>
                        {{ item.author }}
                      </b-card-text>
                      <b-card-text>
                        <span>Tk. {{ item.oldPrice }}</span>  <span class="text-right">Tk. {{ item.newPrice }}</span> 
                      </b-card-text>
                    </b-card>
                  </div>
                </div>
              </b-overlay>
            </div>
          </div>
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
  </div>
</template>
<script>
  import config from '@/config'

  export default {
    name:'Home',
    data() {
      return {
        loader: false,
        books: []
      }
    },
    created () {
      this.getData()
    },
    computed : {
      authUser () {
        return this.$store.state.authUser
      }
    },
    methods: {
      async getData () {
        this.loader = true
        const response = await config.getData('/books')
        this.loader = false
        if (response.success) {
            this.books = response.data  
        } else {
            this.books = []
        }    
      }
    }
  }
</script>