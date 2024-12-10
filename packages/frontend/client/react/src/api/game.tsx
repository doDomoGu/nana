import request from '@/utils/request'

export const list = async () => {
  return await request({
    url: '/game/list',
    method: 'get'
  })
}
