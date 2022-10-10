<template>
  <form @submit.stop.prevent="onSubmit">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">County</label>
        <input type="text" class="form-control" v-model="Property.county" placeholder="County">
        <span v-if="v$.Property.county.$error">
          <div class="error">{{ v$.Property.county.$errors[0].$message }}</div>
        </span>
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Country</label>
        <input type="text" class="form-control" v-model="Property.country" placeholder="Country">
        <span v-if="v$.Property.country.$error">
          <div class="error">{{ v$.Property.country.$errors[0].$message }}</div>
        </span>
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">Description</label>
      <textarea type="text" class="form-control" v-model="Property.description" placeholder="description"></textarea>
      <span v-if="v$.Property.description.$error">
          <div class="error">{{ v$.Property.description.$errors[0].$message }}</div>
        </span>
    </div>
    <div class="form-group">
      <label for="inputEmail4">Address</label>
      <textarea class="form-control" v-model="Property.address" placeholder="Address"></textarea>
      <span v-if="v$.Property.address.$error">
          <div class="error">{{ v$.Property.address.$errors[0].$message }}</div>
        </span>
    </div>

    <div class="form-group col-md-6">
      <label for="inputAddress2">Town</label>
      <input type="text" class="form-control" v-model="Property.town" placeholder="Apartment, studio, or floor">
      <span v-if="v$.Property.town.$error">
          <div class="error">{{ v$.Property.town.$errors[0].$message }}</div>
        </span>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Type</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="Property.type" value="Rent" v-bind:value="Property.type">
          <label class="form-check-label" for="exampleRadios1">
           Rent
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="Property.type" value="Sale" v-bind:value="Property.type">
          <label class="form-check-label" for="exampleRadios2">
            Sale
          </label>
        </div>
        <span v-if="v$.Property.type.$error">
          <div class="error">{{ v$.Property.type.$errors[0].$message }}</div>
        </span>
      </div>
      <div class="form-group col-md-6">
        <label for="inputState">Property Type</label>
        <select id="inputState" v-model="Property.property_type_id" class="form-control">
          <option value="" disabled>Choose...</option>
          <option v-for="property in PropertyList" :key="property.id" v-bind:value="property.id">{{ property.title }}
          </option>
        </select>
        <span v-if="v$.Property.property_type_id.$error">
          <div class="error">{{ v$.Property.property_type_id.$errors[0].$message }}</div>
        </span>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">Longitude</label>
        <input type="number" class="form-control" v-model="Property.longitude" placeholder="Longitude">
        <span v-if="v$.Property.longitude.$error">
          <div class="error">{{ v$.Property.longitude.$errors[0].$message }}</div>
        </span>
      </div>

      <div class="form-group col-md-2">
        <label for="inputZip">Latitude</label>
        <input type="number" class="form-control" v-model="Property.latitude" placeholder="Latitude">
        <span v-if="v$.Property.latitude.$error">
          <div class="error">{{ v$.Property.latitude.$errors[0].$message }}</div>
        </span>
      </div>

      <div class="form-group col-md-2">
        <label for="inputZip">Price</label>
        <input type="number" class="form-control" v-model="Property.price" placeholder="Price">
        <span v-if="v$.Property.price.$error">
          <div class="error">{{ v$.Property.price.$errors[0].$message }}</div>
        </span>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">Number of Bathrooms</label>
        <input type="number" class="form-control" v-model="Property.num_bathrooms" placeholder="Num Bathrooms">
        <span v-if="v$.Property.num_bathrooms.$error">
          <div class="error">{{ v$.Property.num_bathrooms.$errors[0].$message }}</div>
        </span>
      </div>

      <div class="form-group col-md-2">
        <label for="inputZip">Number of Bedrooms</label>
        <input type="number" class="form-control" v-model="Property.num_bedrooms" placeholder="Num Bedrooms">
        <span v-if="v$.Property.price.$error">
          <div class="error">{{ v$.Property.num_bedrooms.$errors[0].$message }}</div>
        </span>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">File</label>
        <div class="custom-file">
          <input type="file" name="file_upload" class="custom-file-input" @change="handleFileUpload( $event )">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
      </div>

    </div>

    <button type="submit" class="btn btn-success" @click="submit">Submit</button>
  </form>
</template>

<script>
import DataService from "@/services/DataService";
import useVuelidate from "@vuelidate/core";
import {required, email, minLength, numeric, minValue} from '@vuelidate/validators';
import swal from 'sweetalert';
import router from "@/router";


export default {
  name: "",
  data() {
    return {
      v$: useVuelidate(),
      "file": null,
      Property: {
        'uuid': null,
        'property_type_id': null,
        'county': null,
        'country': null,
        'town': null,
        'description': null,
        'address': null,
        'image_full': null,
        'image_thumbnail': null,
        'latitude': null,
        'longitude': null,
        'num_bedrooms': null,
        'num_bathrooms': null,
        'price': null,
        'type': null
      },
      PropertyList: null,
    };
  },
  validations() {
    return {
      Property: {
        address: {required, minLength: minLength(10), $autoDirty: true}, // Matches this.firstName
        price: {required, numeric, $autoDirty: true},
        num_bedrooms: {required, numeric, $autoDirty: true},
        num_bathrooms: {required, numeric, $autoDirty: true},
        longitude: {required, $autoDirty: true},
        latitude: {required, $autoDirty: true},
        town: {required, $autoDirty: true},
        country: {required, $autoDirty: true},
        county: {required, $autoDirty: true},
        property_type_id: {required, $autoDirty: true},
        type: {required, $autoDirty: true},
        description: {required, $autoDirty: true},
      }
    }
  },
  methods: {
    getData() {
      if (this.$route.params.id != null) {
        DataService.get(this.$route.params.id).then(
            response => {
              console.log(response.data)
              this.Property = response.data
            }
        ).catch(e => {
          console.log(e)
        })
      }
    },
    getProperties() {
      DataService.propertyType().then(
          response => {
            console.log(response.data)
            this.PropertyList = response.data
          }
      ).catch(e => {
        console.log(e)
      })
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submit() {
      await this.v$.$validate()
      console.log(this.Property.image_full)
      console.log(this.Property)
      if (!this.v$.$error) {
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('data', JSON.stringify(this.Property));
        if (this.Property.uuid != null) {
          DataService.update(this.Property.uuid, formData).then(
              response => {
                console.log(response.data);
                this.getData();
                swal("Successfully Saved", "", "success")
              }
          ).catch(e => {
            swal(e.response.data.message, "", "error")
            console.log(e.response.data)
          })
        } else {
          delete this.Property.uuid
          DataService.create(formData).then(
              response => {
                console.log(response.data);
                swal("Successfully Created", "", "success")
                router.push({path: '/list', replace: true})
              }
          ).catch(e => {
            swal(e.response.data.message, "", "error")
            console.log(e.response.data)
          })
        }

      } else {
        swal("Validation is Required", "", "error")
      }
    }
  }
  ,
  mounted() {
    this.getProperties();
    this.getData();
  }


}
</script>

<style>
.error {
  color: red;
}
</style>