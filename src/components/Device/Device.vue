<template>
  <v-container grid-list-md fluid>
    <v-data-table
      :headers="headers"
      :items="deviceInfo.sockets"
      class="elevation-3"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.index }}</td>
        <td class="text-xs-right">{{ deviceSockets.sockets[props.index] }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">
          <v-switch v-if="props.item.type === 'relay'"
            color="success"
            v-model="deviceSockets.sockets[props.index]"
            @change="onSubmit(props.index, deviceSockets.sockets[props.index])"
            hide-details
          ></v-switch>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Device',
  props: ['deviceName'],
  data () {
    return {
      deviceInfo: {},
      deviceSockets: {},
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: false },
        { text: 'Value', value: 'value', align: 'left', sortable: false },
        { text: 'Type', value: 'type', align: 'left', sortable: false },
        { text: 'Description', value: 'description', align: 'left', sortable: false },
        { text: 'Actions', value: 'value', sortable: false }
      ],
      items: [
        { icon: 'memory', text: 'Devices' }
      ],
      errors: []
    }
  },
  created () {
    this.fetchDevice()
    this.fetchSockets()
    setInterval(() => {
      this.fetchDevice() // TODO: replace `created` event to handle router views switch
      this.fetchSockets()
    }, 100)
  },
  methods: {
    fetchDevice () {
      this.axios.get(`/api/v1/device/${this.deviceName}`)
        .then(resp => {
          this.deviceInfo = resp.data
        })
        .catch(err => {
          this.errors.push(err)
          console.log(err)
        })
    },
    fetchSockets () {
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      this.axios.get(`/api/v1/device/${this.deviceName}/socket`)
        .then((resp) => {
          this.deviceSockets = resp.data
        })
        .catch((err) => {
          // this.errors.push(err)
          console.log(err)
        })
    },
    onSubmit (socketId, status) {
      this.axios.post(`/api/v1/device/${this.deviceName}/socket`, {
        'id': socketId,
        'status': status
      })
        .then(/* resp => alert(`Success ${resp.data}`) */)
        .catch((err) => {
          // this.errors.push(err)
          console.log(err)
        })
    }
  }
}
</script>
