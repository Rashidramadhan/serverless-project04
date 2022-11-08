import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllTodosByUserId } from "../../dataLayer/todosAcess";
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      // Write your code here
      const todos = await getAllTodosByUserId(getUserId(event))

      return {
    statusCode: 201,
    body: JSON.stringify({
      items: todos
    })
  }
  }
)

handler.use(
  cors({
    credentials: true
  })
)