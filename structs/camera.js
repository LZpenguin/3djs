function Camera(x, y, z, longitude, latitude, focalLength, visionWdith, visionHeight) {
    this.coordinate = {
        x,
        y,
        z
    }
    this.vision = {
        orientation: {
            longitude,
            latitude
        },
        focalLength,
        visionWdith,
        visionHeight
    }
}

Camera.prototype.getAxisVector = function () {
    let { longitude, latitude } = this.vision.orientation
    let axisVector = [Math.cos(latitude) * Math.cos(longitude), Math.cos(latitude) * Math.sin(longitude), Math.sin(latitude)]
    return axisVector
}

Camera.prototype.getCenterCoord = function () {
    let { x: cx, y: cy, z: cz } = this.coordinate
    let axisVector = this.getAxisVector()
    let focalLength = this.vision.focalLength
    let centerCoord = [cx + focalLength * axisVector[0], cy + focalLength * axisVector[1], cz + focalLength * axisVector[2]]
    return centerCoord
}

export { Camera }
