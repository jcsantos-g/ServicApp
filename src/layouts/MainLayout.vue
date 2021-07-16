<template>
  <q-layout view="hHh Lpr fFr">
    <q-header elevated class="bg-indigo-10">
      <q-toolbar>
        <q-toolbar-title class="text-grey-4">
          {{ isAuthenticated ? user.email : "NameApp" }}</q-toolbar-title
        >
        <q-btn
          v-if="isAuthenticated"
          class="text-grey-4"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      side="right"
      v-if="isAuthenticated"
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      bordered
      class="text-indigo-10"
    >
      <q-scroll-area class="fit">
        <div class="" style="max-width: 250px">
          <q-list class="text-indigo-10">
            <q-item clickable v-ripple to="" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>Cuenta</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="" active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="chat" />
              </q-item-section>

              <q-item-section>Mensajes</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              @click="
                salir();
                cerrar();
              "
              clickable
              v-ripple
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>Salir</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <!-- Footer -->
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
  </q-layout>
</template>

<script>
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { auth, db } from "boot/firebase";
export default {
  data: function () {
    return {
      drawer: false,
    };
  },
  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);

    const salir = async () => {
      try {
        await db.collection("users").doc(user.value.uid).update({
          estado: false,
        });
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      user,
      isAuthenticated,
      salir,
    };
  },
  methods: {
    cerrar() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background: $indigo-10;
}
</style>
