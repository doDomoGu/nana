import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { List, Tag } from 'antd-mobile'

import * as GameApi from '@/api/game'

type Game = {
  id: number
  name: string
  status: number
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
      setGameList(res.data)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <List header="游戏房间">
        {gameList.map((game) => (
          <List.Item key={game.id}>
            <div></div># {game.id}
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
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

Main.propTypes = {}

export default Main
