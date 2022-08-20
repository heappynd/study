type CompanyId = string & { readonly brand: unique symbol }
type OrderId = string & { readonly brand: unique symbol }
type UserId = string & { readonly brand: unique symbol }

type ID = CompanyId | OrderId | UserId

function CompanyId(id: string) {
  return id as CompanyId
}
function OrderId(id: string) {
  return id as OrderId
}
function UserId(id: string) {
  return id as UserId
}

// use for

function queryForUser(id: UserId) {}
let companyId = CompanyId('9s89dsa')
let orderId = OrderId('dasdas')
let userId = UserId('dasdasf')
queryForUser(userId)
queryForUser(orderId)
