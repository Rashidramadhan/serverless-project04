import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
//
const XAWS = AWSXRay.captureAWS(AWS)
const todosTable = process.env.TODOS_TABLE
const index = process.env.TODOS_CREATED_AT_INDEX
const docClient: DocumentClient = createDynamoDBClient()

// // TODO: Implement the dataLayer logic
export async function createTodo(todo: TodoItem): Promise<TodoItem> {
    await docClient
        .put({
          TableName: todosTable,
          Item: todo
    })
     .promise()

  return todo
}
 // getting todos for a specific user with UserId
export async function getAllTodosByUserId(userId: string): Promise<TodoItem[]>{
    const result = await docClient
        .query({
        TableName : todosTable,
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
            '#userId': 'userId'
        },
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }).promise()
    return result.Items as TodoItem[]
}

export async function getTodoById(todoId: string): Promise<TodoItem>{
    const result = await docClient
        .query({
        TableName : todosTable,
        IndexName: index,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
            ':todoId': todoId
        }
    })
       .promise()
    const items = result.Items
    if (items.length !== 0) return result.Items[0] as TodoItem
    return null
}

export async function updateTodo(todo: TodoItem): Promise<TodoItem>{
   const result = await docClient
       .update({
        TableName : todosTable,
        Key: {
            userId: todo.userId,
            todoId: todo.todoId
        },
        UpdateExpression: 'set attachmentUrl = : attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': todo.attachmentUrl
        }
    })
       .promise()
    return result.Attributes as TodoItem

}

export async function deleteToDo(todoId: string, userId: string): Promise<string> {
        console.log("Deleting todo");
        const result = await docClient
            .delete({
                TableName: todosTable,
            Key: {
                userId: userId,
                todoId: todoId
            },
            })
            .promise()
            console.log(result)
        return " " as string
    }

export async function updateTodoItem(todoId: string, userId: string, todoUpdate: TodoUpdate){

        await docClient.update( {
            TableName: todosTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: "set #name = :name, #dueDate = :dueDate, #done = :done",
            ExpressionAttributeNames: {
                "#name": "name",
                "#dueDate": "dueDate",
                "#done": "done"
            },
            ExpressionAttributeValues: {
                ":name": todoUpdate.name,
                ":dueDate": todoUpdate.dueDate,
                ":done": todoUpdate.done
            }

        }).promise()
  }
function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }


  return new XAWS.DynamoDB.DocumentClient()
}