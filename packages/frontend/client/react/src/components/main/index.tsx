import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { List, Tag } from 'antd-mobile'

import * as GameApi from '@/api/game'

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

const Main = (props) => {
  const [gameList, setGameList] = useState<Game[]>([])

  const getList = async () => {
    const res = await GameApi.list()
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

  const handleClick = (game_id: number, game_status: number) => {
    if (game_status == -1) {
      GameApi.create({ name: 'test' + new Date() })
    } else if (game_status == 0) {
      GameApi.enter({ game_id })
    }
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
    </div>
  )
}

Main.propTypes = {}

export default Main
