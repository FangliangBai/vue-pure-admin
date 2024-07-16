<script lang="ts" setup>
import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { reactive, ref } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Search"
});

const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};

interface searchForm {
  search: string;
}

const searchForm = reactive<searchForm>({
  search: ""
});
const searchFormRef = ref<FormInstance>();
const rules = reactive<FormRules<searchForm>>({
  search: [
    { required: true, message: "Please input a molecule name", trigger: "blur" }
  ]
});

let searchResult = ref([]);

const onSearch = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl
    .validate()
    .then(() => {
      searchMolecule();
    })
    .catch(() => {
      console.log("error");
    });
};

const onNavigateToDetail = (name: string) => {
  router.push({
    name: "Detail",
    query: { text: name }
  });
};

const searchMolecule = () => {
  http
    .request<any>("get", baseUrlApi("specmatch/molecule-list"), {
      params: {
        search: searchForm.search,
        page: pagination.value.current,
        page_size: pagination.value.pageSize
      }
    })
    .then(res => {
      searchResult.value = res.results;
      pagination.value = {
        ...pagination.value,
        total: res.total_count
      };
    })
    .catch(err => {
      console.log(err);
    });
};
</script>

<template>
  <div>
    <el-card header="Search" shadow="hover">
      <template #header>
        <div class="font-bold">Search</div>
      </template>
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        :rules="rules"
        label-position="top"
        size="large"
        status-icon
      >
        <el-form-item prop="search">
          <el-input
            v-model="searchForm.search"
            :prefix-icon="useRenderIcon('ri:search-line')"
            clearable
            placeholder="Start your search by typing a molecule name"
          >
            <template #append>
              <el-button
                :icon="useRenderIcon('ri:search-line')"
                @click="onSearch(searchFormRef)"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-table
        :data="searchResult"
        fit
        height="350px"
        size="large"
        stripe
        style="width: 100%"
      >
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Formula" prop="formula" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scope">
            <el-button
              :icon="useRenderIcon('ri:book-read-line')"
              plain
              size="small"
              type="primary"
              @click="onNavigateToDetail(scope.row.name)"
            >
              Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template v-if="searchResult.length" #footer>
        <el-pagination
          v-model:currentPage="pagination.current"
          :background="true"
          :page-size="pagination.pageSize"
          :page-sizes="[12, 24, 36]"
          :total="pagination.total"
          class="float-right m-5"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </el-card>
  </div>
</template>
