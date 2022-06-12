import { getAngleBetweenVectors, getAngleIn2dVision, getVectorLength } from '../utils/vector.js'
import { getDistanceBetween } from '../utils/distance.js'
import { Camera } from './camera.js'

function Engine() {
    this.camera = new Camera(0, 0, 0, Math.PI / 2, 0, 100, 1000, 500)
    this.objects = []
}

Engine.prototype.bindCanvas = function (canvas) {
    this.canvas = canvas
}

Engine.prototype.listen = function () {
    let downButtons = 0
    let downX = 0
    this.canvas.addEventListener('mousewheel', e => {
        //监听鼠标滚轮
        if (e.deltaY < 0 && this.camera.vision.focalLength < 400) {
            //放大
            this.camera.vision.focalLength += 25
        } else if (e.deltaY > 0 && this.camera.vision.focalLength > 25) {
            //缩小
            this.camera.vision.focalLength -= 25
        }
        this.draw()
    })
    this.canvas.addEventListener('mousedown', e => {
        e.preventDefault()
        downButtons = e.buttons
        downX = e.clientX
    })
    this.canvas.addEventListener('mouseup', e => {
        if (downButtons === 1) {
        } else if (downButtons === 2) {
            let upX = e.clientX
            let dx = upX - downX
            console.log(dx)
        }
    })
}

Engine.prototype.addObject = function (object) {
    this.objects.push(object)
}

Engine.prototype.draw = function () {
    if (!this.canvas) return
    this.drawObjects()
}

Engine.prototype.drawObjects = function () {
    let ctx = this.canvas.getContext('2d')
    let centerX = this.canvas.width / 2
    let centerY = this.canvas.height / 2
    let visual_width = this.camera.vision.visionWdith
    let visual_height = this.camera.vision.visionHeight
    ctx.clearRect(centerX - visual_width / 2, centerY - visual_height / 2, visual_width, visual_height)

    let focalLength = this.camera.vision.focalLength
    let vector1 = this.camera.getAxisVector()
    let { x: cx, y: cy, z: cz } = this.camera.coordinate
    this.objects.forEach(item => {
        //计算物体到摄像机的方向相对摄像机主轴方向的角度
        let { x: ox, y: oy, z: oz } = item.coordinate
        let vector2 = [ox - cx, oy - cy, oz - cz]
        let angle = getAngleBetweenVectors(vector1, vector2)
        //计算物体到摄像机的空间距离
        let distance = getDistanceBetween(this.camera.coordinate, item.coordinate)
        //计算投影到摄像机主轴的离摄像机的距离
        let axis_distance = distance * Math.cos(angle)
        //计算离摄像机距离导致的缩放比例
        let ratio = this.camera.vision.focalLength / axis_distance

        //计算物体视觉大小
        let visual_size = item.size * ratio

        //计算视觉平面中心点位置
        let vector3 = [vector1[0] * focalLength, vector1[1] * focalLength, vector1[2] * focalLength]
        let center_coord = [cx + vector3[0], cy + vector3[1], cz + vector3[2]]
        //计算物体投影在视觉平面投影的空间位置
        let shadow_coord = [cx + (ox - cx) * ratio, cy + (oy - cy) * ratio, cz + (oz - cz) * ratio]

        //计算物体投影离视觉平面中心点距离
        let vector4 = [shadow_coord[0] - center_coord[0], shadow_coord[1] - center_coord[1], shadow_coord[2] - center_coord[2]]
        let visual_distance = getVectorLength(vector4)

        //计算物体投影在视觉平面的二维度向量角
        let angle2 = getAngleIn2dVision(vector1, vector4)
        // console.log(angle2 / Math.PI)
        // console.log(visual_distance)
        // console.log(visual_size)

        //绘制视觉平面
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(centerX + visual_distance * Math.cos(angle2), centerY - visual_distance * Math.sin(angle2), visual_size, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.arc(centerX + visual_distance * Math.cos(angle2), centerY - visual_distance * Math.sin(angle2), visual_size, 0, Math.PI * 2, false)
        ctx.stroke()
    })
    ctx.strokeRect(centerX - visual_width / 2, centerY - visual_height / 2, visual_width, visual_height)
}

Engine.prototype.changeAroundVisionX = function (dx) {
    let da = dx / this.camera.vision.focalLength
    let axisVector = this.camera.getAxisVector()
    let focalLength = this.camera.focalLength
    axisVector = [axisVector[0] * focalLength, axisVector[1] * focalLength, axisVector[2] * focalLength]
}

export { Engine }
