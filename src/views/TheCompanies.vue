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
        :formStructure="companyForm"
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
      // set delete dialoge visibility to true
      this.isDeleteDialogVisible = true;
      // set prop to keep track of company to be deleted
      this.companySelected = company;
    },
    setEditCompany(company: Company) {
      console.log('user has selected company to edit', company);
      // set edit company dialoge to visible
      this.isEditCompanyDialogVisible = true;
      // set props of company values to be edited
      // set formStrucutre to be based on selected company !careful balance key & label need to be updated
      this.companySelected = company;
    },
    deleteCompany() {
      // run action to delete company
      // get val from TheCompanies state
      console.log('user wants to delete company', this.companySelected.companyId);
      // clear state afterwards ?
      this.companySelected = {} as Company;
      this.isDeleteDialogVisible = false;
      console.log('this.companySelected', this.companySelected);
    },
  },
});
</script>

<style lang="scss" scoped></style>
