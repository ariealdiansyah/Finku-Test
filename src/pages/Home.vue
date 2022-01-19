<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Inline Actions
        <q-btn
          label="Logout"
          class="float-right text-capitalize text-indigo-8 shadow-3"
          icon="person"
          @click="logout"
        />
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :rows="data" :columns="columns">
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense />
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';

const columns = [
  { name: 'Email', label: 'Email', field: 'email', sortable: true, align: 'left' },
  {
    name: 'Active',
    label: 'Active User',
    field: 'active',
    sortable: true,
    align: 'center',
    format: (val) => (val === true ? 'YA' : 'TIDAK'),
  },
  {
    name: 'Mobile Number',
    label: 'Mobile Number',
    field: 'mobileNumber',
    sortable: true,
    align: 'center',
  },
  { name: 'Name', label: 'Name', field: 'name', sortable: false, align: 'left' },
  { name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center' },
];

export default {
  name: 'Home',
  data() {
    return {
      columns,
    };
  },
  mounted() {
    this.$store.dispatch('users/getUser');
  },
  computed: {
    ...mapState('users', {
      data: 'dataUsers',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('login/logout');
      this.$router.push('./login');
    },
  },
};
</script>
