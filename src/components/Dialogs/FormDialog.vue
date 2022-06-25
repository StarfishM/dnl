<template>
  <v-dialog v-model="isVisible" @click:outside="$emit('close')" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container
          ><DynamicForm ref="dynamicFormData" :formStructure="formStructure" :formVals="formVals"
        /></v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save()"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import DynamicForm from '@/components/Forms/DynamicForm.vue';

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
    return {};
  },
  // @to-do remove mounted won't really need it
  mounted() {
    // console.log('this.formStrucuture', this.formStructure);
  },
  methods: {
    save() {
      console.log('user wants to save or add company');
      //figure out isAddCompany -> check formVals prop
      const isAddCompany = !this.formVals;
      const dynamicFormData = this.$refs.dynamicFormData as any;
      console.log('data to add/update', dynamicFormData.form);
      // @to-do run corresponding actions to update vuex state
      isAddCompany
        ? console.log('want to add new Company')
        : console.log('want to update existing company');
      // close dialogue
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped></style>
