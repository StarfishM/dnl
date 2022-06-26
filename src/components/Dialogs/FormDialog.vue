<template>
  <v-dialog v-model="isVisible" @click:outside="$emit('close')" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container
          ><DynamicForm
            ref="dynamicFormData"
            :formStructure="formStructure"
            :formVals="formVals"
            @isValid="toggleSaveBtn"
        /></v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save()" :disabled="isSaveDisabled"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import DynamicForm from '@/components/Forms/DynamicForm.vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'FormDialog',
  components: { DynamicForm },
  props: {
    formStructure: {
      type: Array,
      required: true,
    },
    formVals: {
      type: Object,
      required: false,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isSaveDisabled: false,
    };
  },
  methods: {
    ...mapActions('companies', ['CREATE_COMPANY', 'UPDATE_COMPANY']),
    save() {
      const isAddCompany = !this.formVals;
      const dynamicFormData = this.$refs.dynamicFormData as any;
      isAddCompany
        ? this.CREATE_COMPANY(dynamicFormData.form)
        : this.UPDATE_COMPANY(dynamicFormData.form);
      this.$emit('close');
    },
    toggleSaveBtn(isFormValid: boolean) {
      this.isSaveDisabled = !isFormValid;
    },
  },
});
</script>

<style lang="scss" scoped></style>
