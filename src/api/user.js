import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function searchOrder(data) {
  return request({
    url: '/order/query',
    method: 'post',
    data
  })
}
export function getMerchant(data) {
  return request({
    url: '/merchant/crypto/list',
    method: 'post',
    data
  })
}
export function setMerchantState(data) {
  return request({
    url: '/merchant/crypto/updateState',
    method: 'post',
    data
  })
}

export function getpayWatList() {
  return request({
    url: '/merchant/payWay/list',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
