function getAngleBetweenVectors(vector1, vector2) {
    let numerator = vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2]
    let denominator = Math.sqrt(Math.pow(vector1[0], 2) + Math.pow(vector1[1], 2) + Math.pow(vector1[2], 2)) * Math.sqrt(Math.pow(vector2[0], 2) + Math.pow(vector2[1], 2) + Math.pow(vector2[2], 2))
    let cos = numerator / denominator
    let angle = Math.acos(cos)
    return angle
}

function getAngleIn2dVision(vector_axios_to_2d_center, vector_object_to_2d_center) {
    let vector1 = vector_axios_to_2d_center
    let vector2 = vector_object_to_2d_center
    let x3 = (vector1[0] * vector2[1] + vector1[1] * vector2[0]) / (Math.pow(vector1[0], 2) + Math.pow(vector1[1], 2))
    let y3 = -(vector1[0] * vector2[0] + (Math.pow(vector1[0], 2) * vector2[1]) / vector1[1]) / (Math.pow(vector1[0], 2) + Math.pow(vector1[1], 2))
    let angle = getAngleBetweenVectors(vector2, [x3, y3, 0])
    let vector3 = [vector1[1] * vector2[2] - vector2[1] * vector1[2], vector2[0] * vector1[2] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector2[0] * vector1[1]]
    angle = vector3[2] > 0 ? Math.PI - angle : angle
    return angle
}

function getVectorLength(vector) {
    return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2))
}

export { getAngleBetweenVectors, getAngleIn2dVision, getVectorLength }
