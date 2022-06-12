function getDistanceBetween(coord1, coord2) {
    let { x: x1, y: y1, z: z1 } = coord1
    let { x: x2, y: y2, z: z2 } = coord2
    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))
    return distance
}

export { getDistanceBetween }
