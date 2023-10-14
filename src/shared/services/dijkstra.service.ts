import { Injectable } from '@nestjs/common';
import { Graph } from '../interfaces/IGraph';
import { ShortestPathResult } from '../interfaces/IShortestPathResult';
import { PriorityQueue } from '../classes/PriorityQueue';

@Injectable()
export class DijkstraService {
  dijkstra(
    graph: Graph,
    startNode: string,
    endNode: string,
  ): ShortestPathResult | null {
    const distances: { [key: string]: number } = {};
    const predecessors: { [key: string]: string } = {};
    const visited: { [key: string]: boolean } = {};
    const priorityQueue = new PriorityQueue();

    distances[startNode] = 0;
    priorityQueue.enqueue(startNode, 0);

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

      if (currentNode === endNode) {
        return {
          path: this.buildPath(predecessors, startNode, endNode),
          time: distances[endNode] || 0,
        };
      }

      if (visited[currentNode]) {
        continue;
      }

      visited[currentNode] = true;

      const neighbors = graph[currentNode];
      for (const neighbor in neighbors) {
        const distance = (distances[currentNode] || 0) + neighbors[neighbor];
        if (!distances[neighbor] || distance < distances[neighbor]) {
          distances[neighbor] = distance;
          priorityQueue.enqueue(neighbor, distance);
          predecessors[neighbor] = currentNode;
        }
      }
    }

    return null;
  }

  buildPath(
    predecessors: { [key: string]: string },
    startNode: string,
    endNode: string,
  ): string[] {
    const path: string[] = [];
    let currentNode: string | undefined = endNode;

    while (currentNode !== startNode) {
      path.push(currentNode);
      currentNode = predecessors[currentNode];
    }

    path.push(startNode);
    return path.reverse();
  }
}
