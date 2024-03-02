import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

export default class DynamoDbWrapClient {
            private docClient: DynamoDBDocumentClient

  constructor() {
    const dynamoDbClient = new DynamoDBClient({})
    this.docClient = DynamoDBDocumentClient.from(dynamoDbClient)
  }

  async put(putCommand: PutCommand) {
    await this.docClient.send(putCommand)
  }
}
