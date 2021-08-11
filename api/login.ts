import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuid } from 'uuid';
import {PackInfo, PackStatus} from '../typings/common'

export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader('Set-Cookie', ['session=111;'])
  response.status(200).json({
    code: 0
});
};