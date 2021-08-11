import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuid } from 'uuid';
import {ItemInfo, ItemStatus} from '../../typings/common'
import dayjs from 'dayjs';

const mysql = require('serverless-mysql')({
    config: {
      host     : process.env.ENDPOINT,
      database : process.env.DATABASE,
      user     : process.env.USERNAME,
      password : process.env.PASSWORD
    }
  })


export default async (request: VercelRequest, response: VercelResponse) => {
  const { packId } = request.query;
  const item = {
    id: uuid(),
    pack_id: packId,
    content: uuid(),
    status: ItemStatus.TODO,
    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    update_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
  await mysql.query(`INSERT INTO item (id, pack_id, content, status, update_time, create_time) VALUES ("${item.id}", "${item.pack_id}", "${item.content}", ${item.status}, "${item.create_time}", "${item.update_time}")`)
  await mysql.end()
  response.status(200).json({
      data: {
        item,
      },
      code: 0
  });
};