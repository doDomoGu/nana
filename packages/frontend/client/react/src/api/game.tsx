import request from '@/utils/request'

export const list = async () => {
  return await request({
    url: '/game/list',
    method: 'get'
  })
}

export const enter = async (data: { game_id: number }) => {
  return await request({
    url: '/game/enter',
    method: 'post',
    data
  })
}

export const create = async (data: { name: string }) => {
  return await request({
    url: '/game/create',
    method: 'post',
    data
  })
}
