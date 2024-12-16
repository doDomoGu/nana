import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'

import { List, Tag } from 'antd-mobile'
import dayjs from 'dayjs'

import { LoadingMask } from '@/components/common'

import { useGame } from '@/context/Game'
import * as GameApi from '@/api/game'
import { ResponseType } from '@/api/types'

type Game = {
  id: number
  name: string
  status: number
  userCount: number
  userTotal: number
}

const statusMap = new Map()
statusMap.set(-1, { text: '空房间', color: 'default' })
statusMap.set(0, { text: '未开始', color: 'success' })
statusMap.set(1, { text: '进行中', color: 'danger' })

// const GameList = (props) => {
const GameList = () => {
  const [gameList, setGameList] = useState<Game[]>([])
  const [, dispatch] = useGame()
  const [loading, setLoading] = useState(false)

  const getList = async () => {
    const res: ResponseType = await GameApi.list()
    if (res.code == 200) {
      console.log('game-list:', res.data)
      setGameList(res.data)
    }
  }

  useEffect(() => {
    getList()
    const intervalId = setInterval(() => {
      getList()
    }, 5000) // 每5秒发起一次请求

    return () => clearInterval(intervalId)
  }, [])

  const handleClick = async (game_id: number, game_status: number) => {
    setLoading(true)
    if (game_status == -1) {
      await GameApi.create({
        name: 'test' + dayjs().format('YYYY-MM-DD HH:mm:ss'),
        game_id
      })
      // getList()
    } else if (game_status == 0) {
      await GameApi.enter({ game_id })
    }

    const roomRes: ResponseType = await GameApi.room()
    if (roomRes.code == 200) {
      dispatch({ type: 'ENTER_ROOM', payload: roomRes.data })
    }
    setLoading(false)
  }

  return (
    <div>
      <List header="游戏房间">
        {gameList.map((game) => (
          <List.Item
            key={game.id}
            onClick={() => handleClick(game.id, game.status)}
          >
            <div>
              # {game.id}
              {game.status != -1 ? `${game.name}` : null}
            </div>
            <div>
              <Tag
                color={
                  statusMap.get(game.status) && statusMap.get(game.status).color
                }
              >
                {(statusMap.get(game.status) &&
                  statusMap.get(game.status).text) ||
                  '--'}
              </Tag>
              {game.status != -1
                ? `${game.userCount} / ${game.userTotal}`
                : null}
            </div>
          </List.Item>
        ))}
      </List>
      {loading ? <LoadingMask /> : null}
    </div>
  )
}

// GameList.propTypes = {}

export default GameList
