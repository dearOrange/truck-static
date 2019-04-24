<template>
  <div class="result">
    <batch-operation
      @remove="remove"
      @update="update"
      :data="{isShow: isShow, mark: mark}"
      class="result--batch-operation"
    ></batch-operation>
    <el-table
      class="result--list"
      :data="tableData"
      ref="list"
      v-loading="loading"
      :header-cell-style="headerTitleStyle"
      @selection-change="selectionChange"
      @row-click="getDetail"
    >
      <el-table-column type="selection" prop="id"></el-table-column>
      <el-table-column prop="name" label="信息标题" min-width="180"></el-table-column>
      <el-table-column v-if="isShow" prop="type" label="类型" align="center"></el-table-column>
      <el-table-column v-if="mark === 'unpublish'" prop="states" label="状态" align="center"></el-table-column>
      <el-table-column prop="date" label="更新时间" align="center"></el-table-column>
      <el-table-column v-if="mark === 'unpublish'" prop="modify" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="result--list-btn">
            <cool-link-button
              v-if="!isShow"
              title="取消发布"
              class="btn-item"
              icon="close"
              icon-bg-color="#FD5076"
              icon-color="#fff"
              themes="stuffed"
              size="tiny"
              @click.native.prevent="deleteRow(scope.row.id)"
            ></cool-link-button>
            <cool-link-button
              title="刷新"
              v-if="!isShow"
              class="btn-item"
              icon="shuaxin"
              icon-bg-color="#3DC16D"
              icon-color="#fff"
              themes="stuffed"
              size="tiny"
              @click="updateRow(scope.row.id)"
            ></cool-link-button>
            <cool-link-button
              title="编辑"
              class="btn-item"
              icon="bianji"
              icon-bg-color="#03A2F1"
              icon-color="#fff"
              themes="stuffed"
              size="tiny"
              @click="editRow(scope.row.id, scope.row.type)"
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
import depotApi from '@/api/depot'
import rentApi from '@/api/my/rent'
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
      fixedNum: 1,
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
      let idSR = this.selectionItems
        .map(item => {
          let sr = item.type === '仓库求租' ? item.id : ''
          return sr
        })
        .filter(ele => ele)

      let idSL = this.selectionItems
        .map(item => {
          let sl = item.type === '仓库出租' ? item.id : ''
          return sl
        })
        .filter(ele => ele)
      idSR = idSR.join(',')
      idSL = idSL.join(',')
      ids = ids.join(',')
      // TODO
      if (!ids) {
        alert('请选择需要删除的项！')
      } else {
        Dialog.confirm('是否删除', {
          confirm: {
            ok: () => {
              if (this.isShow) {
                if (this.mark === 'unpublish') {
                  if (idSR) {
                    myApi.deleteRents(idSR).then(({ success, data }) => {
                      if (success) {
                        this.getList(this.fixedNum)
                      }
                    })
                  }
                  if (idSL) {
                    myApi.deleteDepots(idSL).then(({ success, data }) => {
                      if (success) {
                        this.getList(this.fixedNum)
                      }
                    })
                  }
                } else {
                  return
                }
              } else {
                if (this.mark === 'rented') {
                  myApi.deleteRents(ids).then(({ success, data }) => {
                    if (success) {
                      this.getList(this.fixedNum)
                    }
                  })
                } else if (this.mark === 'rent') {
                  myApi.deleteDepots(ids).then(({ success, data }) => {
                    if (success) {
                      this.getList(this.fixedNum)
                    }
                  })
                } else {
                  return
                }
              }
            }
          }
        })
      }
    },
    update() {
      let ids = this.selectionItems.map(item => {
        return item.id
      })
      ids = ids.join(',')
      // TODO
      if (!ids) {
        alert('请选择需要刷新的项！')
      } else {
        if (this.mark === 'rented') {
          myApi.refreshRents(ids).then(({ success }) => {
            if (success) {
              this.getList(this.fixedNum)
            }
          })
        } else if (this.mark === 'rent') {
          myApi.refreshDepots(ids).then(({ success }) => {
            if (success) {
              this.getList(this.fixedNum)
            }
          })
        }
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
            if (this.isShow) {
              return
            } else {
              if (this.mark === 'rented') {
                myApi.deleteRent(id).then(({ success, data }) => {
                  if (success) {
                    this.getList(this.fixedNum)
                  }
                })
              } else if (this.mark === 'rent') {
                myApi.deleteDepot(id).then(({ success, data }) => {
                  if (success) {
                    this.getList(this.fixedNum)
                  }
                })
              } else {
                return
              }
            }
          }
        }
      })
    },
    updateRow(id) {
      if (this.mark === 'rent') {
        myApi.refreshDepot(id).then(({ success, data }) => {
          if (success) {
            this.getList(this.fixedNum)
          }
        })
      } else if (this.mark === 'rented') {
        myApi.refreshRent(id).then(({ success, data }) => {
          if (success) {
            this.getList(this.fixedNum)
          }
        })
      } else {
        return
      }
    },
    editRow(id, type) {
      if (this.mark === 'rent') {
        depotApi.getDepot(id).then(({ success, data }) => {
          if (success) {
            data.buildDate = fmtDate(data.buildDate)
            this.$router.push({
              name: 'pubinfo',
              params: { dataNum: data, id: data.stockId, marks: 'ptSokOne' }
            })
          }
        })
      } else if (this.mark === 'rented') {
        rentApi.getDetail(id).then(({ success, data }) => {
          if (success) {
            data.planEnterDate = fmtDate(data.planEnterDate)
            this.$router.push({
              name: 'pubreq',
              params: {
                dataNum: data,
                id: data.stockDemandUkid,
                marks: 'ptSokTwo'
              }
            })
          }
        })
      } else if (this.mark === 'lose') {
        if (type === '仓库求租') {
          rentApi.getDetail(id).then(({ success, data }) => {
            if (success) {
              data.planEnterDate = fmtDate(data.planEnterDate)
              this.$router.push({
                name: 'pubreq',
                params: {
                  dataNum: data,
                  id: data.stockDemandUkid,
                  marks: 'ptSokTwo'
                }
              })
            }
          })
        } else {
          depotApi.getDepot(id).then(({ success, data }) => {
            if (success) {
              data.buildDate = fmtDate(data.buildDate)
              this.$router.push({
                name: 'pubinfo',
                params: { dataNum: data, id: data.stockId, marks: 'ptSokOne' }
              })
            }
          })
        }
      } else if (this.mark === 'unpublish') {
        if (type === '仓库求租') {
          rentApi.getDetail(id).then(({ success, data }) => {
            if (success) {
              data.planEnterDate = fmtDate(data.planEnterDate)
              this.$router.push({
                name: 'pubreq',
                params: {
                  dataNum: data,
                  id: data.stockDemandUkid,
                  marks: 'ptSokTwo'
                }
              })
            }
          })
        } else {
          depotApi.getDepot(id).then(({ success, data }) => {
            if (success) {
              data.buildDate = fmtDate(data.buildDate)
              this.$router.push({
                name: 'pubinfo',
                params: { dataNum: data, id: data.stockId, marks: 'ptSokOne' }
              })
            }
          })
        }
      } else {
        return
      }
    },
    getList(pageNum) {
      let data = {
        pageNum: pageNum,
        pageSize: 10
      }
      this.loading = true
      if (this.isShow) {
        if (this.mark === 'unpublish') {
          myApi.getUnpublishList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.id,
                  name: ele.title,
                  type: ele.type,
                  date: fmtDate(ele.publishDate),
                  states: ele.publishStatusName,
                  modify: ele.modifyContent
                }
              })
              this.loading = false
            }
          })
        } else {
          myApi.getInvalidDepotList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.id,
                  name: ele.title,
                  type: ele.type,
                  date: fmtDate(ele.publishDate)
                }
              })
              this.loading = false
            }
          })
        }
      } else {
        if (this.mark === 'rented') {
          myApi.getRentList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.stockDemandUkid,
                  name: ele.demandTitle,
                  date: fmtDate(ele.publishDate)
                }
              })
              this.loading = false
            }
          })
        } else if (this.mark === 'rent') {
          myApi.getDepotList(data).then(({ success, data, page }) => {
            if (success) {
              this.page.pageTotal = page.total
              this.tableData = data.map(ele => {
                return {
                  id: ele.ptStockPublish.stockPublishUkid,
                  name: ele.ptStockPublish.publishTitle,
                  date: fmtDate(ele.ptStockPublish.publishDate)
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
      this.fixedNum = page
      this.getList(page)
    },
    getDetail(row) {
      if (this.mark === 'rent') {
        this.$router.push('/depot/' + row.id)
      } else if (this.mark === 'rented') {
        this.$router.push('/rent/' + row.id)
      }
    }
  },
  mounted() {
    this.getList(1)
    this.bus.$on('toChangeResult', res => {
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
