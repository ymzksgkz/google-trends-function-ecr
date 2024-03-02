import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import DynamoDbWrapClient from '@/api_client/dynamoDbWrapClient'
import { PutCommand, PutCommandOutput, DeleteCommandOutput } from '@aws-sdk/lib-dynamodb'

const mockSend = jest.fn().mockImplementation(() => Promise.resolve(null))

jest.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: jest.fn().mockImplementation(() => ({
      send: mockSend
    }))
  },
  PutCommand: (jest.requireActual('@aws-sdk/lib-dynamodb') as any).PutCommand
}))

describe('Unit test for dynamoDbWrapClient', () => {
  let dynamoDbWrapClient: DynamoDbWrapClient

  beforeEach(() => {
    mockSend.mockClear()
    dynamoDbWrapClient = new DynamoDbWrapClient()
  })

  it('should success put command', async () => {
    const item = { id: '1', value: 'test' }
    const putCommand = new PutCommand({ TableName: 'test-table', Item: item })

    await dynamoDbWrapClient.put(putCommand)

    expect(mockSend).toHaveBeenCalledWith(putCommand)
  })
})
