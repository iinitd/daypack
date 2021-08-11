import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuid } from 'uuid';
import {PackInfo, PackStatus} from '../typings/common'

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.ENDPOINT,
    database : process.env.DATABASE,
    user     : process.env.USERNAME,
    password : process.env.PASSWORD
  }
})

export default async (request: VercelRequest, response: VercelResponse) => {
  const { name = 'World' } = request.query;
  console.log(request.cookies.session)
  let packs = await mysql.query('SELECT * FROM pack where user_id = "admin"')
  await mysql.end()
  response.status(200).json({
      data: {
        packs,
      },
      code: 0
  });
};