<template>
  <v-form v-model="isFormValid" class="dynamic-form">
    <v-container fluid>
      <component
        v-for="field in formStructure"
        :key="field.key"
        :is="`v-${setVField(field)}`"
        v-model.trim.lazy="form[field.key]"
        :required="field.required"
        :name="field.key"
        :label="field.label"
        :items="field.type === 'selectField' && field.items"
        :error-messages="`${field.required ? setValidation(field) : ''}`"
        @blur="field.required && $v.form[field.key].$touch()"
      >
        <template v-if="field.type === 'radioGroup'">
          <component
            v-for="(radio, i) in field.items"
            :is="'v-radio'"
            :key="i"
            :value="radio.value"
            :label="radio.text"
          >
          </component>
        </template>
      </component>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { required } from 'vuelidate/lib/validators';
import { Company, CompanyForm } from '@/store/companies-types';
import { kebabCase } from 'lodash';
import { VRadioGroup, VRadio, VTextField, VSelect } from 'vuetify/lib';
import { FormElements } from '@/store/form-types';

export default Vue.extend({
  name: 'DynamicForm',
  components: { VTextField, VSelect, VRadioGroup, VRadio },
  props: {
    formStructure: {
      type: Array as PropType<CompanyForm>,
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
    isFormValid() {
      this.$emit('isValid', this.isFormValid);
    },
  },
  data() {
    return {
      isFormValid: false,
      form: {} as Company,
    };
  },
  validations: {
    form: {
      companyName: {
        required,
      },
    },
  },
  mounted() {
    if (this.formVals) this.form = { ...this.formVals };
  },
  methods: {
    kebabCase,
    setValidation({ required }: FormElements) {
      if (!required) return;
      const errors = [];
      if (this.$v.form?.companyName?.$error) {
        errors.push('Company name is required.');
      }
      return errors;
    },
    setVField({ type }: FormElements) {
      return type != 'selectField' ? kebabCase(type) : type.replace('Field', '');
    },
  },
});
</script>

<style lang="scss" scoped></style>
