import { lambdaHandler } from '@/app'
import { describe, it } from '@jest/globals'
import GoogleTrendsApiClient from '@/client/googleTrendsApiClient'
import DynamoDbWrapClient from '@/client/dynamoDbWrapClient'
import { AxiosResponse } from 'axios'

jest.mock('@api/googleTrendsApiClient')
const googleTrendsClientMock = GoogleTrendsApiClient as jest.Mock
jest.mock('@api/dynamoDbWrapClient')
const dynamoDbClientMock = DynamoDbWrapClient as jest.Mock

describe('Unit test for app handler', () => {
  it('Verifies successful response', async () => {
    dynamoDbClientMock.mockImplementationOnce(() => {
      return {
        put: () => {
          return null
        }
      }
    })

    googleTrendsClientMock.mockImplementationOnce(() => {
      return {
        fetchGoogleTrends: () => {
          return {
            data: '12345{"date":"","storySummaries":{"trendingStories":[{"id":"dummy","articles":[],"image":{"newsUrl":"https://example.com","source":"example","imageUrl":"https://example.com/image"},"entityNames":["entity1","entity2"],"shareUrl":"https://example.com/share"}]}}',
            status: 200,
            statusText: 'OK'
          } as AxiosResponse
        }
      }
    })

    const result = await lambdaHandler()
    expect(result.message).toEqual('OK')
  })
})
