import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuid } from 'uuid';
import {ItemInfo, ItemStatus} from '../typings/common'


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
  let items = await mysql.query(`SELECT * FROM item where pack_id = ${packId}`)
  await mysql.end()
  response.status(200).json({
      data: {
        items,
      },
      code: 0
  });
};