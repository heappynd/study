type Unit = 'cm' | 'px' | '%'

let units: Unit[] = ['cm', 'px', '%']

function parseUnit(value: string): Unit | null {
  for (let i = 0; i < units.length; i++) {
    if (value.endsWith(units[i])) {
      return units[i]
    }
  }
  return null
}

type Width = {
  unit: Unit
  value: number
}

function parseWidth(width: number | string | null | undefined): Width | null {
  if (width == null) {
    return null
  }
  if (typeof width === 'number') {
    return { unit: 'px', value: width }
  }
  let unit = parseUnit(width)
  if (unit) {
    return { unit, value: parseFloat(unit) }
  }
  return unit
}
