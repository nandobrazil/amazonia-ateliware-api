import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

const DEFAULT_FILE_PATH = '../shared/mocks/mockio-api.json';

@Injectable()
export class MockioApiService {
  async fetchData(): Promise<any> {
    const apiUrl = 'https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f';
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const fileContent = fs.readFileSync(DEFAULT_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent);
      }
      throw new NotFoundException('Erro ao acessar a API externa');
    }
  }
}
