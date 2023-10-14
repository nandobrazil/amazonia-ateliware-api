export class PriorityQueue {
  private queue: { node: string; priority: number }[];
  constructor() {
    this.queue = [];
  }

  enqueue(node, priority) {
    this.queue.push({ node, priority });
    this.sort();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().node;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
