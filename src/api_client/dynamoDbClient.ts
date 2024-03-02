import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

export default class DynamoDbClient {
  private readonly dynamoDbClient: DynamoDBClient
  private docClient: DynamoDBDocumentClient

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({})
    this.docClient = DynamoDBDocumentClient.from(this.dynamoDbClient)
  }

  async put(putCommand: PutCommand) {
    await this.docClient.send(putCommand)
  }
}
