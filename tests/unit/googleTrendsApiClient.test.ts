import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import GoogleTrendsApiClient from '@/client/googleTrendsApiClient'

const mockGet = jest.fn().mockImplementation(() => Promise.resolve(null))

jest.mock('axios', () => ({
  create: jest.fn().mockImplementation(() => ({
    get: mockGet
  }))
}))

describe('Unit test for googleTrendsApiClient', () => {
  let apiClient: GoogleTrendsApiClient

  beforeEach(() => {
    mockGet.mockClear()
    apiClient = new GoogleTrendsApiClient()
  })

  it('should success request', async () => {
    await apiClient.fetchGoogleTrends()

    expect(mockGet).toBeCalledTimes(1)
  })
})
