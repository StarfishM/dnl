<template>
  <div class="fill-height">
    <AppBar />
    <MainContainer>
      <v-row justify="space-between" align="center" class="mr-0 ml-0 mt-10 mb-1">
        <h2 class="grey--text text--darken-4">Companies</h2>
        <BtnMain text="Company" icon="mdi-plus" @click="isAddCompanyDialogVisible = true" />
      </v-row>
      <DataTableCompanies
        v-if="tableHeaders && tableItems"
        :tableHeaders="tableHeaders"
        :tableItems="tableItems"
        @editItem="setEditCompany"
        @deleteItem="setDeleteCompany"
      />
      <FormDialog
        v-if="formStructure"
        title="Add Company"
        :isVisible="isAddCompanyDialogVisible"
        :formStructure="companyForm"
        @close="isAddCompanyDialogVisible = false"
      />
      <!-- @to-do for edit dialoge formStructure needs to be set in edit method -->
      <FormDialog
        v-if="formStructure"
        title="Edit Company"
        :isVisible="isEditCompanyDialogVisible"
        :formStructure="formStructure"
        :formVals="companySelected"
        @close="isEditCompanyDialogVisible = false"
      />
      <DeleteDialog
        :isVisible="isDeleteDialogVisible"
        @close="isDeleteDialogVisible = false"
        @delete="deleteCompany"
      />
    </MainContainer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/UI/AppBar.vue';
import MainContainer from '@/components/Containers/MainContainer.vue';
import DataTableCompanies from '@/components/Tables/DataTableCompanies.vue';
import BtnMain from '@/components/UI/BtnMain.vue';
import FormDialog from '@/components/Dialogs/FormDialog.vue';
import DeleteDialog from '@/components/Dialogs/DeleteDialog.vue';
import { mapGetters } from 'vuex';
import { Company, CompanyForm } from '@/store/companies-types';
import { FormElements } from '@/store/form-types';

export default Vue.extend({
  name: 'TheCompanies',
  components: { AppBar, MainContainer, DataTableCompanies, BtnMain, FormDialog, DeleteDialog },
  data: () => ({
    isEditCompanyDialogVisible: false,
    isAddCompanyDialogVisible: false,
    isDeleteDialogVisible: false,
    formStructure: [] as CompanyForm,
    companySelected: {} as Company,
  }),
  computed: {
    ...mapGetters({
      tableItems: 'companies/companies',
      tableHeaders: 'companies/companyTableHeaders',
      companyForm: 'companies/companyForm',
    }),
  },
  mounted() {
    console.log('this.companyForm', this.companyForm);
  },
  methods: {
    setDeleteCompany(company: Company) {
      console.log('user has selected company to delete', company.companyId);
      this.isDeleteDialogVisible = true;
      this.companySelected = company;
    },
    setEditCompany(company: Company) {
      console.log('user has selected company to edit', company);
      this.isEditCompanyDialogVisible = true;
      this.companySelected = company;
      // @to-do set formStrucutre to be based on selected company
      // !careful balance key & label need to be updated
      this.formStructure = this.companyForm.map((field: FormElements) => {
        const newField = { ...field };
        if (newField.type === 'selectField') {
          const currBalanceKey = Object.keys(this.companySelected)[0];
          newField.key = currBalanceKey;
          newField.label = newField.label.replace(/\d{4}$/, currBalanceKey);
        }
        return newField;
      });
    },
    deleteCompany() {
      //@to-do: run action to delete company
      console.log('user wants to delete company', this.companySelected.companyId);
      this.companySelected = {} as Company;
      this.isDeleteDialogVisible = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
