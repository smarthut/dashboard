<template>
  <v-container grid-list-md fluid>
    <v-toolbar flat color="white" class="elevation-1">
      <!-- <v-toolbar-title>Devices</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Device</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form>
                <v-text-field v-model="editedDevice.name" label="Name"></v-text-field>
                <v-text-field v-model="editedDevice.host" label="Host"></v-text-field>
                <v-text-field v-model="editedDevice.title" label="Title"></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="primary" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="deviceList"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.host }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.sockets.length }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editDevice(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteDevice(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Devices',
  data () {
    return {
      deviceList: {},
      dialog: false,
      editedIndex: -1,
      editedDevice: { name: '', host: '', title: '' },
      defaultDevice: { name: '', host: '', title: '' },
      headers: [
        { text: 'Name', value: 'name', align: 'right', sortable: false },
        { text: 'Host', value: 'host', align: 'right', sortable: false },
        { text: 'Title', value: 'title', align: 'right', sortable: false },
        { text: 'Sockets', value: 'sockets', align: 'right', sortable: false },
        { text: 'Actions', value: 'actions', align: 'right', sortable: false }
      ],
      errors: []
    }
  },
  created () {
    this.fetchDeviceList()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Device' : 'Edit Device'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    fetchDeviceList () {
      this.axios.get(`/api/v1/device`)
        .then(resp => {
          this.deviceList = resp.data
          console.log(this.deviceList)
        })
        .catch(err => {
          this.errors.push(err)
        })
    },
    editDevice (item) {
      this.editedIndex = this.deviceList.indexOf(item)
      this.editedDevice = Object.assign({}, item)
      this.dialog = true
    },
    deleteDevice (item) {
      const index = this.desserts.deviceList(item)
      confirm('Are you sure you want to delete this item?') && this.deviceList.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
