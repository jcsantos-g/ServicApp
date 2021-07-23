<template>
  <q-page-sticky position="top" expand>
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      narrow-indicator
      active-color="white"
      class="bg-indigo-6 text-grey-5 shadow-2 shadow-2 full-width"
    >
      <q-tab name="Contact1" icon="account_circle" label="Contact1" />
      <q-tab name="Contact2" icon="account_circle" label="Contact2" />
      <q-tab name="Contact3" icon="account_circle" label="Contact3" />
      <q-tab name="Contact4" icon="account_circle" label="Contact4" />
      <q-tab name="Contact5" icon="account_circle" label="Contact5" />
      <q-tab name="Contact6" icon="account_circle" label="Contact6" />
    </q-tabs>
  </q-page-sticky>

  <!-- <q-footer>
    <q-toolbar class="bg-grey-3 text-black row">
      <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
      />
      <q-btn round flat icon="mic" />
    </q-toolbar>
  </q-footer> -->
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("mails"),
    };
  },
};
</script>
