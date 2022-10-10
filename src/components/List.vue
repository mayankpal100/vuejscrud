<template>

  <div class="container">
    <div class="row">
      <div class="col-md-10"></div>
      <div class="col-md-2">
        <RouterLink to="/create">
          <button class="btn btn-success">Create New</button>
        </RouterLink>
      </div>
      <div class="form-group col-md-6">
        <input type="text" placeholder="Search by Description or UUID" class="form-control" v-model="title" required="required">
      </div>
      <div class="col-md-6">
        <button type="button" @click="search" class="btn btn-success">Search</button>
        <button type="button" @click="retrieveProperties" class="btn btn-warning">Reset</button>
     </div>

    </div>
    <div class="row">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Country</th>
          <th scope="col">Description</th>
          <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(property,key) in properties" :key="key">
          <th scope="row">{{ property.uuid }}</th>
          <td>{{ property.country }}</td>
          <td>{{ property.description }}</td>
          <div class="form-group">
            <router-link :to='"/edit/"+ property.uuid'>
              <button class="btn btn-outline-success">Edit</button>
            </router-link>
            <button class="btn btn-outline-danger" @click="remove(property.uuid)">Delete</button>
          </div>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  data() {
    return {
      properties: null,
      title: null,
    };
  },
  methods: {
    search() {
      if (this.title != null) {
        DataService.search(this.title).then(
            response => {
              this.properties = response.data
            }
        ).then(e => {
              console.log(e)
            }
        )
      } else {
        alert("Search is required")
      }

    },
    retrieveProperties() {
      DataService.getAll().then(
          response => {
            this.properties = response.data
            console.log(response.data)
          })
    },
    remove(key) {
      console.log(key);
      DataService.delete(key).then(
          response => {
            console.log(response.data);
            swal("Property Successfully Removed", "","success")
            this.retrieveProperties()
          }
      )
    }
  },
  mounted() {
    this.retrieveProperties();
  }
}
</script>

<style>

</style>

