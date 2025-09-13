<script setup>
const props = defineProps(['formSuccessMessage', 'formErrorMessage'])
</script>

<template>
  <v-alert
    v-if="props.formSuccessMessage"
    :text="props.formSuccessMessage"
    title="Success!"
    type="Success"
    color="success"
    icon="$success"
    variant="tonal"
    density="compact"
    border="Start"
    Closable
  ></v-alert>

  <v-alert
    v-if="props.formErrorMessage"
    :text="props.formErrorMessage"
    title="Ooops!"
    type="error"
    color="error"
    icon="$error"
    variant="tonal"
    density="compact"
    border="Start"
    Closable
  ></v-alert>
</template>
