import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from "../../dataLayer/todosAcess";
import { todoBuilder } from "../../businessLogic/todos";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      console.log(newTodo)
      // TODO: Implement creating a new TODO item

      const todo = todoBuilder(newTodo, event)
      const createdTodo = await createTodo(todo)

       return {
    statusCode: 201,
    body: JSON.stringify({
      createdTodo
    })
  }

  }
)

handler.use(
  cors({
    credentials: true
  })
)
