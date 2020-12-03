import { request } from '@/plugins/request'

// 关注某人
export const follow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

// 取消关注
export const unFollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}

// 获取个人信息
export const getProfiles = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}
