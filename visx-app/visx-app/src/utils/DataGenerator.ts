export function generateData(numEntries: number): any[] {
    const data = [];
    const startDate = new Date(2012, 0, 9); // January 9th, 2012
    const cities = ['New York', 'San Francisco', 'Austin'];
  
    for (let i = 0; i < numEntries; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().slice(0, 10);
      const entry: any = { date: dateString };
      for (const city of cities) {
        entry[city] = (Math.random() * 100).toFixed(1);
      }
      data.push(entry);
    }
    return data;
  }