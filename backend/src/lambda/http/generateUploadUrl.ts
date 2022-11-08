// import 'source-map-support/register'
//
// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'
// import {getTodoById, updateTodo, } from "../../dataLayer/todosAcess";
// import { getUploadUrl } from '../../dataLayer/attachmentUtils';
//
// // import { getUserId } from '../utils'
// const Bucket_Name = process.env.ATTACHMENT_S3_BUCKET
// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//       const todoId = event.pathParameters.todoId
//       const todo = await getTodoById(todoId)
//
//       // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
//       todo.attachmentUrl = `https://${Bucket_Name}.s3.amazonaws.com/${todoId}`
//
//       await updateTodo(todo);
//       const url = await getUploadUrl(todoId)
//
//
//       return {
//           statusCode: 201,
//           headers: {
//               "Access-Control-Allow-Origin": "*",
//           },
//           body: JSON.stringify({
//               uploadUrl: url
//           })
//       }
//   }
// )
//
// handler
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )
import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import { getUploaded_Url } from "../../businessLogic/todos";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event ", event);
    const todoId = event.pathParameters.todoId;

    const URL = await getUploaded_Url(todoId);

    return {
        statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            uploadUrl: URL,
        })
    };
};