<template>
  <q-page-sticky position="top" expand class="tabs-zindex">
    <q-tabs
      v-model="seleccionado"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-indigo-6 text-white shadow-2 shadow-2 full-width"
    >
      <q-tab
        v-for="user in usersSinLogeado"
        :key="user.uid"
        :name="user.uid"
        icon="account_circle"
        :label="user.nombre"
        :class="user.estado ? 'text-white' : 'text-grey'"
      />
    </q-tabs>
  </q-page-sticky>
  <div
    v-if="seleccionado !== ''"
    class="q-pa-md q-mt-xl row justify-center"
    ref="RefChat"
  >
    <div style="width: 100%; max-width: 600px">
      <q-chat-message
        v-for="chat in chats"
        :key="chat.id"
        :name="chat.user"
        :text="[chat.texto]"
        :sent="chat.uid === user.uid"
      />
    </div>
  </div>
  <div v-else class="text-h6 q-mt-xl q-pt-xl text-center">
    Selecciona un usuario para mandar un mensaje
  </div>
  <q-footer>
    <q-form @submit.prevent="enviarMensaje">
      <q-toolbar class="bg-indigo-6 text-black row">
        <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
        <q-input
          rounded
          outlined
          dense
          class="col-grow q-mr-sm"
          bg-color="white"
          v-model="message"
          placeholder="Escribe un mensaje..."
        />
        <q-btn color="white" round flat icon="send" type="submit" />
      </q-toolbar>
    </q-form>
  </q-footer>
</template>

<script>
import { ref, computed, watch } from "vue";
// import { db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { marcaTiempo, db } from "boot/firebase";

export default {
  setup() {
    const seleccionado = ref("");
    const users = ref([]);
    const { user } = useAuth(firebase.auth);
    const message = ref("");
    const chats = ref([]);
    const RefChat = ref(null);
    let unsubscribe;

    const obtenerMensajes = (userSeleccionado) => {
      chats.value = [];
      unsubscribe = db
        .collection("chat")
        .doc(user.value.uid)
        .collection(userSeleccionado)
        .orderBy("fecha")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("Usuario nuevo: ", change.doc.data());
              chats.value.push({ ...change.doc.data(), id: change.doc.id });
            }
            if (RefChat.value !== null) {
              setTimeout(() => {
                window.scrollTo(0, RefChat.value.scrollHeight);
              }, 50);
            }
          });
        });
    };

    watch(
      () => seleccionado.value,
      (newUid) => {
        if (unsubscribe) {
          unsubscribe();
          if (newUid) {
            obtenerMensajes(newUid);
          }
        } else {
          obtenerMensajes(newUid);
        }
      }
    );

    const enviarMensaje = async () => {
      if (!message.value.trim()) {
        return;
      }
      try {
        const objetoMensaje = {
          user: user.value.displayName,
          texto: message.value,
          fecha: marcaTiempo(),
          uid: user.value.uid,
        };
        await db
          .collection("chat")
          .doc(user.value.uid)
          .collection(seleccionado.value)
          .add(objetoMensaje);

        await db
          .collection("chat")
          .doc(seleccionado.value)
          .collection(user.value.uid)
          .add(objetoMensaje);

        message.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario nuevo: ", change.doc.data());
          users.value = [...users.value, change.doc.data()];
          users.value = users.value.sort((a, b) => b.estado - a.estado);
        }
        if (change.type === "modified") {
          console.log("Usuario Modificado: ", change.doc.data());
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...user, estado: change.doc.data().estado }
              : user
          );
          users.value = users.value.sort((a, b) => b.estado - a.estado);
        }
        if (change.type === "removed") {
          console.log("Usuario eliminado: ", change.doc.data());
        }
      });
    });

    const usersSinLogeado = computed(() => {
      return users.value.filter((item) => item.uid !== user.value.uid);
    });

    return {
      seleccionado,
      usersSinLogeado,
      message,
      enviarMensaje,
      chats,
      user,
      RefChat,
    };
  },
};
</script>
<style lang="scss">
.tabs-zindex {
  z-index: 2000;
}
</style>
