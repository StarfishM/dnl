<template>
  <v-form v-model="isFormValid" class="dynamic-form">
    <v-container fluid>
      <v-text-field
        v-model="form.companyName"
        :require="formStructure[0].required"
        :label="formStructure[0].label"
      ></v-text-field>
      <v-select
        v-model="form['2019']"
        :items="formStructure[1].items"
        :require="formStructure[1].required"
        :label="formStructure[1].label"
      ></v-select>
      <v-radio-group v-model="form.language" :label="formStructure[2].label">
        <v-radio
          v-for="(it, i) in formStructure[2].items"
          :key="i"
          :value="it.value"
          :label="it.text"
        ></v-radio>
      </v-radio-group>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Company } from '@/store/companies-types';
import Vue from 'vue';

export default Vue.extend({
  name: 'DynamicForm',
  components: {},
  props: {
    formStructure: {
      type: Array,
      required: true,
    },
    formVals: {
      type: Object,
      required: false,
    },
  },
  watch: {
    formVals() {
      this.form = { ...this.formVals };
    },
  },
  data() {
    return {
      isFormValid: false,
      form: {} as Company,
    };
  },
  mounted() {
    // console.log('--- dynamic form mounted');
    // console.log('this.formStructure', this.formStructure);
    // console.log('this.formVals:', this.formVals);
    this.form = { ...this.formVals };
  },
});
</script>

<style lang="scss" scoped></style>
