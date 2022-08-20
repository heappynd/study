type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

function getNextDay(w: Weekday): Day | undefined {
  switch (w) {
    case 'Mon':
      return 'Tue'
  }
  return undefined
}

let nextDay: Record<Weekday, Day> = {
  Mon: 'Tue',
}

let next: { readonly [K in Weekday]-?: Day } = {
  Mon: 'Tue',
}
