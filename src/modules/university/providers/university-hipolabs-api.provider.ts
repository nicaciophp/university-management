import axios from 'axios';

export class ApiUniversityHipoLabs {
    private baseURL = `http://universities.hipolabs.com`;

    private dispatchRequest(http_method: string, path: string, country: string, data: any) {
        const url = this.baseURL + path + '?country=' + country;
        return axios
          .create({
            baseURL: this.baseURL,
          })
          .request({
            method: http_method,
            url,
            data
          });
      }

      public async getUniversity(country: string, data: any) {
        return await this.dispatchRequest('GET', `/search`, country, data);
      }
}