<template>
  <div class="result">
    <batch-operation @remove="remove" class="result--batch-operation"></batch-operation>
    <el-table
      class="result--list"
      :data="tableData"
      v-loading="loading"
      ref="list"
      :header-cell-style="headerTitleStyle"
      @selection-change="selectionChange"
      @row-click="getDetail"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="信息标题" min-width="180"></el-table-column>
      <el-table-column v-if="isShow" prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="date" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="result--list-btn">
            <cool-link-button
              title="删除"
              class="btn-item"
              icon="shanchu"
              icon-bg-color="#FD5076"
              icon-color="#fff"
              themes="stuffed"
              size="tiny"
              @click.native.prevent="deleteRow(scope.row.id)"
            ></cool-link-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <cool-link-pagination
      @change="changePage"
      :size="page.pageSize"
      :total="page.pageTotal"
      :page="page"
      class="result--pagination"
    />
  </div>
</template>

<script>
import BatchOperation from './batch-operation'
import myApi from '@/api/my'
import { fmtDate } from '@/utils/date'
import Dialog from '@components/common/dialog'

export default {
  name: 'Result',
  components: {
    BatchOperation
  },
  data() {
    return {
      tableData: [],
      selectionItems: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
      },
      isShow: false,
      mark: 'rent',
      loading: true
    }
  },

  methods: {
    remove() {
      let ids = this.selectionItems.map(item => {
        return item.id
      })
      ids = ids.join(',')
      // TODO
      if (!ids) {
        alert('请选择需要删除的项！')
      } else {
        Dialog.confirm('是否删除', {
          confirm: {
            ok: () => {
              myApi.deleteFollows(ids).then(({ success, data }) => {
                if (success) {
                  this.getList(1)
                }
              })
            }
          }
        })
      }
    },
    selectionChange(selectionItems) {
      this.selectionItems = selectionItems
    },
    headerTitleStyle() {
      return {
        'font-size': '18px',
        'font-weight': '700',
        color: '#333'
      }
    },
    deleteRow(id) {
      Dialog.confirm('是否删除', {
        confirm: {
          ok: () => {
            myApi.deleteFollow(id).then(({ success, data }) => {
              if (success) {
                this.getList(1)
              }
            })
          }
        }
      })
    },
    getList(pageNum) {
      let data = {
        pageNum: pageNum,
        pageSize: 10
      }
      this.loading = true
      if (this.isShow && this.mark === 'lose') {
        myApi.getInvalidFollowList(data).then(({ success, data, page }) => {
          if (success) {
            this.page.pageTotal = page.total
            this.tableData = data.map(ele => {
              return {
                id: ele.userFollowUkid,
                name: ele.title,
                type: ele.type,
                detailId: ele.relatedDataUkid,
                date: fmtDate(ele.publishDate)
              }
            })
            this.loading = false
          }
        })
      } else {
        if (this.mark === 'rented') {
          myApi.getFollowedRentedList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.userFollowUkid,
                  name: ele.publishTitle,
                  detailId: ele.relatedDataUkid,
                  date: fmtDate(ele.publishDate)
                }
              })
              this.loading = false
            }
          })
        } else if (this.mark === 'rent') {
          myApi.getFollowedRentList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.userFollowUkid,
                  name: ele.publishTitle,
                  detailId: ele.relatedDataUkid,
                  date: fmtDate(ele.publishDate)
                }
              })
              this.loading = false
            }
          })
        } else {
          this.tableData = []
          this.loading = false
          return
        }
      }
    },
    changePage(page) {
      this.getList(page)
    },
    getDetail(row) {
      if (this.mark === 'rent') {
        this.$router.push('/depot/' + row.detailId)
      } else if (this.mark === 'rented') {
        this.$router.push('/rent/' + row.detailId)
      }
    }
  },
  mounted() {
    this.getList(1)
    this.bus.$on('focusResult', res => {
      this.isShow = res.isShow
      this.mark = res.mark
      this.getList(1)
    })
  }
}
</script>


<style lang="postcss" scoped>
.result--batch-operation {
  padding-left: 14px;
  margin: 30px 0 20px 0;
}

.result--list-btn {
  display: flex;
  justify-content: center;
  & .btn-item {
    margin: 0 3px;
  }
}
.result--pagination {
  margin-top: 30px;
}
</style>
<style lang="postcss">
.el-table__row {
  cursor: pointer !important;
}
</style>



