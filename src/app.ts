import { DbItemExpires, GoogleTrends, TrendsItem } from '@/types'
import GoogleTrendsApiClient from '@/api_client/googleTrendsClient'
import dayjs from 'dayjs'
import { PutCommand } from '@aws-sdk/lib-dynamodb'
import DynamoDbClient from '@/api_client/dynamoDbClient'

const fetchGoogleTrends = async () => {
  const apiClient = new GoogleTrendsApiClient()
  const response = await apiClient.fetchGoogleTrends()

  // 先頭に謎の文字列が入ってくるので削除している
  const jsonString = response.data.substring(5)
  return JSON.parse(jsonString) as GoogleTrends
}

const saveTrends = async (googleTrends: GoogleTrends) => {
  const stories = googleTrends.storySummaries.trendingStories
  const interval = 1500
  const day = dayjs()
  const postDate = day.format('YYYY-MM-DD')
  const createdAt = day.toISOString()
  const expires = day.add(DbItemExpires.time, DbItemExpires.unit).unix()
  const dynamoDbClient = new DynamoDbClient()

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
      // TODO テーブル名ベタ書き修正
      TableName: 'googleTrendsStaging',
      Item: item
    })

    await dynamoDbClient.put(putCommand)
    await new Promise(resolve => setTimeout(resolve, interval))
  }
}

export const lambdaHandler = async () => {
  const googleTrends = await fetchGoogleTrends()
  await saveTrends(googleTrends)

  return { message: 'OK' }
}
