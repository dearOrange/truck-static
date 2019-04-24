export default {
  getDepot({ depot }) {
    return depot
  },
  getDepotId({ depot }) {
    return depot && depot.ptStockPublish.stockPublishUkid
  }
}
