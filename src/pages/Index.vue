<template>
  <q-page padding>
    <!-- <div>{{ isAuthenticated }}</div> -->

    <VistaAcceso v-if="!isAuthenticated" />

    <div class="text-h4" v-if="isAuthenticated">Estas autenticado</div>

    <q-footer elevated v-if="isAuthenticated">
      <q-btn-group spread>
        <q-btn
          to=""
          color="indigo-10"
          size="17px"
          icon="person_search"
          class="text-grey-4"
          label=""
        />
        <q-separator vertical color="indigo-8" />
        <q-btn
          to=""
          color="indigo-10"
          size="17px"
          icon="campaign"
          class="text-grey-4"
          label=""
        />
      </q-btn-group>
    </q-footer>
  </q-page>
</template>

<script>
import VistaAcceso from "../components/VistaAcceso";

import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
export default {
  components: {
    VistaAcceso,
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);
    // console.log(`puta ${isAuthenticated}`);

    return {
      user,
      isAuthenticated,
    };
  },
};
</script>
