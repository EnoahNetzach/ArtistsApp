import toRadians from './toRadians'

export default (point1, point2) => {
  const φ1 = toRadians(point1.lat)
  const φ2 = toRadians(point2.lat)
  const Δλ = toRadians(point2.lon - point1.lon)
  const R = 6371e3 // gives d in metres

  // eslint-disable-next-line no-mixed-operators
  return Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R
}
