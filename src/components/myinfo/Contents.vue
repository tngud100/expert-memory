<template>
  <section>
    <CheckPassword @checkAccount="checkAccount" v-if="!checkAccountState" />
    <ModifyAccount
      v-if="checkAccountState && props.menuNum === 4"
      @cancel="cancel"
    />
    <DeleteAccount
      v-if="checkAccountState && props.menuNum === 5"
      @cancel="cancel"
    />
  </section>
</template>

<script setup>
import CheckPassword from "#/myinfo/CheckPassword.vue";
import DeleteAccount from "#/myinfo/DeleteAccount.vue";
import ModifyAccount from "#/myinfo/ModifyAccount.vue";
import { ref, watchEffect } from "vue";

const props = defineProps({
  menuNum: Number,
});

const checkAccountState = ref(false);
watchEffect(() => {
  if (props.menuNum === 5) {
    checkAccountState.value = false;
  }
  if (props.menuNum === 4) {
    checkAccountState.value = false;
  }
});

const checkAccount = (event) => {
  checkAccountState.value = event;
};

const cancel = () => {
  checkAccountState.value = false;
};
</script>
<style src="@/assets/css/myinfo/Contents.css" module></style>
