<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="q-mb-md text-h6 text-grey-8">
        Data Users
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
            <q-btn
              icon="edit"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="changeMail(props.row.email)"
            >
              <q-tooltip> Edit Email </q-tooltip>
            </q-btn>
            <q-btn
              icon="edit"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="changeNumber(props.row.email)"
            >
              <q-tooltip> Edit Mobile Number </q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              dense
              @click="deleteUser(props.row)"
            >
              <q-tooltip> Hapus Users </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <div>
    <q-dialog v-model="showDialog" full-width>
      <q-card q-px-lg q-pa-md>
        <q-card-section class="bg-modal">
          <div class="q-pa-sm">Edit {{ isEmail ? 'Email' : 'Mobile Number' }}</div>
        </q-card-section>
        <q-separator />
        <q-form
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          greedy
          @submit="onSave"
        >
          <q-card-section style="max-height: 50vh">
            <div class="q-pb-md row q-col-gutter-x-xl">
              <div class="col-md-6">
                <div class="row items-center q-pb-md">
                  <label class="col-md-4 text-right">
                    <b>Email</b>
                  </label>
                  <span class="col-md-8 q-pl-md">
                    <q-input
                      ref="existing"
                      v-model="existing"
                      outlined
                      dense
                      name="existing"
                    />
                  </span>
                </div>
                <div class="row items-center q-pb-md">
                  <label class="col-md-4 text-right">
                    <b>{{ isEmail ? 'New Email' : 'New Mobile Number' }}</b>
                  </label>
                  <span class="col-md-8 q-pl-md">
                    <q-input
                      ref="newData"
                      v-model="newData"
                      outlined
                      dense
                      name="newData"
                    />
                  </span>
                </div>
                <div class="row">
                  <div class="col-md-4" />
                  <div class="col-md-8 q-pl-md">
                    <q-btn label="Edit Data" type="submit" unelevated color="primary" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
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
      showDialog: false,
      type: '',
      existingData: '',
      isEmail: false,
      existing: '',
      newData: '',
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
    async deleteUser(val) {
      await this.$store.dispatch('users/removUser', {
        emails: val.email,
        password: val.password,
      });

      await this.$store.dispatch('users/getUser');
    },
    async changeMail(val) {
      this.showDialog = true;
      this.type = 'Email';
      this.existing = val;
      this.isEmail = true;
    },
    async changeNumber(val) {
      this.showDialog = true;
      this.type = 'Number';
      this.existing = val;
      this.isEmail = false;
    },
    async onSave() {
      const editType = this.isEmail ? 'changeMail' : 'changeMobile';
      try {
        const res = await this.$store.dispatch(`users/${editType}`, {
          existData: this.existing,
          newData: this.newData,
        });
        await this.$store.dispatch('users/getUser');
        this.newData = '';
        this.showDialog = false;
      } catch (err) {
        console.error(err);
        this.showDialog = false;
        throw err;
      }
    },
  },
};
</script>

<style></style>
