import commonApi from '@/api/common'
const getDicts = commonApi.getDicts

function BizUnitType() {
  // 业务单位类型
  return getDicts('BizUnitType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function CertifiedType() {
  //认证类型
  return getDicts('CertifiedType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function FireGrade() {
  //消防等级
  return getDicts('FireGrade').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function Gender() {
  //性别
  return getDicts('Gender').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function GroundType() {
  //地坪类型
  return getDicts('GroundType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function PlatformType() {
  //月台类型
  return getDicts('PlatformType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function StockPriceUnit() {
  //单位
  return getDicts('StockPriceUnit').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function StockType() {
  //仓库类型
  return getDicts('StockType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function StructureType() {
  //建筑结构类型
  return getDicts('StructureType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function SuitableCategory() {
  //品类
  return getDicts('SuitableCategory').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function SupportFacility() {
  //配套设施
  return getDicts('SupportFacility').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function SupportService() {
  //提供服务
  return getDicts('SupportService').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function StockQualification() {
  //运营资质
  return getDicts('StockQualification').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function ExpectedPriceType() {
  //期望价格方式
  return getDicts('ExpectedPriceType').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}

function PlanRentPeriod() {
  //计划租期
  return getDicts('PlanRentPeriod').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}
function ServiceMode() {
  //服务模式
  return getDicts('ServiceMode').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}
function ExistingSystem() {
  //软件系统
  return getDicts('ExistingSystem').then(({ success, data }) => {
    if (success) {
      return data
    }
  })
}
export {
  BizUnitType,
  CertifiedType,
  FireGrade,
  Gender,
  GroundType,
  PlatformType,
  StockPriceUnit,
  StockType,
  StructureType,
  SuitableCategory,
  SupportFacility,
  SupportService,
  StockQualification,
  ExpectedPriceType,
  PlanRentPeriod,
  ServiceMode,
  ExistingSystem
}
