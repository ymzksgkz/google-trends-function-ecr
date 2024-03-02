import axios, { AxiosInstance } from 'axios'

export default class GoogleTrendsApiClient {
  private client: AxiosInstance
  private readonly url: string

  constructor() {
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.url = 'https://trends.google.com/trends/api/realtimetrends'
  }

  async fetchGoogleTrends() {
    const params = { hl: 'ja', tz: '-540', cat: 'e', fi: '0', fs: '0', geo: 'JP', ri: '300', rs: '20', sort: '0' }
    return this.client.get(this.url, { params })
  }
}
