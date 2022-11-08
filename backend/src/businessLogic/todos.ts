import { updateTodoItem, getTodoById, deleteToDo, getAllTodosByUserId } from '../dataLayer/todosAcess'
import { generateUploadUrl } from '../dataLayer/attachmentUtils';
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'
import {APIGatewayProxyEvent} from "aws-lambda";
import {getUserId} from "../lambda/utils";
import {TodoItem} from "../models/TodoItem";
import {TodoUpdate} from "../models/TodoUpdate";

//
// // TODO: Implement businessLogic

export async function getAllToDo(userId: string): Promise<TodoItem[]> {
    return getAllTodosByUserId(userId);
}
 export function todoBuilder(
     todoRequest: CreateTodoRequest,
     event: APIGatewayProxyEvent
 ): TodoItem{
     const todoId = uuid.v4()
     const Bucket_Name = process.env.ATTACHMENT_S3_BUCKET
     const todo = {
          todoId: todoId,
          userId: getUserId(event),
         createdAt: new Date().toISOString(),
         done: false,
         attachmentUrl: `https://${Bucket_Name}.s3.amazonaws.com/${todoId}`,
          ...todoRequest
     }
        return todo as TodoItem
 }

export async function updateTodo(todoId: string, updateTodoRequest: UpdateTodoRequest) {
      const item = await updateTodoItem(todoId, updateTodoRequest);
      console.log(item)
      updateTodoItem(todoId, updateTodoRequest as TodoUpdate)

}

export async function deleteTodo(todoId: string, userId: string): Promise<string> {
     const item = await getTodoById(todoId)
    console.log(item)
    return deleteToDo(todoId, userId)

}

export function getUploaded_Url(todoId: string): Promise<string> {
    return  generateUploadUrl(todoId);
}


