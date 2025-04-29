export function transformStartDate<T extends { start_date: Date }>(res: T): T {
  return {
    ...res,
    start_date: new Date(res.start_date),
  };
}

export function transformEventDate<T extends { event_date: Date }>(res: T): T {
  return {
    ...res,
    event_date: new Date(res.event_date),
  };
}
