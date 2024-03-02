export const DbItemExpires = {
  time: 25,
  unit: 'day'
} as const

export interface Article {
  articleTitle: string
  url: string
  source: string
  time: string
  snippet: string
}

export interface GoogleTrendsStory {
  id: string
  image: {
    newsUrl: string
    imageUrl: string
    source: string
  }
  shareUrl: string
  articles: Article[]
  entityNames: string[]
}

export interface GoogleTrendsStorySummaries {
  trendingStories: GoogleTrendsStory[]
}

export interface GoogleTrends {
  storySummaries: GoogleTrendsStorySummaries
  date: string
}

export interface TrendsItem {
  id: string
  entityNames: string[]
  newsUrl: string
  source: string
  imgUrl: string
  postDate: string
  createdAt: string
  expires: number
}
