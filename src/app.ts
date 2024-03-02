import { DbItemExpires, GoogleTrends, TrendsItem } from '@/types'
import GoogleTrendsApiClient from '@/client/googleTrendsApiClient'
import dayjs from 'dayjs'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import DynamoDbWrapClient from '@/client/dynamoDbWrapClient'

const fetchGoogleTrends = async () => {
  const apiClient = new GoogleTrendsApiClient()
  const response = await apiClient.fetchGoogleTrends()

  // 先頭に謎の文字列が入ってくるので削除している
  const jsonString = response.data.substring(5)
  return JSON.parse(jsonString) as GoogleTrends
}

const saveTrends = async (googleTrends: GoogleTrends) => {
  const stories = googleTrends.storySummaries.trendingStories
  const interval = 1000
  const day = dayjs()
  const postDate = day.format('YYYY-MM-DD')
  const createdAt = day.toISOString()
  const expires = day.add(DbItemExpires.time, DbItemExpires.unit).unix()

  for (const story of stories) {
    const item: TrendsItem = {
      id: story.id,
      entityNames: story.entityNames,
      newsUrl: story.image.newsUrl,
      source: story.image.source,
      imgUrl: story.image.imageUrl,
      postDate,
      createdAt,
      expires
    }

    const putCommand = new PutCommand({
      TableName: 'googleTrends',
      Item: item
    })

    const dynamoDbWrapClient = new DynamoDbWrapClient()
    await dynamoDbWrapClient.put(putCommand)
    await new Promise(resolve => setTimeout(resolve, interval))
  }
}

export const lambdaHandler = async () => {
  const googleTrends = await fetchGoogleTrends()
  await saveTrends(googleTrends)

  return { message: 'OK' }
}
