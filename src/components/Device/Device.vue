<template>
  <v-container grid-list-md fluid>
    <v-data-table
      :headers="headers"
      :items="device.sockets"
      class="elevation-3"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.index }}</td>
        <td class="text-xs-right">{{ props.item.value }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.location }}</td>
        <td class="text-xs-right">
          <v-switch v-if="props.item.type === 'relay'"
            color="success"
            v-model="props.item.value"
            :false-value="0"
            :true-value="1"
            @change="onSubmit(props.index, props.item.value)"
            hide-details
          ></v-switch>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  props: ['deviceid'],
  data () {
    return {
      device: {},
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: false },
        { text: 'Value', value: 'value', align: 'left', sortable: false },
        { text: 'Type', value: 'type', align: 'left', sortable: false },
        { text: 'Location', value: 'location', align: 'left', sortable: false },
        { text: 'Actions', value: 'value', sortable: false }
      ],
      items: [
        { icon: 'memory', text: 'Devices' }
      ]
    }
  },
  created () {
    this.loadDevice()

    setInterval(() => {
      this.loadDevice()
    }, 100)
  },
  methods: {
    loadDevice () {
      // axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
      this.$http.get(`/api/v1/device/${this.deviceid}`)
        .then((resp) => {
          this.device = resp.data
        })
        .catch((e) => {
          this.errors.push(e)
        })
    },
    onSubmit (id, status) {
      this.$http.post(`/api/v1/device/${this.deviceid}/socket`, {
        'id': id,
        'status': status
      })
        .then(/* resp => alert(`Success ${resp.data}`) */)
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
}
</script>
